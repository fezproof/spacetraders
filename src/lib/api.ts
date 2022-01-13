import { TOKEN } from './token';

export interface StatusResponse {
	status: string;
}

export const getStatus = async (): Promise<StatusResponse> =>
	fetch('https://api.spacetraders.io/game/status').then((r) => r.json());

interface AccountResponse {
	user: {
		credits: number;
		joinedAt: string;
		shipCount: number;
		structureCount: number;
		username: string;
	};
}

export const getMe = async (): Promise<AccountResponse> =>
	fetch('https://api.spacetraders.io/my/account', {
		headers: { Authorization: `Bearer ${TOKEN}` }
	}).then((r) => r.json());

interface LeaderboardNetWorth {
	netWorth: number;
	rank: number;
	username: string;
}

export interface LeaderboardResponse {
	netWorth: Array<LeaderboardNetWorth>;
}

export const getLeaderboard = async (): Promise<LeaderboardResponse> =>
	fetch('https://api.spacetraders.io/game/leaderboard/net-worth', {
		headers: { Authorization: `Bearer ${TOKEN}` }
	}).then((r) => r.json());

interface ShipInfo {
	id: string;
	location: string;
}

export const getShip = async (id: string): Promise<ShipInfo> =>
	fetch(`https://api.spacetraders.io/ship/${id}`, {
		headers: { Authorization: `Bearer ${TOKEN}` }
	}).then((r) => r.json());

interface ShipsResponse {
	ships: Array<ShipInfo>;
}

export const getMyShips = async (): Promise<ShipsResponse> =>
	fetch('https://api.spacetraders.io/my/ships', {
		headers: { Authorization: `Bearer ${TOKEN}` }
	}).then((r) => r.json());

interface LocationResponse {
	location: {
		symbol: string;
		type: string;
		name: string;
		x: number;
		y: number;
		allowsConstruction: boolean;
		traits: [string];
		dockedShips: number;
	};
}

export const getLocation = async (locationId: string): Promise<LocationResponse> =>
	fetch(`https://api.spacetraders.io/locations/${locationId}`, {
		headers: { Authorization: `Bearer ${TOKEN}` }
	}).then((r) => r.json());

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
	locationId: string
): Promise<LocationMarketplaceResponse> =>
	fetch(`https://api.spacetraders.io/locations/${locationId}/marketplace`, {
		headers: { Authorization: `Bearer ${TOKEN}` }
	}).then((r) => r.json());
