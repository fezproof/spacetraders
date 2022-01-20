<script lang="ts">
	import { LocationDetailsDocument } from '$lib/graphql/generated/operations';
	import { enablePanning, offset, target } from '$lib/stores/camera';
	import { isPosition } from '$lib/utils/position';
	import { operationStore, query } from '@urql/svelte';
	import { lowerCase, upperFirst } from 'lodash-es';

	export let locationId: string;
	export let systemId: string;

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
		offset.set([10, 3, 10]);
		enablePanning.set(false);
	}
</script>

<div
	class="max-h-96 max-w-3xl w-full left-0 bottom-0 absolute flex flex-col blur-container border-t-2 border-b-2 border-cyan-200 text-cyan-200"
>
	<div
		class="px-4 pt-4 flex flex-row justify-between align-baseline text-xl font-heading "
	>
		<h2 class="font-bold">
			{locationId} -
			<span class="text-orange-300">
				{#if $locationDetails.fetching}
					Loading...
				{:else}
					{$locationDetails?.data?.location?.name}
				{/if}
			</span>
		</h2>
		<a href={`/map/${systemId}`} class="uppercase">back</a>
	</div>
	<div class="p-4 overflow-auto" class:text-cyan-500={$locationDetails.stale}>
		{#if $locationDetails.fetching}
			Loading...
		{:else if $locationDetails.error}
			{$locationDetails.error.message}
		{:else if !$locationDetails?.data?.location}
			<p>No location data found</p>
		{:else}
			<h3 class="uppercase font-bold text-lg mb-4">
				{$locationDetails.data?.location?.type}
			</h3>
			<div class="mb-2">
				<h4 class="uppercase font-bold">Marketplace</h4>
				{#if $locationDetails?.data?.location?.marketplace}
					<ul>
						{#each $locationDetails?.data?.location?.marketplace as market}
							<li>
								<span>{market.symbol}</span>
							</li>
						{/each}
					</ul>
				{:else if $locationDetails.stale}
					Loading...
				{:else}
					<p>No ships at market</p>
				{/if}
			</div>
			<div>
				<h4 class="uppercase font-bold">Traits</h4>
				<ul>
					{#if $locationDetails?.data?.location?.traits}
						{#each $locationDetails?.data?.location?.traits as trait}
							<li>
								<span>{upperFirst(lowerCase(trait))}</span>
							</li>
						{/each}
					{:else if $locationDetails.stale}
						Loading...
					{:else}
						<p>No traits</p>
					{/if}
				</ul>
			</div>
		{/if}
	</div>
</div>
