<script lang="ts">
	import { getStatus } from './api';

	import { useQuery } from './fetcher';

	const status = useQuery('status', getStatus);
</script>

{#await $status.data}
	<p>Loading....</p>
{:then data}
	<p class:text-gray-500={$status.stale}>{data.status}</p>
{:catch}
	<p>An error occured :(</p>
{/await}
