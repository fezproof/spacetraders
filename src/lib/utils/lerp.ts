import type { Position } from 'svelte-cubed';

const clamp = (value: number, min: number, max: number) => {
	return Math.min(Math.max(value, min), max);
};

export const lerp = (start: number, end: number, percent: number): number => {
	const result = start * (1 - percent) + end * percent;
	return clamp(result, Math.min(start, end), Math.max(start, end));
};

export const lerpPosition = (
	start: Position,
	end: Position,
	percent: number
): Position => {
	return [
		lerp(start[0], end[0], percent),
		lerp(start[1], end[1], percent),
		lerp(start[2], end[2], percent)
	];
};

export const inverseLerp = (
	start: number,
	end: number,
	middle: number
): number => {
	return clamp((middle - start) / (end - start), 0, 1);
};
