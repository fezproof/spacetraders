<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let x: number;
	export let y: number;

	const moonScale = 0.5;
</script>

<SC.Mesh
	geometry={new THREE.SphereGeometry(moonScale)}
	position={[x, 0, y]}
	material={new THREE.MeshBasicMaterial({ color: 0xfefefe })}
/>
