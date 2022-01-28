<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import HoverSphere from '$lib/components/ScExtends/HoverSphere.svelte';
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import { getRandomOneMinusOne } from '$lib/utils/position';
	import { getCloudsTexture, getPlanetTexture } from '$lib/utils/textureLoader';
	import { onMount } from 'svelte';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	let planetTexture: THREE.Texture;
	let cloudTexture: THREE.Texture;

	onMount(() => {
		planetTexture = getPlanetTexture();
		cloudTexture = getCloudsTexture();
	});

	const clickHandler = () => {
		goto(`/map/${$page.params.systemId}/${location.id}`);
	};

	const rotationRate = getRandomOneMinusOne() * 0.005;

	let rotation: SC.Rotation = [0, Math.random() * Math.PI, 0];

	$: cloudRotaion = [0, rotation[1] * 0.5, 0] as SC.Rotation;

	SC.onFrame(() => {
		rotation = [0, (rotation[1] += rotationRate), 0];
	});
</script>

<SC.Group position={[location.x, 0, location.y]}>
	<HoverSphere radius={location.size * 1.25} on:click={clickHandler}>
		<SC.Mesh
			rotation={cloudRotaion}
			geometry={new THREE.SphereGeometry(1.05, 32, 32)}
			material={new THREE.MeshBasicMaterial({
				transparent: true,
				map: cloudTexture
			})}
		/>
		<SC.Mesh
			{rotation}
			geometry={new THREE.SphereGeometry(location.size, 32, 32)}
			material={new THREE.MeshBasicMaterial({
				map: planetTexture
			})}
		/>
	</HoverSphere>
</SC.Group>
