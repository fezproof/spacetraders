<script lang="ts">
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	const scale = 2;
</script>

<SC.Mesh
	geometry={new THREE.SphereGeometry(scale)}
	position={[location.x, 0, location.y]}
	material={new THREE.MeshBasicMaterial({ color: 0xff0000 })}
/>
