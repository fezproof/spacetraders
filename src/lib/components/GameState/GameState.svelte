<script lang="ts">
	import { GameStateDocument } from '$lib/graphql/generated/operations';
	import { operationStore, query } from '@urql/svelte';

	const gameStatus = operationStore(GameStateDocument);
	query(gameStatus);
</script>

{#if $gameStatus.fetching}
	<div>Loading...</div>
{:else}
	<p class="first-letter:uppercase" class:text-gray-500={$gameStatus.stale}>
		{$gameStatus.data?.game.status}
	</p>
{/if}
