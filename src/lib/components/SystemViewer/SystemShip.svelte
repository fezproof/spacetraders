<script lang="ts">
	import { inverseLerp, lerpPosition } from '$lib/utils/lerp';
	import * as SC from 'svelte-cubed';
	import type { Position } from 'svelte-cubed/types/common';
	import * as THREE from 'three';

	export let startPos: Position;
	export let endPos: Position;
	export let startedAt: Date;
	export let endsAt: Date;

	const getTimeAlpha = () => {
		const result = inverseLerp(
			startedAt.getTime(),
			endsAt.getTime(),
			Date.now()
		);
		return result;
	};

	let position: SC.Position = lerpPosition(startPos, endPos, getTimeAlpha());

	SC.onFrame(() => {
		position = lerpPosition(startPos, endPos, getTimeAlpha());
	});
</script>

<SC.Mesh
	{position}
	geometry={new THREE.CylinderGeometry(0.3, 0.3, 0.1)}
	material={new THREE.MeshBasicMaterial({ color: 'yellow' })}
/>
