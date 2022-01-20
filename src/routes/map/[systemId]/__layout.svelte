<script lang="ts" context="module">
	export const load: LoadFn = async ({ params: { systemId } }) => {
		return {
			props: {
				systemId
			}
		};
	};
</script>

<script lang="ts">
	import SystemViewer from '$lib/components/SystemViewer/SystemViewer.svelte';
	import type { LoadFn } from '$lib/globals';

	export let systemId: string;
</script>

<SystemViewer {systemId} />

<div class="fixed top-24 left-4">
	<div class="blur-container  p-4 border-2 border-cyan-200">
		<h1 class="text-2xl font-extrabold font-heading inline-block">
			{systemId}
		</h1>
	</div>
</div>

<slot />
