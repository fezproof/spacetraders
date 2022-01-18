import { fetchSpacetraders } from '$lib/api';

interface SystemFlightPlanResponse {
	flightPlans: {
		id: string;
		shipId: string;
		createdAt: string;
		arrivesAt: string;
		destination: string;
		departure: string;
		username: string;
		shipType: string;
	}[];
}

export const getSystemFlightPlans = (
	systemId: string,
	token: string
): Promise<SystemFlightPlanResponse> =>
	fetchSpacetraders({
		path: `/systems/${systemId}/flight-plans`,
		headers: { Authorization: `Bearer ${token}` }
	});
