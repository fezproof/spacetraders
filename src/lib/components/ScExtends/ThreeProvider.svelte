<script lang="ts">
	import { camera } from '$lib/stores/camera';
	import { scene } from '$lib/stores/scene';

	import { onMount } from 'svelte';
	import { Primitive } from 'svelte-cubed';
	import { Camera, Object3D, Scene } from 'three';

	const object = new Object3D();
	const findScene = (object: Object3D): Scene => {
		let rootNode = object;
		while (rootNode.parent) {
			rootNode = rootNode.parent;
		}
		if (rootNode.type !== 'Scene') {
			throw new Error('Root node of the scene is not a Scene');
		}
		return rootNode as Scene;
	};
	const findCamera = (
		object: Object3D,
		throwOnNull: boolean = true
	): Camera | null => {
		if (object.type.endsWith('Camera')) {
			return object as Camera;
		}
		for (let child of object.children) {
			const childCamera = findCamera(child, false);
			if (childCamera) {
				return childCamera;
			}
		}
		if (throwOnNull) {
			throw new Error('Unable to find a camera in the scene');
		}
	};
	onMount(() => {
		$scene = findScene(object);
		$camera = findCamera($scene);
	});
</script>

<Primitive {object}>
	<slot />
</Primitive>
