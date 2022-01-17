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

<slot />
