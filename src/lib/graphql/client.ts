import schema from '$lib/graphql/generated/urqlIntrospection';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import { retryExchange } from '@urql/exchange-retry';
import { createClient, dedupExchange, fetchExchange } from '@urql/svelte';

const exchanges = [
	dedupExchange,
	cacheExchange({
		schema,
		resolvers: {
			Query: {
				location: (_, args) => ({
					__typename: 'Location',
					id: args.id
				})
			}
		},
		keys: {
			Game: () => null,
			Rank: () => null,
			Account: ({ username }) => username as string,
			MarketRecord: () => null
		}
	}),
	retryExchange({}),
	fetchExchange
];

if (process.env.NODE_ENV === 'production') exchanges.unshift(devtoolsExchange);

export const client = createClient({
	url: '/graphql',
	fetchOptions: {
		credentials: 'same-origin'
	},
	requestPolicy: 'cache-first',
	exchanges
});
