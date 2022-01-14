<script lang="ts" context="module">
	export const prerender = true;
</script>

<script>
	import GameState from '$lib/components/GameState/GameState.svelte';
</script>

<header class="p-4"><h1 class="text-xl">Spacetraders</h1></header>

<div class="min-h-[60vh] flex flex-nowrap justify-center items-center">
	<main class="max-w-md w-full p-4 border border-gray-400 mx-4">
		<h2 class="mb-4 text-lg">Please sign in</h2>
		<form
			method="post"
			action="/auth/sign-in"
			class="flex flex-col space-y-4 mb-6"
		>
			<div>
				<label for="token" class="block">Token</label>
				<input type="password" id="token" name="token" required />
			</div>
			<div>
				<button type="submit" class="btn">sign in</button>
			</div>
		</form>
		<div>
			<GameState />
		</div>
	</main>
</div>
