import type { Position } from 'svelte-cubed';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

const shipLocationMap = new Map<string, Writable<Position>>();

export const shipPosition = (shipId: string): Writable<Position> => {
	let store: Writable<Position>;
	if (!(store = shipLocationMap.get(shipId))) {
		store = writable<Position>([0, 0, 0]);
		shipLocationMap.set(shipId, store);
	}

	// TODO save memory over time somehow
	// onDestroy(() => {
	// 	shipLocationMap.delete(shipId);
	// });
	return store;
};
