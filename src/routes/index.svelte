<script lang="ts">
	import MyShips from '$lib/components/MyShips/MyShips.svelte';

	// import SystemViewer from '$lib/components/SystemViewer/SystemViewer.svelte';
</script>

<main class="mt-24 mx-auto max-w-prose">
	<a href="/map/OE" sveltekit:prefetch>Goto OE system</a>
</main>

<MyShips />
<!-- <SystemViewer systemId="OE" /> -->
