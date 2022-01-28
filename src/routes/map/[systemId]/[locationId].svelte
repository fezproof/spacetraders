<script context="module">
	export const load = async ({ params: { locationId, systemId } }) => {
		return {
			props: {
				locationId,
				systemId
			}
		};
	};
</script>

<script lang="ts">
	import LocationDetails from '$lib/components/Location/LocationDetails.svelte';

	export let locationId: string;
	export let systemId: string;
</script>

<main class="fixed bottom-4 left-4 right-4 top-24">
	<LocationDetails {locationId} {systemId} />
</main>
