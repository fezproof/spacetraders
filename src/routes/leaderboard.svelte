<script lang="ts">
	import { getLeaderboard } from '$lib/api';
	import { useQuery } from '$lib/fetcher';
	import { flip } from 'svelte/animate';

	const leaderboard = useQuery('leaderboad', getLeaderboard);
</script>

<main class="mx-4">
	<h1>Leaderboard</h1>

	{#await $leaderboard.data}
		<p>Loading....</p>
	{:then data}
		<div class="flex flex-col gap-2 relative" class:stale={$leaderboard.stale}>
			{#each data.netWorth as user (user.username)}
				<div class="p-4 border border-black" animate:flip>
					<h2>{user.username}</h2>
					<h3>{user.netWorth}</h3>
				</div>
			{/each}
		</div>
	{/await}
</main>

<style lang="postcss">
	.stale h2,
	.stale h3 {
		@apply text-gray-500 border-gray-500;
	}
</style>
