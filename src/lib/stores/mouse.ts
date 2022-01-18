import { derived, get, writable } from 'svelte/store';
import type { Object3D } from 'three';
import * as THREE from 'three';
import { camera } from './camera';

export const mouseCoords = writable({ x: 0, y: 0 });

const mouseRay = new THREE.Raycaster();

export const mouseRaycaster = derived(
	[mouseCoords, camera],
	([mouseCoordsObject, cameraObject]) => {
		if (typeof cameraObject?.type === 'string')
			mouseRay.setFromCamera(mouseCoordsObject, cameraObject);
		return mouseRay;
	}
);

export const mouseEventSet = writable<Set<THREE.Object3D<THREE.Event>>>(
	new Set()
);

export const mouseIntersects = derived(
	[mouseRaycaster, mouseEventSet],
	([ray, hoverSet]) => {
		const intersects = ray.intersectObjects(Array.from(hoverSet), false);
		return intersects;
	}
);

const clickHandlers = new Map();

export const registerClickHandler = <T extends Object3D>(
	callback: (obj: T) => void,
	obj: T
): void => {
	clickHandlers.set(obj.id, callback);
};

export const canvasClick = (): void => {
	// trigger click
	for (const { object } of get(mouseIntersects)) {
		const callback = clickHandlers.get(object.id);
		if (callback) callback(object);
	}
};
