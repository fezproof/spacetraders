<script lang="ts">
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';
	import Asteroid from './SystemObjects/Asteroid.svelte';
	import GasGiant from './SystemObjects/GasGiant.svelte';
	import Moon from './SystemObjects/Moon.svelte';
	import Planet from './SystemObjects/Planet.svelte';
	import Wormhole from './SystemObjects/Wormhole.svelte';

	export let locations: LocationDataFragment[];

	const SystemObjectMap = {
		PLANET: Planet,
		MOON: Moon,
		ASTEROID: Asteroid,
		GAS_GIANT: GasGiant,
		WORMHOLE: Wormhole
	};
</script>

<SC.Group position={[0, 0, 0]}>
	{#each locations as location (location.id)}
		{#if SystemObjectMap[location.type]}
			<svelte:component
				this={SystemObjectMap[location.type]}
				x={location.x}
				y={location.y}
			/>
		{:else}
			<SC.Mesh
				geometry={new THREE.SphereGeometry(1)}
				position={[location.x, 0, location.y]}
				material={new THREE.MeshBasicMaterial({ color: 'white' })}
			/>
		{/if}
	{/each}
</SC.Group>
