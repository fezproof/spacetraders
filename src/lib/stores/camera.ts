import type { Position } from 'svelte-cubed';
import { writable } from 'svelte/store';
import { tweened } from 'svelte/motion';
import type THREE from 'three';
import { lerpPosition } from '$lib/utils/lerp';

export const camera = writable<THREE.Camera | undefined>(undefined);

export const target = tweened<Position>([0, 0, 0], {
	duration: 300,
	interpolate: (a, b) => (t) => {
		return lerpPosition(a, b, t);
	}
});
