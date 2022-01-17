<script lang="ts">
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import { target } from '$lib/stores/camera';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';
	import GetEvents from '../ScExtends/GetEvents.svelte';
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

	const mouseEnterHandler = (e) => {
		const obj = e.detail as THREE.Mesh<
			THREE.SphereGeometry,
			THREE.MeshBasicMaterial
		>;
		obj.currentColor = obj?.material?.color?.getHex();
		obj?.material?.color?.setHex(0xff00ff);
	};

	const mouseExitHandler = (e) => {
		const obj = e.detail as THREE.Mesh<
			THREE.SphereGeometry,
			THREE.MeshBasicMaterial
		>;
		obj?.material?.color?.setHex(obj.currentColor);
	};

	const clickHandler = (e) => {
		const obj = e.detail as THREE.Mesh<
			THREE.SphereGeometry,
			THREE.MeshBasicMaterial
		>;
		$target = obj.position.toArray();
	};
</script>

<SC.Group position={[0, 0, 0]}>
	{#each locations as location (location.id)}
		{#if SystemObjectMap[location.type]}
			<GetEvents
				on:mouseenter={mouseEnterHandler}
				on:mouseleave={mouseExitHandler}
				on:click={clickHandler}
			>
				<svelte:component
					this={SystemObjectMap[location.type]}
					x={location.x}
					y={location.y}
				/>
			</GetEvents>
		{:else}
			<SC.Mesh
				geometry={new THREE.SphereGeometry(1)}
				position={[location.x, 0, location.y]}
				material={new THREE.MeshBasicMaterial({ color: 'white' })}
			/>
		{/if}
	{/each}
</SC.Group>
