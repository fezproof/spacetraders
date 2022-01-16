<script lang="ts">
	import { SystemDataDocument } from '$lib/graphql/generated/operations';
	import { operationStore, query } from '@urql/svelte';
	import { meanBy } from 'lodash-es';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';
	import SystemFlights from './SystemFlights.svelte';
	import SystemObjects from './SystemObjects.svelte';

	const system = operationStore(SystemDataDocument, { systemId: 'OE' });

	query(system);

	$: systemPositions =
		$system.data?.system?.locations?.map(({ x, y }) => ({ x, y })) ?? [];

	$: middle = [
		meanBy(systemPositions, 'x'),
		0,
		meanBy(systemPositions, 'y')
	] as SC.Position;

	$: maxX = Math.max(...(systemPositions.map(({ x }) => Math.abs(x)) ?? [0]));
	$: maxY = Math.max(...(systemPositions.map(({ y }) => Math.abs(y)) ?? [0]));
	$: maxDistance = Math.hypot(maxX, maxY);

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

<SC.Canvas antialias {background}>
	{#if $system.data?.system?.locations}
		<SystemObjects locations={$system.data.system.locations} />
	{/if}

	<SC.Mesh
		geometry={new THREE.SphereGeometry(1)}
		position={[0, 0, 0]}
		material={new THREE.MeshBasicMaterial({ color: 0xae0000 })}
	/>

	<SystemFlights />

	<SC.PerspectiveCamera position={[100, maxDistance, 100]} />
	<SC.OrbitControls
		enableZoom={true}
		enablePan={false}
		target={middle}
		maxZoom={100}
		minZoom={20}
	/>
</SC.Canvas>
