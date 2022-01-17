import type { Position } from 'svelte-cubed';

export const isPosition = (pos: unknown[]): pos is Position => {
	if (pos?.length !== 3) return false;
	for (const value of pos) {
		if (Number.isNaN(value)) return false;
	}

	return true;
};
