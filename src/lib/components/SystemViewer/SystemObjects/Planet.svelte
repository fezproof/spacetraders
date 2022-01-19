<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import GetEvents from '$lib/components/ScExtends/GetEvents.svelte';
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	const originalColour = 0x00cccc;
	const highlightColor = 0x00d9d9;
	let opacity = 0.8;

	let color = originalColour;

	const mouseEnterHandler = () => {
		opacity = 1;
		color = highlightColor;
	};

	const mouseExitHandler = () => {
		opacity = 0.8;
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
		material={new THREE.MeshBasicMaterial({
			color,
			transparent: true,
			opacity
		})}
	/>
</GetEvents>
