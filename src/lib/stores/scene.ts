import { writable } from 'svelte/store';
import type THREE from 'three';

export const scene = writable<THREE.Scene | undefined>(undefined);
