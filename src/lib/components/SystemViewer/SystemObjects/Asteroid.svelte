<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import HoverSphere from '$lib/components/ScExtends/HoverSphere.svelte';

	import type { LocationDataFragment } from '$lib/graphql/generated/operations';

	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	const asteroidScale = 0.6;
	const clickHandler = () => {
		goto(`/map/${$page.params.systemId}/${location.id}`);
	};
</script>

<SC.Group position={[location.x, 0, location.y]}>
	<HoverSphere radius={1} on:click={clickHandler}>
		<SC.Mesh
			geometry={new THREE.BoxGeometry(
				asteroidScale,
				asteroidScale,
				asteroidScale
			)}
			material={new THREE.MeshBasicMaterial({ color: 0x4e342e })}
		/>
	</HoverSphere>
</SC.Group>
