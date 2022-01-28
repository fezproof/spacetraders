<script lang="ts">
	import { LocationDetailsDocument } from '$lib/graphql/generated/operations';
	import { enablePanning, offset, target } from '$lib/stores/camera';
	import { typewriter } from '$lib/transitions/typewriter';
	import { isPosition } from '$lib/utils/position';
	import { operationStore, query } from '@urql/svelte';
	import { lowerCase, upperFirst } from 'lodash-es';
	import LoadingText from '../General/LoadingText.svelte';
	import { scale, fly } from 'svelte/transition';

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
		offset.set([
			$locationDetails.data?.location?.size * 5,
			$locationDetails.data?.location?.size,
			$locationDetails.data?.location?.size * 5
		]);
		enablePanning.set(false);
	}
</script>

<!-- Location header -->
<div
	class="absolute left-0 top-0 right-0 flex flex-row flex-nowrap justify-center"
>
	<h1
		class="blur-container p-4 border-y-2 border-cyan-200 font-heading text-2xl font-semibold"
		transition:fly={{ x: 0, y: -32 }}
	>
		{locationId}:
		<LoadingText
			loading={$locationDetails.stale && !$locationDetails.data?.location?.name}
		>
			<slot slot="loading">
				<span class="font-bold font-block" in:typewriter>Loading</span>
			</slot>
			<span class="font-bold" in:typewriter>
				{$locationDetails?.data?.location?.name}
			</span>
		</LoadingText>
	</h1>
</div>

<div class="absolute right-0 top-0" transition:scale>
	<a href={`/map/${systemId}`} class="btn">Back</a>
</div>

<div
	class="grid grid-cols-3 grid-rows-3 absolute top-28 right-0 left-0 bottom-0 items-stretch"
>
	<div
		class="col-span-1 place-self-stretch self-stretch panel"
		transition:scale
	>
		<h3 class="font-heading">Location ships</h3>
	</div>

	<div
		class="col-start-[-2] row-span-3 place-self-stretch self-center panel min-h-[20rem]"
		transition:scale
	>
		<h3 class="font-heading mb-2">Marketplace</h3>
		<table class="w-full table-fixed text-left">
			<thead class="font-heading ">
				<tr>
					<th class="w-48">Name</th>
					<th>Volume</th>
					<th>Buy</th>
					<th>Sell</th>
					<th>Available</th>
				</tr>
			</thead>
			<LoadingText
				loading={$locationDetails.stale &&
					!$locationDetails.data?.location?.marketplace}
			>
				<slot slot="loading">
					<tbody in:typewriter class="font-block">
						<tr>
							<td>Loading</td>
							<td>V</td>
							<td>P</td>
							<td>Quantity</td>
						</tr>
						<tr>
							<td>Loading</td>
							<td>V</td>
							<td>P</td>
							<td>Quantity</td>
						</tr>
						<tr>
							<td>Loading</td>
							<td>V</td>
							<td>P</td>
							<td>Quantity</td>
						</tr>
					</tbody>
				</slot>
				<tbody in:typewriter>
					{#if $locationDetails?.data?.location?.marketplace}
						{#each $locationDetails.data.location.marketplace as market}
							<tr>
								<td>{market.name}</td>
								<td>{market.volumePerUnit}</td>
								<td>{market.purchasePricePerUnit}</td>
								<td>{market.sellPricePerUnit}</td>
								<td>{market.quantityAvailable}</td>
							</tr>
						{/each}
					{:else}
						<td>No ships at market</td>
					{/if}
				</tbody>
			</LoadingText>
		</table>
	</div>

	<div
		class="col-span-1 row-start-3 place-self-stretch self-stretch panel"
		transition:scale
	>
		<h3 class="font-heading mb-2">Traits</h3>
		<LoadingText
			loading={$locationDetails.stale &&
				!$locationDetails.data?.location?.traits}
		>
			<slot slot="loading">
				<ul in:typewriter class="font-block">
					<li>Loading trait 1</li>
					<li>Loading trait 2</li>
				</ul>
			</slot>
			<div in:typewriter>
				{#if $locationDetails?.data?.location?.traits}
					<ul>
						{#each $locationDetails.data.location.traits as trait}
							<li>
								<span>{upperFirst(lowerCase(trait))}</span>
							</li>
						{/each}
					</ul>
				{:else}
					<p>No traits</p>
				{/if}
			</div>
		</LoadingText>
	</div>
</div>

<style lang="postcss">
	.panel {
		@apply backdrop-filter backdrop-blur-xl bg-cyan-900/30 p-4 border-y-2 border-cyan-200;
	}

	th {
		@apply py-2 px-2 text-sm;
	}

	td {
		@apply py-1 px-2;
	}
</style>
