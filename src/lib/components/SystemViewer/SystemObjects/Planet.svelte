<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import GetEvents from '$lib/components/ScExtends/GetEvents.svelte';
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import { target } from '$lib/stores/camera';

	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	const originalColour = 0x00ff00;

	export let x: number;
	export let y: number;

	const mouseEnterHandler = (e: CustomEvent<THREE.Object3D>) => {
		const obj = e.detail as THREE.Mesh<
			THREE.SphereGeometry,
			THREE.MeshBasicMaterial
		>;

		obj.material.color.setHex(0xff00ff);
	};

	const mouseExitHandler = (e: CustomEvent<THREE.Object3D>) => {
		const obj = e.detail as THREE.Mesh<
			THREE.SphereGeometry,
			THREE.MeshBasicMaterial
		>;
		obj?.material?.color?.setHex(originalColour);
	};

	const clickHandler = (e: CustomEvent<THREE.Object3D>) => {
		const obj = e.detail as THREE.Mesh<
			THREE.SphereGeometry,
			THREE.MeshBasicMaterial
		>;
		$target = obj.position.toArray();
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
		position={[x, 0, y]}
		material={new THREE.MeshBasicMaterial({ color: originalColour })}
	/>
</GetEvents>
