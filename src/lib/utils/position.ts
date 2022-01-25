import type { Position } from 'svelte-cubed';
import { Vector3 } from 'three';

export const isPosition = (pos: unknown[]): pos is Position => {
	if (pos?.length !== 3) return false;
	for (const value of pos) {
		if (Number.isNaN(+value)) return false;
	}

	return true;
};

export const getRandomOneMinusOne = (): number => Math.random() * 2 - 1;

export const distance = (a: Position, b: Position): number =>
	new Vector3(...a).distanceTo(new Vector3(...b));
