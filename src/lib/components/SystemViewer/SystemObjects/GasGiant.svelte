<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import HoverSphere from '$lib/components/ScExtends/HoverSphere.svelte';

	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import { getRandomOneMinusOne } from '$lib/utils/position';
	import { getGasGiantTexture } from '$lib/utils/textureLoader';
	import { onMount } from 'svelte';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	const radius = 3;

	let gasGiantTexture: THREE.Texture;

	onMount(() => {
		gasGiantTexture = getGasGiantTexture();
	});

	const clickHandler = () => {
		goto(`/map/${$page.params.systemId}/${location.id}`);
	};

	const rotationRate = getRandomOneMinusOne() * 0.001;

	let rotation: SC.Rotation = [0, Math.random() * Math.PI, 0];

	SC.onFrame(() => {
		rotation = [0, (rotation[1] += rotationRate), 0];
	});
</script>

<SC.Group position={[location.x, 0, location.y]}>
	<HoverSphere radius={location.size * 1.25} on:click={clickHandler}>
		<SC.Mesh
			{rotation}
			geometry={new THREE.SphereGeometry(location.size)}
			material={new THREE.MeshBasicMaterial({ map: gasGiantTexture })}
		/>
	</HoverSphere>
</SC.Group>
