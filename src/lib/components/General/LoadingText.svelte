<script lang="ts">
	import { typewriter } from '$lib/transitions/typewriter';

	export let loading: boolean;
	export let text: string = 'This text is loading...';
</script>

{#if loading}
	<div class="font-block" in:typewriter>{text}</div>
{:else}
	<slot />
{/if}
