<script lang="ts">
	import { typewriter } from '$lib/transitions/typewriter';

	export let loading: boolean;
</script>

{#if loading}
	<div class="font-block" in:typewriter>
		<slot name="loading">
			<p>This text is loading</p>
		</slot>
	</div>
{:else}
	<slot />
{/if}
