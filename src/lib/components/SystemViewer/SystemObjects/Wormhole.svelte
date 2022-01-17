<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let x: number;
	export let y: number;
</script>

<SC.Mesh
	geometry={new THREE.TorusGeometry(1, 0.3, 24, 24)}
	position={[x, 0, y]}
	material={new THREE.MeshBasicMaterial({ color: 0x0000ff })}
	rotation={[-Math.PI / 2, 0, 0]}
/>
