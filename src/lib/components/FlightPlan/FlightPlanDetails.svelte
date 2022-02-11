<script lang="ts">
	import { FlightPlanDetailsDocument } from '$lib/graphql/generated/operations';
	import { offset, target } from '$lib/stores/camera';
	import { shipFlightPosition } from '$lib/stores/ships';
	import { typewriter } from '$lib/transitions/typewriter';
	import { operationStore, query } from '@urql/svelte';
	import LoadingText from '../General/LoadingText.svelte';

	export let planId: string;
	export let systemId: string;

	const flightPlanDetails = operationStore(FlightPlanDetailsDocument, {
		flightPlanId: planId,
		systemId
	});

	$: {
		$flightPlanDetails.variables = { flightPlanId: planId, systemId };
	}

	query(flightPlanDetails);

	$: position = shipFlightPosition(planId);

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
			<LoadingText
				loading={$flightPlanDetails.fetching || $flightPlanDetails.stale}
			>
				<h2 in:typewriter>{$flightPlanDetails.data?.flightPlan?.flightCode}</h2>
			</LoadingText>
			<a href={`/map/${systemId}`} class="uppercase">back</a>
		</div>
		<div class="px-4">
			<p class="font-mono">
				{$position[0].toFixed(2)}
				{$position[2].toFixed(2)}
			</p>
		</div>
		<div class="p-4">
			{#if $flightPlanDetails.fetching}
				<div>Loading...</div>
			{:else}
				<LoadingText loading={$flightPlanDetails.stale}>
					<slot slot="loading">
						<div class="h-24 font-block">
							<h2>Loading username</h2>
							<p>Loading ship type</p>
							<div>
								<p>
									To: <span class="text-orange-300">location</span> loading
								</p>
								<p>
									From: <span class="text-orange-300">location</span> loading
								</p>
							</div>
						</div>
					</slot>
					<div in:typewriter class="h-24">
						<h2>
							{$flightPlanDetails.data?.flightPlan?.owner.username}
						</h2>
						<p>
							{$flightPlanDetails.data?.flightPlan?.ship?.type}
						</p>
						<div>
							<p>
								From:
								<a
									href={`/map/${systemId}/${$flightPlanDetails.data?.flightPlan?.departure?.id}`}
									class="text-orange-300"
								>
									{$flightPlanDetails.data?.flightPlan?.departure.name}</a
								>
								at
								{$flightPlanDetails.data?.flightPlan?.departure.x}
								{$flightPlanDetails.data?.flightPlan?.departure.y}
							</p>
							<p>
								To: <a
									href={`/map/${systemId}/${$flightPlanDetails.data?.flightPlan?.destination?.id}`}
									class="text-orange-300"
								>
									{$flightPlanDetails.data?.flightPlan?.destination.name}
								</a>
								at
								{$flightPlanDetails.data?.flightPlan?.destination.x}
								{$flightPlanDetails.data?.flightPlan?.destination.y}
							</p>
						</div>
					</div>
				</LoadingText>
			{/if}
		</div>
	</div>
</main>
