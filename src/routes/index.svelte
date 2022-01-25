<script lang="ts">
	// import SystemViewer from '$lib/components/SystemViewer/SystemViewer.svelte';

	import MyShips from '$lib/components/MyShips/MyShips.svelte';
</script>

<main class="mt-24 mx-auto max-w-prose">
	<a href="/map/OE" sveltekit:prefetch>Goto OE system</a>
	<MyShips />
</main>
