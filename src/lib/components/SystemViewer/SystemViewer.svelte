<script lang="ts">
	import { SystemDataDocument } from '$lib/graphql/generated/operations';
	import { target } from '$lib/stores/camera';
	import { canvasClick, mouseCoords } from '$lib/stores/mouse';
	import { operationStore, query } from '@urql/svelte';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';
	import ThreeProvider from '../ScExtends/ThreeProvider.svelte';
	import SystemFlights from './SystemFlights.svelte';
	import SystemObjects from './SystemObjects.svelte';

	const system = operationStore(SystemDataDocument, { systemId: 'OE' });

	query(system);

	$: systemPositions =
		$system.data?.system?.locations?.map(({ x, y }) => ({ x, y })) ?? [];

	$: maxX = Math.max(...(systemPositions.map(({ x }) => Math.abs(x)) ?? [0]));
	$: maxY = Math.max(...(systemPositions.map(({ y }) => Math.abs(y)) ?? [0]));
	$: maxDistance = Math.hypot(maxX, maxY);
	$: position = [$target[0] + 100, $target[1] + maxDistance, $target[2] + 100];

	const loader = new THREE.CubeTextureLoader();
	loader.setPath('textures/galaxy/');

	const background = loader.load([
		'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png'
	]);
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

			<SystemFlights />

			<SC.PerspectiveCamera bind:position target={$target} />
			<!-- <SC.OrbitControls
				enableZoom={false}
        enablePan={false}
				enableRotate={false}
				target={$target}
			/> -->
		</ThreeProvider>
	</SC.Canvas>
</div>
