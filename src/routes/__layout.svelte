<script lang="ts" context="module">
	import type { LoadFn } from '$lib/globals';

	export const load: LoadFn = async ({ session }) => {
		if (!session.user) return { redirect: '/sign-in', status: 301 };
		return {};
	};
</script>

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

	<form method="post" action="/auth/sign-out">
		<button type="submit" class="bg-gray-500">Sign out</button>
	</form>
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
