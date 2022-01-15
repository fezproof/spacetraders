<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let x: number;
	export let y: number;

	const scale = 2;
</script>

<SC.Mesh
	geometry={new THREE.SphereGeometry(1)}
	position={[x, 0, y]}
	material={new THREE.MeshBasicMaterial({ color: 'red' })}
	scale={[scale, scale, scale]}
/>
