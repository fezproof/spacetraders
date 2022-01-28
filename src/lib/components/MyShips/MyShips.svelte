<script lang="ts">
	import { MyShipsDocument } from '$lib/graphql/generated/operations';
	import { operationStore, query } from '@urql/svelte';
	const ships = operationStore(MyShipsDocument);

	query(ships);
</script>

{#if $ships.fetching}
	<p>Loading...</p>
{:else if $ships.error}
	<p>Oh no... {$ships.error.message}</p>
{:else}
	<ul>
		{#each $ships.data?.me?.ships ?? [] as ship (ship.id)}
			<li>
				<div>
					{ship.class}
				</div>
				<div>
					{ship.type}
				</div>
				<div>
					{ship.spaceAvailable}
				</div>
				<div>
					<h4>Position</h4>
					{#if ship.position?.__typename === 'Location'}
						<div>
							<h5>{ship.position.name}</h5>
						</div>
					{:else if ship.position?.__typename === 'FlightPlan'}
						<div>
							<h5>{ship.position.flightCode}</h5>
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
{/if}
