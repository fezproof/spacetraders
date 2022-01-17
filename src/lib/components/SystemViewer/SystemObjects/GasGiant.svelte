<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let x: number;
	export let y: number;

	const scale = 2;
</script>

<SC.Mesh
	geometry={new THREE.SphereGeometry(scale)}
	position={[x, 0, y]}
	material={new THREE.MeshBasicMaterial({ color: 0xff0000 })}
/>
