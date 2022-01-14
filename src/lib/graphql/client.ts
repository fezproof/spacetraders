import { createClient } from '@urql/svelte';

export const client = createClient({
	url: '/graphql',
	fetchOptions: {
		credentials: 'same-origin'
	}
});
