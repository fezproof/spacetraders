<script lang="ts" context="module">
	import { offset } from '$lib/stores/camera';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	onMount(() => {
		$offset = [100, 100, 100];
	});
</script>
