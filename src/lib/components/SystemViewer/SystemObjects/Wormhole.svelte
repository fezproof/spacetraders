<script lang="ts">
	import type { LocationDataFragment } from '$lib/graphql/generated/operations';

	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let location: LocationDataFragment;
</script>

<SC.Mesh
	geometry={new THREE.TorusGeometry(1, 0.3, 24, 24)}
	material={new THREE.MeshBasicMaterial({ color: 0x0000ff })}
	rotation={[-Math.PI / 2, 0, 0]}
/>
