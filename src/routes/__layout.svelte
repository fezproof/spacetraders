<script lang="ts" context="module">
	import GameState from '$lib/components/GameState/GameState.svelte';
	import type { LoadFn } from '$lib/globals';
	import { client } from '$lib/graphql/client';
	import { setClient } from '@urql/svelte';
	import '../app.css';

	export const load: LoadFn = async ({ session }) => {
		if (!session.user) return { redirect: '/sign-in', status: 302 };
		return {};
	};
</script>

<script lang="ts">
	setClient(client);
</script>

<header
	class="flex flex-row items-center p-4 blur-container gap-4 h-20 border-b-2 border-cyan-200 z-10 fixed top-0 left-0 right-0"
>
	<h2 class="font-heading">Spacetraders</h2>
	<nav class="flex flex-row items-center gap-4 ml-auto">
		<a class="btn" href="/">Home</a>
		<a class="btn" href="/leaderboard">Leaderboard</a>
	</nav>

	<!-- <GameState /> -->

	<form method="post" action="/auth/sign-out">
		<button class="btn" type="submit">Sign out</button>
	</form>
</header>

<slot />
