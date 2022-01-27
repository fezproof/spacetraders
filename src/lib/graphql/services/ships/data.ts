import { fetchSpacetraders, SpacetradersError } from '$lib/api';

interface BasicShipInfo {
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
