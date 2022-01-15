<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let x: number;
	export let y: number;

	const asteroidScale = 0.6;
</script>

<SC.Mesh
	geometry={new THREE.BoxGeometry()}
	position={[x, 0, y]}
	material={new THREE.MeshBasicMaterial({ color: '#4e342e' })}
	scale={[asteroidScale, asteroidScale, asteroidScale]}
/>
