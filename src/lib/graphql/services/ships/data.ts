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

interface CargoInfo {
	good: string;
	quantity: number;
	totalVolume: number;
}

export interface MyShipInfo {
	id: string;
	type: string;
	location?: string;
	flightPlanId?: string;
	x?: number;
	y?: number;
	cargo?: CargoInfo[];
	spaceAvailable?: number;
	class?: string;
	maxCargo?: number;
	loadingSpeed?: number;
	speed?: number;
	manufacturer?: string;
	plating?: number;
	weapons?: number;
}

interface ShipsResponse {
	ships?: Array<MyShipInfo>;
	error?: SpacetradersError;
}

export const getMyShips = async (token: string): Promise<ShipsResponse> =>
	fetchSpacetraders({
		path: '/my/ships',
		headers: { Authorization: `Bearer ${token}` }
	});
