<script lang="ts">
	import { SystemFlightsDocument } from '$lib/graphql/generated/operations';
	import { operationStore, query } from '@urql/svelte';
	import { onDestroy } from 'svelte';
	import * as SC from 'svelte-cubed';
	import SystemFlightShip from '../Ship/SystemShipFlight.svelte';

	export let systemId: string;

	const systemFlights = operationStore(SystemFlightsDocument, {
		systemId
	});

	$: {
		$systemFlights.variables = { systemId };
	}

	query(systemFlights);

	const interval = setInterval(() => {
		$systemFlights.reexecute({ requestPolicy: 'network-only' });
	}, 10000);

	onDestroy(() => {
		clearInterval(interval);
	});

	$: activeFlights = $systemFlights.data?.system?.activeFlights ?? [];
</script>

<SC.Group position={[0, 0, 0]}>
	{#each activeFlights as { departure, destination, id, arrivesAt, createdAt, owner } (id)}
		{#if departure && destination}
			<SystemFlightShip
				flightId={id}
				startPos={[departure.x, 0, departure.y]}
				endPos={[destination.x, 0, destination.y]}
				startedAt={new Date(createdAt)}
				endsAt={new Date(arrivesAt)}
				colour={owner.colour}
			/>
		{/if}
	{/each}
</SC.Group>
