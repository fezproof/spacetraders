<script lang="ts">
	import GetEvents from '$lib/components/ScExtends/GetEvents.svelte';
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	export let position: SC.Position = [0, 0, 0];
	export let radius = 1;

	const originalColour = 0x00d9d9;
	const hoverOpacity = 0.5;
	const blurOpacity = 0.1;

	let opacity = blurOpacity;
	let color = originalColour;

	const mouseEnterHandler = () => {
		opacity = hoverOpacity;
	};

	const mouseExitHandler = () => {
		opacity = blurOpacity;
	};
</script>

<GetEvents
	on:mouseenter={mouseEnterHandler}
	on:mouseleave={mouseExitHandler}
	on:click
>
	<SC.Mesh
		{position}
		geometry={new THREE.SphereGeometry(radius)}
		material={new THREE.MeshBasicMaterial({
			color,
			transparent: true,
			opacity,
			depthWrite: false
		})}
	>
		<slot />
	</SC.Mesh>
</GetEvents>
