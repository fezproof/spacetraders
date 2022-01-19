<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { inverseLerp, lerpPosition } from '$lib/utils/lerp';
	import { isEqual } from 'lodash-es';
	import * as SC from 'svelte-cubed';
	import type { Position } from 'svelte-cubed/types/common';
	import * as THREE from 'three';
	import HoverSphere from '../ScExtends/HoverSphere.svelte';
	import { shipPosition } from '$lib/stores/ships';

	export let shipId: string;
	export let startPos: Position;
	export let endPos: Position;
	export let startedAt: Date;
	export let endsAt: Date;
	export let colour: number | undefined;

	const getTimeAlpha = () => {
		const result = inverseLerp(
			startedAt.getTime(),
			endsAt.getTime(),
			Date.now()
		);
		return result;
	};

	const clickHandler = () => {
		goto(`/map/${$page.params.systemId}/ship/${shipId}`);
	};

	const position = shipPosition(shipId);

	$: $position = lerpPosition(startPos, endPos, getTimeAlpha());

	SC.onFrame(() => {
		$position = lerpPosition(startPos, endPos, getTimeAlpha());
	});

	$: rotation = new THREE.Euler()
		.setFromQuaternion(
			new THREE.Quaternion().setFromUnitVectors(
				new THREE.Vector3(0, 1, 0),
				new THREE.Vector3(...endPos)
					.sub(new THREE.Vector3(...startPos))
					.normalize()
			)
		)
		.toArray() as SC.Rotation;
</script>

{#if !isEqual(endPos, position)}
	<SC.Group position={$position}>
		<HoverSphere radius={0.5} on:click={clickHandler}>
			<SC.Mesh
				geometry={new THREE.ConeGeometry(0.2, 0.5, 3)}
				material={new THREE.MeshBasicMaterial({ color: colour || 0xff00ff })}
				{rotation}
			/>
		</HoverSphere>
	</SC.Group>
{/if}
