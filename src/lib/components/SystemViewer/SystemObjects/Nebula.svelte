<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	export let x: number;
	export let y: number;
</script>

<SC.Mesh
	geometry={new THREE.SphereGeometry(1)}
	position={[x, 0, y]}
	material={new THREE.MeshBasicMaterial({ color: 'white' })}
/>
