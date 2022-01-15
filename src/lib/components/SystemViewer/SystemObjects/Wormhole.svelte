<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let x: number;
	export let y: number;

	const scale = 1;
</script>

<SC.Mesh
	geometry={new THREE.TorusGeometry(1, 0.3, 24, 24)}
	position={[x, 0, y]}
	material={new THREE.MeshBasicMaterial({ color: 'blue' })}
	rotation={[-Math.PI / 2, 0, 0]}
	scale={[scale, scale, scale]}
/>
