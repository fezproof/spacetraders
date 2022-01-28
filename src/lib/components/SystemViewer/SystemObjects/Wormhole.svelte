<script lang="ts">
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';

	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;
</script>

<SC.Mesh
	geometry={new THREE.TorusGeometry(
		location.size,
		location.size * 0.25,
		32,
		32
	)}
	position={[location.x, 0, location.y]}
	material={new THREE.MeshBasicMaterial({ color: 0x0000ff })}
	rotation={[-Math.PI / 2, 0, 0]}
/>
