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
	class="flex flex-row items-center p-4 bg-black gap-8 h-20 border-b-2 border-cyan-200"
>
	<h1 class="font-heading">Spacetraders</h1>
	<nav class="flex flex-row items-center gap-4 ml-auto">
		<a class="btn" href="/">Home</a>
		<a class="btn" href="/leaderboard">Leaderboard</a>
	</nav>

	<GameState />

	<form method="post" action="/auth/sign-out">
		<button class="btn" type="submit">Sign out</button>
	</form>
</header>

<slot />
