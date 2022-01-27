import type { CacheMap } from 'dataloader';
import DataLoader from 'dataloader';
import { batchGetLocations, LocationResult } from './services/locations/data';
import { batchGetSystems, SystemResult } from './services/systems/data';

const DAY = 60 * 60 * 24;

export interface Dataloaders {
	location: DataLoader<string, LocationResult>;
	system: DataLoader<string, SystemResult>;
}

export const createDataLoaders = (
	token: string,
	cache: CacheMap<string, any>
): Dataloaders => {
	return {
		location: createCacheableDataloader(
			'Location',
			batchGetLocations(token),
			cache,
			DAY
		),
		system: createCacheableDataloader(
			'System',
			batchGetSystems(token),
			cache,
			DAY
		)
	};
};

interface Cacheable<Value extends any = any> {
	ttl: number;
	value: Value;
	key: string;
}

export type AsyncCacheMap<K, V> = {
	get(key: K): Promise<V | void>;
	set(key: K, value: V): Promise<V | void>;
	delete(key: K): Promise<void>;
	clear(): Promise<void>;
};

export const createGraphqlCache = (
	kv: KVNamespace,
	LOG_REQUESTS: boolean
): AsyncCacheMap<string, Cacheable> => ({
	get: async (key) => {
		try {
			const value = await kv.get<Cacheable>(key, { type: 'json' });
			LOG_REQUESTS && console.log('get', key, value);
			if (value !== null) return value;
			console.log('miss', key);
			return undefined;
		} catch (error) {
			console.error('error getting', error);

			return;
		}
	},
	delete: async (key) => {
		LOG_REQUESTS && console.log('delete', key);

		return kv.delete(key);
	},
	clear: async () => {
		// Cannot call clear with KV
		console.log('clear');
		return;
	},
	set: async (key, promisedValue) => {
		try {
			const cacheable = await promisedValue;
			LOG_REQUESTS && console.log('set', key, cacheable);

			if (cacheable instanceof Error || cacheable === null) {
				return;
			}
			const { ttl } = cacheable;

			kv.put(key, JSON.stringify(cacheable), { expirationTtl: ttl });
			return cacheable;
		} catch (error) {
			console.error('error setting', error);
			return;
		}
	}
});

const cacheKeyFn = <T extends string = string>(type: string, key: string): T =>
	`${type}:${key}` as T;

const getCachedValues = async <K extends string = string>(
	keys: Readonly<K[]>,
	type: string,
	cache: AsyncCacheMap<string, Cacheable>
) => {
	const cacheResults: Promise<Cacheable | void>[] = [];
	for (const key of keys) {
		const cacheKey = cacheKeyFn(type, key);
		cacheResults.push(cache.get(cacheKey));
	}

	const results = await Promise.all(cacheResults);

	return {
		hits: results.reduce<Record<string, Cacheable>>((acc, result) => {
			if (result) acc[result.key] = result;
			return acc;
		}, {}),
		misses: results.reduce<K[]>((acc, result, index) => {
			if (!result) acc.push(keys[index]);
			return acc;
		}, [])
	};
};

const createCacheableDataloader = <
	Key extends string = string,
	Value = unknown
>(
	type: string,
	batchLoadFunction: (keys: Readonly<Key[]>) => Promise<(Value | Error)[]>,
	cacheMap: AsyncCacheMap<Key, Cacheable<Value>>,
	ttl: number
): DataLoader<Key, Value> => {
	const loader = new DataLoader<Key, Cacheable<Value>>(
		async (keys) => {
			const uniqueKeys = [...new Set(keys).values()];

			const { hits, misses } = await getCachedValues(
				uniqueKeys,
				type,
				cacheMap
			);

			const results = await batchLoadFunction(misses);

			await Promise.all(
				results.map((result, index) => {
					const key = misses[index];
					if (!(result instanceof Error)) {
						return cacheMap.set(cacheKeyFn(type, key), {
							value: result,
							ttl,
							key
						});
					}
				})
			);

			const missMap = results.reduce<Map<Key, Cacheable>>(
				(acc, result, index) => {
					const key = misses[index];
					if (result) {
						acc.set(key, { value: result, ttl, key });
					}
					return acc;
				},
				new Map()
			);

			return keys.map((key) => {
				return hits[key] ?? missMap.get(key);
			});
		},
		{
			cache: true,
			batchScheduleFn: (callback) => setTimeout(callback)
		}
	);

	return {
		clear: (key) => {
			loader.clear(key);
			return this;
		},
		clearAll: () => {
			loader.clearAll();
			return this;
		},
		load: async (key) => {
			const result = await loader.load(key);
			if (!result) return null;

			return result.value;
		},
		loadMany: async (keys) => {
			const results = await loader.loadMany(keys);

			return results.map((result) => {
				if (result instanceof Error) {
					return result;
				}
				return result.value;
			});
		},
		prime: (key, value) => {
			if (!(value instanceof Error)) loader.prime(key, { value, ttl, key });
			return this;
		}
	};
};
