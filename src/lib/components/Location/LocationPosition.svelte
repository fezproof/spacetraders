<script lang="ts">
	import { getLocationPosition } from '$lib/stores/locations';

	import { inverseLerp, lerp } from '$lib/utils/lerp';

	import * as SC from 'svelte-cubed';

	export let locationId: string;
	export let parentId: string;
	export let distance: number;

	$: period = 2 * Math.PI * Math.sqrt(Math.pow(distance, 3) / 1) * 1000;

	let startTime = Date.now();
	const angleOffest = Math.PI * 2 * Math.random();
	let angle = angleOffest;

	SC.onFrame(() => {
		const time = inverseLerp(startTime, startTime + period, Date.now());
		angle = lerp(angleOffest, angleOffest + Math.PI * 2, time);
		if (time === 1) {
			startTime = Date.now();
		}
	});

	let position = getLocationPosition(locationId);
	let parentPosition = getLocationPosition(parentId);

	$: $position = [
		$parentPosition[0] + distance * Math.cos(angle),
		0,
		$parentPosition[2] + distance * Math.sin(angle)
	] as SC.Position;
</script>

<SC.Group position={$position}><slot /></SC.Group>
