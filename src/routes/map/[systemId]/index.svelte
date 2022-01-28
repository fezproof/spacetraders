<script lang="ts" context="module">
	import type { LoadFn } from '$lib/globals';
	import { enablePanning, offset } from '$lib/stores/camera';
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
		$offset = [50, 50, 50];
		$enablePanning = true;
	});
</script>

<div class="fixed top-24 left-4">
	<div class="blur-container  p-4 border-2 border-cyan-200">
		<h1 class="text-2xl font-extrabold font-heading inline-block">
			{systemId}
		</h1>
	</div>
</div>
