<script lang="ts" context="module">
	import { enablePanning, offset } from '$lib/stores/camera';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	onMount(() => {
		$offset = [50, 50, 50];
		$enablePanning = true;
	});
</script>
