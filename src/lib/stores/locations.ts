import type { Position } from 'svelte-cubed';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

const locationMap = new Map<string, Writable<Position>>();

export const getLocationPosition = (id: string): Writable<Position> => {
	let store: Writable<Position>;
	if (!(store = locationMap.get(id))) {
		store = writable<Position>([0, 0, 0]);
		locationMap.set(id, store);
	}

	// TODO save memory over time somehow
	// onDestroy(() => {
	// 	shipLocationMap.delete(shipId);
	// });
	return store;
};
