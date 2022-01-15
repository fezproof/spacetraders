<script lang="ts">
	import { SystemDataDocument } from '$lib/graphql/generated/operations';
	import { operationStore, query } from '@urql/svelte';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';
	import SystemObjects from './SystemObjects.svelte';

	const system = operationStore(SystemDataDocument, { systemId: 'XV' });

	query(system);

	$: maxX = Math.max(
		...($system.data?.system?.locations?.map(({ x }) => Math.abs(x)) ?? [0])
	);
	$: maxY = Math.max(
		...($system.data?.system?.locations?.map(({ y }) => Math.abs(y)) ?? [0])
	);
	$: maxDistance = Math.hypot(maxX, maxY);
</script>

<SC.Canvas antialias background={new THREE.Color('#0a0a0a')}>
	{#if $system.data?.system?.locations}
		<SystemObjects locations={$system.data?.system?.locations} />
	{/if}
	<SC.PerspectiveCamera position={[maxDistance, 100, 0]} />
	<SC.OrbitControls
		enableZoom={true}
		enablePan={false}
		autoRotate
		autoRotateSpeed={0.5}
	/>
</SC.Canvas>
