<script lang="ts">
	import { FlightPlanDetailsDocument } from '$lib/graphql/generated/operations';

	import { offset, target } from '$lib/stores/camera';

	import { shipFlightPosition } from '$lib/stores/ships';
	import { operationStore, query } from '@urql/svelte';

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
			<h2 class="font-bold">
				{planId}
			</h2>
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
				<h2>
					{$flightPlanDetails.data?.flightPlan?.owner.username}
				</h2>
				<h3>
					{$flightPlanDetails.data?.flightPlan?.ship?.type}
				</h3>
				<div>
					<p>
						From: {$flightPlanDetails.data?.flightPlan?.departure.name} at
						{$flightPlanDetails.data?.flightPlan?.departure.x}
						{$flightPlanDetails.data?.flightPlan?.departure.y}
					</p>
					<p>
						To: {$flightPlanDetails.data?.flightPlan?.destination.name} at
						{$flightPlanDetails.data?.flightPlan?.destination.x}
						{$flightPlanDetails.data?.flightPlan?.destination.y}
					</p>
				</div>
			{/if}
		</div>
	</div>
</main>
