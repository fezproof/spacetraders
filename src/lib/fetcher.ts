import { derived, get, writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { onMount } from 'svelte';

const dateCache = new Map();

interface GetDataReturn<T> {
	stale: boolean;
	data: Promise<T>;
	error?: Error;
	refetch: () => Promise<void>;
}

type AsyncStore<T> = Readable<GetDataReturn<T>>;

const createAsyncStore = <T = unknown>(
	key: string,
	promise: () => Promise<T>
): AsyncStore<T> => {
	const dataStore = writable<Promise<T>>(
		new Promise(() => {
			return;
		})
	);

	if (dateCache.has(key)) {
		dataStore.set(Promise.resolve(dateCache.get(key)));
	}

	const staleStore = writable(false);
	const errorStore = writable<undefined | Error>(undefined);

	const load = async () => {
		staleStore.set(true);
		try {
			const data = await promise();

			dateCache.set(key, data);
			dataStore.set(Promise.resolve(data));
		} catch (e: unknown) {
			if (e instanceof Error) {
				errorStore.set(e);
			}
		} finally {
			staleStore.set(false);
		}
	};

	let loading: ReturnType<typeof load> | null = null;
	const loadOnce = () => {
		if (!loading) {
			loading = load().finally(() => {
				loading = null;
			});
		}
		return loading;
	};

	const allStore = derived(
		[dataStore, staleStore, errorStore],
		([data, stale, error]): GetDataReturn<T> => ({
			data,
			stale: stale && dateCache.has(key),
			error,
			refetch: loadOnce
		})
	);

	return allStore;
};

const storeCache = new Map();

export const useQuery = <T = unknown>(
	key: string,
	promise: () => Promise<T>
): AsyncStore<T> => {
	let store: AsyncStore<T>;
	if (!(store = storeCache.get(key))) {
		store = createAsyncStore(key, promise);
		storeCache.set(key, store);
	}

	onMount(() => {
		get(store).refetch();
	});

	return store;
};
