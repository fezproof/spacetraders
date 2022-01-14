<script lang="ts">
	import { LeaderboardDocument } from '$lib/graphql/generated/operations';
	import { operationStore, query } from '@urql/svelte';
	import { flip } from 'svelte/animate';
	const leaderboard = operationStore(
		LeaderboardDocument,
		{},
		{ requestPolicy: 'cache-and-network' }
	);

	query(leaderboard);
</script>

{#if $leaderboard.fetching}
	Loading...
{/if}
{#if $leaderboard.error}
	<p>
		{$leaderboard.error.message}
	</p>
{/if}
{#if $leaderboard.data}
	<div class="flex flex-col gap-2 relative" class:stale={$leaderboard.stale}>
		{#each $leaderboard.data?.game?.leaderboard ?? [] as rank (rank.username)}
			<div class="p-4 border border-black" animate:flip>
				<h2>{rank.username}</h2>
				<h3>{rank.netWorth}</h3>
			</div>
		{/each}
	</div>
{/if}

<style lang="postcss">
	.stale h2,
	.stale h3 {
		@apply text-gray-500 border-gray-500;
	}
</style>
