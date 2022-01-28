<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';

	export let location: LocationDataFragment;
</script>

<SC.Mesh
	geometry={new THREE.SphereGeometry(location.size)}
	position={[location.x, 0, location.y]}
	material={new THREE.MeshBasicMaterial({ color: 'white' })}
/>
