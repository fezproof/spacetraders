<script lang="ts">
	import { onMount } from 'svelte';
	import { Primitive } from 'svelte-cubed';
	import { Object3D } from 'three';
	const object = new Object3D();
	object.name = '_';
	export let child: Object3D;
	onMount(() => {
		child = object.parent.children.filter((o) => o !== object)[0];
	});
</script>

<Primitive {object}>
	<slot />
</Primitive>
