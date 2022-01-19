import type { Position } from 'svelte-cubed';
import { tweened } from 'svelte/motion';
import { writable } from 'svelte/store';
import type THREE from 'three';

export const camera = writable<THREE.Camera | undefined>(undefined);

export const target = writable<Position>([0, 0, 0]);

export const offset = writable<Position>([100, 100, 100]);

export const enablePanning = writable<boolean>(true);

export const softTarget = tweened<Position>([0, 0, 0], { duration: 300 });

export const cameraPosition = tweened([0, 0, 0], {
	duration: 300
});
