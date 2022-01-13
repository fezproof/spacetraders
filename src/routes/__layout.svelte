<script>
	import GameState from '$lib/GameState.svelte';
	import '../app.css';
</script>

<header class="flex flex-row items-center p-4 bg-gray-200 gap-8">
	<h1>Spacetraders</h1>
	<nav class="flex flex-row items-center gap-2">
		<a href="/">home</a>
		<a href="/leaderboard">leaderboard</a>
	</nav>

	<GameState />
</header>

<slot />

<style lang="postcss">
	a {
		@apply uppercase py-2 px-4 bg-blue-200 rounded-md;
	}
	a:hover {
		@apply bg-blue-400;
	}
</style>
