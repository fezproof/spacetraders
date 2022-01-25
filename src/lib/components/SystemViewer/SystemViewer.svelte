<script lang="ts">
	import { SystemDataDocument } from '$lib/graphql/generated/operations';
	import {
		cameraPosition,
		enablePanning,
		offset,
		softTarget,
		target
	} from '$lib/stores/camera';
	import { canvasClick, mouseCoords } from '$lib/stores/mouse';
	import { operationStore, query } from '@urql/svelte';
	import { onMount } from 'svelte';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';
	import ThreeProvider from '../ScExtends/ThreeProvider.svelte';
	import SystemFlights from './SystemFlights.svelte';
	import SystemObjects from './SystemObjects.svelte';

	export let systemId: string;

	const system = operationStore(SystemDataDocument, { systemId });

	$: {
		$system.variables = { systemId };
	}

	query(system);

	$: $cameraPosition = [
		$target[0] + $offset[0],
		$target[1] + $offset[1],
		$target[2] + $offset[2]
	];

	$: $softTarget = $target;

	const loader = new THREE.CubeTextureLoader();
	loader.setPath('/textures/galaxy/');

	let background: THREE.CubeTexture;

	onMount(() => {
		background = loader.load([
			'px.png',
			'nx.png',
			'py.png',
			'ny.png',
			'pz.png',
			'nz.png'
		]);
	});
</script>

<div
	class="fixed inset-0"
	on:mousemove={(e) => {
		$mouseCoords.x = (e.clientX / window.innerWidth) * 2 - 1;
		$mouseCoords.y = -(e.clientY / window.innerHeight) * 2 + 1;
	}}
	on:click={() => {
		canvasClick();
	}}
>
	<SC.Canvas antialias {background}>
		<ThreeProvider>
			{#if $system.data?.system?.locations}
				<SystemObjects locations={$system.data.system.locations} />
			{/if}

			<SC.Mesh
				geometry={new THREE.SphereGeometry(1)}
				material={new THREE.MeshBasicMaterial({ color: 0xffff00 })}
			/>
			<SystemFlights {systemId} />

			<SC.PerspectiveCamera position={$cameraPosition} target={$softTarget} />
			<SC.OrbitControls
				enablePan={$enablePanning}
				screenSpacePanning={false}
				enableRotate={false}
				enableZoom={false}
				enableDamping={false}
				mouseButtons={{
					LEFT: THREE.MOUSE.PAN,
					MIDDLE: null,
					RIGHT: null
				}}
				touches={{
					ONE: THREE.TOUCH.PAN,
					TWO: null
				}}
				target={$softTarget}
			/>
		</ThreeProvider>
	</SC.Canvas>
</div>
