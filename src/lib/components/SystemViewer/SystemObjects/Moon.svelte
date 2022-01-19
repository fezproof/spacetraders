<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import HoverSphere from '$lib/components/ScExtends/HoverSphere.svelte';

	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import { getRandomOneMinusOne } from '$lib/utils/position';
	import { getMoonTexture } from '$lib/utils/textureLoader';
	import { onMount } from 'svelte';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	let moonTexture: THREE.Texture;

	onMount(() => {
		moonTexture = getMoonTexture();
	});

	const moonScale = 0.5;
	const clickHandler = () => {
		goto(`/map/${$page.params.systemId}/${location.id}`);
	};

	const rotationRate = getRandomOneMinusOne() * 0.005;

	let rotation: SC.Rotation = [0, Math.random() * Math.PI, 0];

	SC.onFrame(() => {
		rotation = [0, (rotation[1] += rotationRate), 0];
	});
</script>

<SC.Group position={[location.x, 0, location.y]}>
	<HoverSphere radius={0.75} on:click={clickHandler}>
		<SC.Mesh
			{rotation}
			geometry={new THREE.SphereGeometry(moonScale)}
			material={new THREE.MeshBasicMaterial({
				map: moonTexture
			})}
		/>
	</HoverSphere>
</SC.Group>
