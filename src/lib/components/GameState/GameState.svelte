<script lang="ts">
	import { GameStateDocument } from '$lib/graphql/generated/operations';
	import { operationStore, query } from '@urql/svelte';
	import { onDestroy } from 'svelte';

	const gameStatus = operationStore(GameStateDocument);
	query(gameStatus);

	const interval = setInterval(() => {
		$gameStatus.reexecute();
	}, 5000);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

{#if $gameStatus.fetching}
	<div>Loading...</div>
{/if}
{#if $gameStatus.error}
	<p>{$gameStatus.error.message}</p>
{/if}
{#if $gameStatus.data}
	<p class="first-letter:uppercase">
		{$gameStatus.data?.game.status}
	</p>
{/if}
