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

interface Cacheable<Value> {
	ttl: number;
	value: Value;
}

const dataLoaderCache = new Map();

export const createGraphqlCache = (
	LOG_REQUESTS: boolean
): CacheMap<string, Cacheable<any>> => {
	const cache: CacheMap<string, Cacheable<any>> = {
		get: (...args) => {
			LOG_REQUESTS && console.log('get', ...args);
			return dataLoaderCache.get(...args);
		},
		delete: (...args) => {
			LOG_REQUESTS && console.log('delete', ...args);

			return dataLoaderCache.delete(...args);
		},
		clear: (...args) => {
			LOG_REQUESTS && console.log('clear', ...args);

			return dataLoaderCache.clear(...args);
		},
		set: async (key, promisedValue) => {
			try {
				const value = await promisedValue;

				if (value instanceof Error || value === null) {
					return;
				}
				LOG_REQUESTS && console.log('set', key, value);
				dataLoaderCache.set(key, value);
			} catch (error) {
				return;
			}
		}
	};

	return cache;
};

const createCacheableDataloader = <
	Key extends string = string,
	Value = unknown
>(
	type: string,
	batchLoadFunction: (keys: Readonly<Key[]>) => Promise<(Value | Error)[]>,
	cacheMap: CacheMap<Key, Promise<Cacheable<Value>>>,
	ttl: number
): DataLoader<Key, Value> => {
	const loader = new DataLoader<Key, Cacheable<Value>>(
		async (keys) => {
			const results = await batchLoadFunction(keys);

			return results.map((result) => {
				if (result instanceof Error) {
					return result;
				}
				return { value: result, ttl };
			});
		},
		{
			cacheMap,
			cache: true,
			cacheKeyFn: (key) => `${type}:${key}` as Key,
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
			if (!(value instanceof Error)) loader.prime(key, { value, ttl });
			return this;
		}
	};
};
