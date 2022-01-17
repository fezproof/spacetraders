<script lang="ts">
	import type {
		LocationDataFragment,
		LocationType
	} from '$lib/graphql/generated/operations';
	import * as SC from 'svelte-cubed';
	import Asteroid from './SystemObjects/Asteroid.svelte';
	import GasGiant from './SystemObjects/GasGiant.svelte';
	import Moon from './SystemObjects/Moon.svelte';
	import Nebula from './SystemObjects/Nebula.svelte';
	import Planet from './SystemObjects/Planet.svelte';
	import Wormhole from './SystemObjects/Wormhole.svelte';

	export let locations: LocationDataFragment[];

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
	{#each locations as location (location.id)}
		<svelte:component
			this={SystemObjectMap[location.type]}
			{location}
			x={location.x}
			y={location.y}
		/>
	{/each}
</SC.Group>
