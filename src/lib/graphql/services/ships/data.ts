import { fetchSpacetraders, SpacetradersError } from '$lib/api';

export interface BasicShipInfo {
	type: string;
	class: string;
	maxCargo: number;
	loadingSpeed: number;
	speed: number;
	manufacturer: string;
	plating: number;
	weapons: number;
}

interface ShipDataResponse {
	ships?: BasicShipInfo[];
	error?: SpacetradersError;
}

export const getShipData = async (token: string): Promise<ShipDataResponse> =>
	fetchSpacetraders({
		path: '/types/ships',
		headers: { Authorization: `Bearer ${token}` }
	});

export const batchGetBasicShipInfo =
	(token: string) =>
	async (types: string[]): Promise<Array<BasicShipInfo | Error>> => {
		const shipResults = await getShipData(token);

		return types.map((type) => {
			if (!shipResults.ships) return new Error('Failed to get ship data');

			return (
				shipResults.ships.find(({ type: shipType }) => type === shipType) ??
				new Error(`Could not find data for ship type ${type}`)
			);
		});
	};
