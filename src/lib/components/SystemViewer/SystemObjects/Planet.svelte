<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import GetEvents from '$lib/components/ScExtends/GetEvents.svelte';
	import HoverSphere from '$lib/components/ScExtends/HoverSphere.svelte';
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	const color = 0x00ff00;

	const clickHandler = () => {
		goto(`/map/${$page.params.systemId}/${location.id}`);
	};
</script>

<SC.Group position={[location.x, 0, location.y]}>
	<HoverSphere radius={1.5} on:click={clickHandler}>
		<SC.Mesh
			geometry={new THREE.SphereGeometry(1)}
			material={new THREE.MeshBasicMaterial({
				color
			})}
		/>
	</HoverSphere>
</SC.Group>
