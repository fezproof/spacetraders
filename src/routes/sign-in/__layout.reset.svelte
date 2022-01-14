<script>
	import { client } from '$lib/graphql/client';
	import { setClient } from '@urql/svelte';

	setClient(client);
</script>

<slot />
