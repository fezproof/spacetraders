import schema from '$lib/graphql/generated/urqlIntrospection';
import { cacheExchange } from '@urql/exchange-graphcache';
import { retryExchange } from '@urql/exchange-retry';
import { createClient, dedupExchange, fetchExchange } from '@urql/svelte';

export const client = createClient({
	url: '/graphql',
	fetchOptions: {
		credentials: 'same-origin'
	},
	exchanges: [
		dedupExchange,
		cacheExchange({
			schema,
			keys: {
				Game: () => null,
				Rank: () => null,
				Account: ({ username }) => username as string
			}
		}),
		retryExchange({}),
		fetchExchange
	]
});
