<script lang="ts">
	import type {
		LocationDataFragment,
		LocationType,
		Maybe
	} from '$lib/graphql/generated/operations';
	import * as SC from 'svelte-cubed';
	import Asteroid from './SystemObjects/Asteroid.svelte';
	import GasGiant from './SystemObjects/GasGiant.svelte';
	import Moon from './SystemObjects/Moon.svelte';
	import Nebula from './SystemObjects/Nebula.svelte';
	import Planet from './SystemObjects/Planet.svelte';
	import Wormhole from './SystemObjects/Wormhole.svelte';

	export let locations: Maybe<LocationDataFragment>[];

	const SystemObjectMap: Record<LocationType, any> = {
		PLANET: Planet,
		MOON: Moon,
		ASTEROID: Asteroid,
		GAS_GIANT: GasGiant,
		WORMHOLE: Wormhole,
		NEBULA: Nebula
	};
</script>

<SC.Group position={[0, 0, 0]}>
	{#each locations as location}
		{#if location}
			<svelte:component this={SystemObjectMap[location.type]} {location} />
		{/if}
	{/each}
</SC.Group>
