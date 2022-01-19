import { Texture, TextureLoader } from 'three';

const textureLoader = new TextureLoader().setPath('/textures');

const planetPaths = [
	'/planet/habitable/alpine.png',
	'/planet/habitable/swamp.png',
	'/planet/habitable/savannah.png',
	'/planet/habitable/tropical.png',
	'/planet/inhospitable/martian.png',
	'/planet/inhospitable/venusian.png'
];

const cloudPaths = [
	'/planet/clouds/clouds1.png',
	'/planet/clouds/clouds2.png',
	'/planet/clouds/clouds3.png',
	'/planet/clouds/clouds4.png'
];

const gasGiantPaths = [
	'/planet/gas-giant/gaseous1.png',
	'/planet/gas-giant/gaseous2.png',
	'/planet/gas-giant/gaseous3.png',
	'/planet/gas-giant/gaseous4.png'
];

const moonPaths = [
	'/planet/inhospitable/icy.png',
	'/planet/inhospitable/martian.png',
	'/planet/inhospitable/volcanic.png'
];

const getRandomFromArray = <T = unknown>(array: T[]) => {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
};

export const getPlanetTexture = (): Texture => {
	const path = getRandomFromArray(planetPaths);
	const texture = textureLoader.load(path);

	return texture;
};

export const getCloudsTexture = (): Texture => {
	const path = getRandomFromArray(cloudPaths);
	const texture = textureLoader.load(path);

	return texture;
};

export const getGasGiantTexture = (): Texture => {
	const path = getRandomFromArray(gasGiantPaths);
	const texture = textureLoader.load(path);

	return texture;
};

export const getMoonTexture = (): Texture => {
	const path = getRandomFromArray(moonPaths);
	const texture = textureLoader.load(path);

	return texture;
};
