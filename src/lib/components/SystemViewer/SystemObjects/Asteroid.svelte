<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let x: number;
	export let y: number;

	const asteroidScale = 0.6;
</script>

<SC.Mesh
	geometry={new THREE.BoxGeometry(asteroidScale, asteroidScale, asteroidScale)}
	position={[x, 0, y]}
	material={new THREE.MeshBasicMaterial({ color: 0x4e342e })}
/>
