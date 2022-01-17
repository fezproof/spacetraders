<script lang="ts">
	import GetChild from '$lib/components/ScExtends/GetChild.svelte';
	import {
		mouseEventSet,
		mouseIntersects,
		registerClickHandler
	} from '$lib/stores/mouse';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import type { Object3D } from 'three';

	let child: Object3D;

	// TODO make more robust
	$: if (child) mouseEventSet.update((set) => set.add(child));

	onDestroy(() => {
		mouseEventSet.update((set) => {
			set.delete(child);
			return set;
		});
	});

	const dispatch = createEventDispatcher();

	let entered = false;
	$: {
		if ($mouseIntersects.find(({ object }) => object === child)) {
			if (!entered) {
				dispatch('mouseenter', child);
				entered = true;
			}
		} else {
			if (entered) {
				dispatch('mouseleave', child);
				entered = false;
			}
		}
	}

	$: if (child)
		registerClickHandler((obj) => {
			dispatch('click', obj);
		}, child);
</script>

<GetChild bind:child>
	<slot />
</GetChild>
