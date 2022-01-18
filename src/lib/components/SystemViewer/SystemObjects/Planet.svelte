<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import GetEvents from '$lib/components/ScExtends/GetEvents.svelte';
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	const originalColour = 0x00ff00;

	let color = originalColour;

	const mouseEnterHandler = () => {
		color = 0xff00ff;
	};

	const mouseExitHandler = () => {
		color = originalColour;
	};

	const clickHandler = () => {
		goto(`/map/${$page.params.systemId}/${location.id}`);
	};
</script>

<GetEvents
	on:mouseenter={mouseEnterHandler}
	on:mouseleave={mouseExitHandler}
	on:click={clickHandler}
>
	<SC.Mesh
		geometry={new THREE.SphereGeometry(1)}
		position={[location.x, 0, location.y]}
		material={new THREE.MeshBasicMaterial({ color })}
	/>
</GetEvents>
