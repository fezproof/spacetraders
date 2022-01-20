import type { Context } from '$lib/graphql/schema';
import { schema } from '$lib/graphql/schema';
import { envelop, useLogger, useSchema } from '@envelop/core';
import type { RequestHandler } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import { getGraphQLParameters, processRequest } from 'graphql-helix';
import type { Locals } from 'src/hooks';

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
	const { contextFactory, parse, validate, execute, schema } =
		getEnveloped<Context>({ user });

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

	return {
		body: JSON.stringify(result.payload),
		status: result.status
	};
};
