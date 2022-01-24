import type { Context } from '$lib/graphql/schema';
import { schema } from '$lib/graphql/schema';
import { locationDataLoader } from '$lib/graphql/services/locations/data';
import { envelop, useLogger, useSchema } from '@envelop/core';
import type { RequestHandler } from '@sveltejs/kit';
import type { CacheMap } from 'dataloader';
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

const dataLoaderCache = new Map();

const createGraphqlCache = (): CacheMap<string, any> => {
	const cache: CacheMap<string, any> = {
		get: (...args) => {
			LOG_REQUESTS && console.log('get', ...args);
			return dataLoaderCache.get(...args);
		},
		delete: (...args) => {
			LOG_REQUESTS && console.log('delete', ...args);

			return dataLoaderCache.delete(...args);
		},
		clear: (...args) => {
			LOG_REQUESTS && console.log('clear', ...args);

			return dataLoaderCache.clear(...args);
		},
		set: async (key, promisedValue) => {
			try {
				const value = await promisedValue;

				if (value instanceof Error || value === null) {
					return;
				}
				LOG_REQUESTS && console.log('set', key, value);
				dataLoaderCache.set(key, value);
			} catch (error) {
				return;
			}
		}
	};

	return cache;
};

export const post: RequestHandler<Locals> = async ({
	request: rawRequest,
	locals: { user }
}) => {
	const graphqlCache = createGraphqlCache();

	const { contextFactory, parse, validate, execute, schema } =
		getEnveloped<Context>({
			user,
			dataloaders: {
				location: locationDataLoader(user?.token, graphqlCache)
			}
		});

	const body = await rawRequest.json();

	const request = {
		method: rawRequest.method,
		body,
		headers: {},
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
