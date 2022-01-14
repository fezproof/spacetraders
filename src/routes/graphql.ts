import { Context, schema } from '$lib/graphql/schema';
import { envelop, useLogger, useSchema } from '@envelop/core';
import type { RequestHandler } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import { getGraphQLParameters, processRequest } from 'graphql-helix';
import type { Locals } from 'src/hooks';

const baseHeaders = {
	'access-control-allow-methods': 'POST',
	'access-control-allow-origin': 'https://studio.apollographql.com',
	'access-control-allow-headers': '*'
};

const LOG_REQUESTS = false;

const getEnveloped = envelop({
	plugins: [
		useSchema(schema),
		useLogger({
			logFn: (message, { result, args: { operationName, variableValues } }) => {
				if (LOG_REQUESTS)
					return console.log(
						message,
						JSON.stringify({ operationName, variableValues, result }, null, 2)
					);
				return console.log('graphql request', message);
			},
			skipIntrospection: true
		})
	]
});

export const post: RequestHandler<Locals, JSONValue> = async ({
	headers,
	body,
	method,
	locals: { user }
}) => {
	const { contextFactory, parse, validate, execute, schema } = getEnveloped<Context>({ user });

	const request = {
		method,
		body,
		headers,
		query: {}
	};

	const { operationName, query, variables } = getGraphQLParameters(request);

	const result = await processRequest({
		operationName,
		query,
		variables,
		request,
		contextFactory,
		parse,
		validate,
		execute,
		schema
	});

	if (result.type !== 'RESPONSE') {
		return {
			// Think you could help? https://github.com/svelte-add/graphql/issues/1
			body: 'Do not support multipart responses',
			headers: {},
			status: 501
		};
	}

	const resultHeaders = { ...baseHeaders };
	for (const { name, value } of result.headers) {
		resultHeaders[name] = value;
	}

	return {
		body: JSON.stringify(result.payload),
		headers: resultHeaders,
		status: result.status
	};
};
