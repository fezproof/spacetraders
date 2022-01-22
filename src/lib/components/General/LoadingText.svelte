<script lang="ts">
	export let loading: boolean;
	export let text: string = 'This text is loading...';
</script>

{#if loading}
	<div class="font-block">{text}</div>
{:else}
	<slot />
{/if}
