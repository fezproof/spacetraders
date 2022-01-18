<script lang="ts">
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	const moonScale = 0.5;
</script>

<SC.Mesh
	geometry={new THREE.SphereGeometry(moonScale)}
	position={[location.x, 0, location.y]}
	material={new THREE.MeshBasicMaterial({ color: 0xfefefe })}
/>
