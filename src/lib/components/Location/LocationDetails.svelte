<script lang="ts">
	import { LocationDetailsDocument } from '$lib/graphql/generated/operations';
	import { offset, target } from '$lib/stores/camera';
	import { isPosition } from '$lib/utils/position';
	import { operationStore, query } from '@urql/svelte';

	export let locationId: string;

	const locationDetails = operationStore(LocationDetailsDocument, {
		locationId
	});

	$: {
		$locationDetails.variables = { locationId };
	}

	query(locationDetails);

	$: position = [
		$locationDetails.data?.location?.x,
		0,
		$locationDetails.data?.location?.y
	];

	$: if (isPosition(position)) {
		target.set(position);
		offset.set([1, 10, 1]);
	}
</script>

<div
	class="max-h-96 max-w-3xl left-0 bottom-0 absolute flex flex-col bg-opacity-60 backdrop-filter backdrop-blur-lg border-t-2 border-b-2 border-cyan-200 text-cyan-200"
>
	<div class="p-4 font-bold text-xl">
		<h2>
			{locationId}
		</h2>
	</div>
	<div class="p-4 overflow-auto">
		{#if $locationDetails.fetching}
			Loading...
		{:else if $locationDetails.error}
			{$locationDetails.error.message}
		{:else}
			<pre class:text-gray-400={$locationDetails.stale}>
        {JSON.stringify($locationDetails.data, null, 2)}
      </pre>
		{/if}
	</div>
</div>
