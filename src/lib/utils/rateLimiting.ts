const resolveAfter = (ms: number) => new Promise((ok) => setTimeout(ok, ms));

export const rateLimit1 = (promoseFunc, msPerOp: number) => {
	let wait: Promise<unknown> = Promise.resolve();
	return (...a: unknown[]) => {
		// We use the queue tail in wait to start both the
		// next operation and the next delay
		const res = wait.then(() => promoseFunc(...a));
		wait = wait.then(() => resolveAfter(msPerOp));
		return res;
	};
};

export const limitedFetch = rateLimit1(fetch, 100);
