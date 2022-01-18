<script lang="ts" context="module">
	import type { LoadFn } from '$lib/globals';
	import { offset } from '$lib/stores/camera';
	import { onMount } from 'svelte';

	export const load: LoadFn = async ({ params: { systemId } }) => {
		return {
			props: {
				systemId
			}
		};
	};
</script>

<script lang="ts">
	export let systemId: string;

	onMount(() => {
		$offset = [100, 100, 100];
	});
</script>

<nav class="fixed top-4 left-4 right-4">
	<div class="w-full h-20 bg-black text-white">
		<h1>{systemId}</h1>
	</div>
</nav>
