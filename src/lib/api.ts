import type { HttpMethod } from '@sveltejs/kit/types/internal';

const BASE_URL = 'https://api.spacetraders.io';

const waitTime = async (time: number) => {
	await new Promise((resolve) => setTimeout(resolve, time));
};

export const fetchSpacetraders = async <T = unknown>({
	path,
	method = 'get',
	headers
}: {
	path: string;
	method?: HttpMethod;
	headers?: HeadersInit;
}): Promise<T> => {
	let response = await fetch(BASE_URL.concat(path), {
		method,
		headers
	});

	if (response.status === 409 || response.status === 429) {
		// Retry incase hit rate limiting
		// Added randomness to reduce simultaneous request
		await waitTime(500 + Math.random() * 200);
		response = await fetch(BASE_URL.concat(path), {
			method,
			headers
		});
	}

	const result = await response.json();

	return result;
};

export interface StatusResponse {
	status: string;
}

export const getStatus = async (): Promise<StatusResponse> =>
	fetchSpacetraders({ path: '/game/status' });

interface AccountResponse {
	user: {
		credits: number;
		joinedAt: string;
		shipCount: number;
		structureCount: number;
		username: string;
	};
}

export const getMe = async (token: string): Promise<AccountResponse> =>
	fetchSpacetraders({
		path: '/my/account',
		headers: { Authorization: `Bearer ${token}` }
	});

interface LeaderboardNetWorth {
	netWorth: number;
	rank: number;
	username: string;
}

export interface LeaderboardResponse {
	netWorth: Array<LeaderboardNetWorth>;
}

export const getLeaderboard = async (
	token: string
): Promise<LeaderboardResponse> =>
	fetchSpacetraders({
		path: '/game/leaderboard/net-worth',
		headers: { Authorization: `Bearer ${token}` }
	});

interface ShipInfo {
	id: string;
	location: string;
}

export const getShip = async (id: string, token: string): Promise<ShipInfo> =>
	fetchSpacetraders({
		path: `/${id}`,
		headers: { Authorization: `Bearer ${token}` }
	});

interface ShipsResponse {
	ships: Array<ShipInfo>;
}

export const getMyShips = async (token: string): Promise<ShipsResponse> =>
	fetchSpacetraders({
		path: '/my/ships',
		headers: { Authorization: `Bearer ${token}` }
	});

interface LocationMarketplaceResponse {
	marketplace: {
		symbol: string;
		volumePerUnit: number;
		pricePerUnit: number;
		spread: number;
		purchasePricePerUnit: number;
		sellPricePerUnit: number;
		quantityAvailable: number;
	}[];
}

export const getLocationMarketplace = async (
	locationId: string,
	token: string
): Promise<LocationMarketplaceResponse> =>
	fetchSpacetraders({
		path: `/locations/${locationId}/marketplace`,
		headers: { Authorization: `Bearer ${token}` }
	});
