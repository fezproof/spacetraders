<script lang="ts" context="module">
	import type { LoadFn } from '$lib/globals';
	import { offset, target } from '$lib/stores/camera';
	import { shipPosition } from '$lib/stores/ships';

	export const load: LoadFn = ({ params: { shipId, systemId } }) => {
		return {
			props: { shipId, systemId }
		};
	};
</script>

<script lang="ts">
	export let shipId: string;
	export let systemId: string;

	$: position = shipPosition(shipId);

	$: {
		target.set($position);
		offset.set([10, 10, 10]);
	}
</script>

<main class="fixed bottom-4 left-4 right-4">
	<div
		class="max-h-96 max-w-3xl w-full left-0 bottom-0 absolute flex flex-col blur-container border-t-2 border-b-2 border-cyan-200 text-cyan-200"
	>
		<div
			class="px-4 pt-4 flex flex-row justify-between align-baseline text-xl font-heading "
		>
			<h2 class="font-bold">
				{shipId} -
			</h2>
			<a href={`/map/${systemId}`} class="uppercase">back</a>
		</div>
		<div>
			<p class="font-mono">
				{$position[0].toFixed(2)}
				{$position[2].toFixed(2)}
			</p>
		</div>
	</div>
</main>
