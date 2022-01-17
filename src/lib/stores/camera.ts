import { lerpPosition } from '$lib/utils/lerp';
import type { Position } from 'svelte-cubed';
import { quadInOut } from 'svelte/easing';
import { tweened } from 'svelte/motion';
import { writable } from 'svelte/store';
import type THREE from 'three';

export const camera = writable<THREE.Camera | undefined>(undefined);

export const target = tweened<Position>([0, 0, 0], {
	duration: 300,
	easing: quadInOut,
	interpolate: (a, b) => (t) => {
		return lerpPosition(a, b, t);
	}
});
