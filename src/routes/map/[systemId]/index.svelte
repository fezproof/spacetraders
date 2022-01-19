<script lang="ts" context="module">
	import { enablePanning, offset } from '$lib/stores/camera';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	onMount(() => {
		$offset = [100, 100, 100];
		$enablePanning = true;
	});
</script>
