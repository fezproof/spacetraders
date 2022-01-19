<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import HoverSphere from '$lib/components/ScExtends/HoverSphere.svelte';

	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	const radius = 2;

	const clickHandler = () => {
		goto(`/map/${$page.params.systemId}/${location.id}`);
	};
</script>

<SC.Group position={[location.x, 0, location.y]}>
	<HoverSphere radius={2.5} on:click={clickHandler}>
		<SC.Mesh
			geometry={new THREE.SphereGeometry(radius)}
			material={new THREE.MeshBasicMaterial({ color: 0xff0000 })}
		/>
	</HoverSphere>
</SC.Group>
