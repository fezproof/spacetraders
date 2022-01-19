<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import HoverSphere from '$lib/components/ScExtends/HoverSphere.svelte';
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import { onMount } from 'svelte';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	const color = 0x00eeee;

	const textureLoader = new THREE.TextureLoader().setPath('/textures/');

	let planetTexture: THREE.Texture;
	let cloudTexture: THREE.Texture;

	onMount(() => {
		planetTexture = textureLoader.load('planet/habitable/Alpine.png');
		cloudTexture = textureLoader.load('planet/clouds/Clouds1.png');
	});

	const clickHandler = () => {
		goto(`/map/${$page.params.systemId}/${location.id}`);
	};

	let rotation: SC.Rotation = [0, Math.random() * Math.PI, 0];

	$: cloudRotaion = [0, rotation[1] * 0.5, 0] as SC.Rotation;

	SC.onFrame(() => {
		rotation = [0, (rotation[1] += 0.001), 0];
	});
</script>

<SC.Group position={[location.x, 0, location.y]}>
	<HoverSphere radius={1.5} on:click={clickHandler}>
		<SC.Mesh
			rotation={cloudRotaion}
			geometry={new THREE.SphereGeometry(1.05, 32, 32)}
			material={new THREE.MeshBasicMaterial({
				color,
				transparent: true,
				map: cloudTexture
			})}
		/>
		<SC.Mesh
			{rotation}
			geometry={new THREE.SphereGeometry(1, 32, 32)}
			material={new THREE.MeshBasicMaterial({
				color,
				map: planetTexture
			})}
		/>
	</HoverSphere>
</SC.Group>
