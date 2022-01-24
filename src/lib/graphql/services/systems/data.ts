import { fetchSpacetraders, SpacetradersError } from '$lib/api';

export interface SystemResult {
	symbol: string;
	name: string;
}

export interface GetSystemResponse {
	system?: SystemResult;
	error?: SpacetradersError;
}

export const getSystemInfo = (
	systemId: string,
	token: string
): Promise<GetSystemResponse> =>
	fetchSpacetraders({
		path: `/systems/${systemId}`,
		headers: { Authorization: `Bearer ${token}` }
	});

export const batchGetSystems =
	(token: string) =>
	async (keys: string[]): Promise<Array<SystemResult | Error>> => {
		const keySet = new Set(keys);

		const systemPromises: Array<Promise<GetSystemResponse['system'] | Error>> =
			[];

		for (const key of keySet) {
			systemPromises.push(
				getSystemInfo(key, token)
					.then((r) => {
						return r?.system ? r.system : new Error(r?.error.message);
					})
					.catch((e) => new Error(e))
			);
		}

		const systemResults = await Promise.all(systemPromises);

		return keys.map((key) => {
			const system =
				systemResults.find((location) => {
					if (!(location instanceof Error)) {
						return location.symbol === key;
					}
					return false;
				}) ?? new Error(`System ${key} not found`);

			return system;
		});
	};
