<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	const originalColour = 0x00ff00;

	export let x: number;
	export let y: number;
</script>

<SC.Mesh
	geometry={new THREE.SphereGeometry(1)}
	position={[x, 0, y]}
	material={new THREE.MeshBasicMaterial({ color: originalColour })}
/>
