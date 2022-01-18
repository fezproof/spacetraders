<script lang="ts">
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';

	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;

	const asteroidScale = 0.6;
</script>

<SC.Mesh
	geometry={new THREE.BoxGeometry(asteroidScale, asteroidScale, asteroidScale)}
	position={[location.x, 0, location.y]}
	material={new THREE.MeshBasicMaterial({ color: 0x4e342e })}
/>
