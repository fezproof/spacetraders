<script lang="ts">
	import { getMyShips } from '$lib/api';

	import { useQuery } from '$lib/fetcher';
	import GameState from '$lib/GameState.svelte';
	const ships = useQuery('ships', getMyShips);

	// const ships = useQuery('ships', getMyShips);
</script>

{#await $ships.data}
	Loading..
{:then data}
	<pre>{JSON.stringify(data, null, 2)}</pre>
{/await}

<GameState />
