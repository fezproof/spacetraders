<script lang="ts">
	export let loading: boolean;
</script>

{#if loading}
	<slot name="loading">
		<p>This text is loading</p>
	</slot>
{:else}
	<slot />
{/if}
