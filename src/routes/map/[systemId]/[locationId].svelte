<script context="module">
	export const load = async ({ params: { locationId } }) => {
		return {
			props: {
				locationId
			}
		};
	};
</script>

<script lang="ts">
	import LocationDetails from '$lib/components/Location/LocationDetails.svelte';

	export let locationId: string;
</script>

<main class="fixed bottom-4 left-4 right-4">
	<LocationDetails {locationId} />
</main>
