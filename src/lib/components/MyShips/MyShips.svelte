<script lang="ts">
	import { MyShipsDocument } from '$lib/graphql/generated/operations';
	import { operationStore, query } from '@urql/svelte';
	const ships = operationStore(MyShipsDocument);

	query(ships);
</script>

{#if $ships.fetching}
	<p>Loading...</p>
{:else if $ships.error}
	<p>Oh no... {$ships.error.message}</p>
{:else}
	<ul>
		{#each $ships.data?.me?.ships ?? [] as ship (ship.id)}
			<li>{ship.class}</li>
		{/each}
	</ul>
{/if}
