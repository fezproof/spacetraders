<script lang="ts">
	import type {
		LocationDataFragment,
		LocationType,
		Maybe
	} from '$lib/graphql/generated/operations';
	import { getLocationPosition } from '$lib/stores/locations';
	import { distance } from '$lib/utils/position';
	import * as SC from 'svelte-cubed';
	import LocationPosition from '../Location/LocationPosition.svelte';
	import Asteroid from './SystemObjects/Asteroid.svelte';
	import GasGiant from './SystemObjects/GasGiant.svelte';
	import Moon from './SystemObjects/Moon.svelte';
	import Nebula from './SystemObjects/Nebula.svelte';
	import Planet from './SystemObjects/Planet.svelte';
	import Wormhole from './SystemObjects/Wormhole.svelte';

	export let locations: Maybe<LocationDataFragment>[];

	getLocationPosition('OE').set([0, 0, 0]);

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
			<LocationPosition
				locationId={location.id}
				parentId={location.parent.id}
				distance={distance(
					[location.x, 0, location.y],
					[location.parent.x, 0, location.parent.y]
				)}
			>
				<svelte:component this={SystemObjectMap[location.type]} {location} />
			</LocationPosition>
		{/if}
	{/each}
</SC.Group>
