<script lang="ts" context="module">
	import type { LoadFn } from '$lib/globals';

	export const load: LoadFn = ({ params: { planId, systemId } }) => {
		return {
			props: { planId, systemId }
		};
	};
</script>

<script lang="ts">
	import ShipDetails from '$lib/components/FlightPlan/FlightPlanDetails.svelte';

	export let planId: string;
	export let systemId: string;
</script>

<main class="fixed bottom-4 left-4 right-4">
	<ShipDetails {planId} {systemId} />
</main>
