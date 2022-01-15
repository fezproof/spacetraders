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
	fetch(`https://api.spacetraders.io/systems/${systemId}/flight-plans`, {
		headers: { Authorization: `Bearer ${token}` }
	}).then((r) => r.json());
