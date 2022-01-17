<script lang="ts">
	import { LocationDetailsDocument } from '$lib/graphql/generated/operations';
	import { target } from '$lib/stores/camera';
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

	$: if (isPosition(position)) target.set(position);
</script>

<div
	class="w-full bg-red-800 text-white p-4 bg-opacity-60 backdrop-filter backdrop-blur-lg"
>
	<h2>
		{locationId}
	</h2>
</div>
<div
	class="w-full p-4 bg-black text-white bg-opacity-60 backdrop-filter backdrop-blur-lg"
>
	{#if $locationDetails.fetching}
		Loading...
	{:else if $locationDetails.error}
		{$locationDetails.error.message}
	{/if}
	<pre class:text-gray-400={$locationDetails.stale}>
    {JSON.stringify($locationDetails.data)}
  </pre>
</div>
