export const typewriter = (
	node: Node,
	{ delay = 0, speed = 10 }: { delay?: number; speed?: number } | undefined
): SvelteTransitionReturnType => {
	const textNodes = getAllTextNodes(node);
	if (!textNodes.length) {
		throw new Error(`This transition only works on elements with text nodes`);
	}

	let totalLength = 0;
	const ranges = textNodes.map((textNode) => {
		const range = [totalLength, totalLength + textNode.textContent.length];
		totalLength += textNode.textContent.length;
		const text = textNode.textContent;
		textNode.textContent = '';
		return { textNode, range, text };
	});

	let currentRangeIndex = 0;
	function getCurrentRange(i: number) {
		while (
			ranges[currentRangeIndex].range[1] < i &&
			currentRangeIndex < ranges.length
		) {
			const { textNode, text } = ranges[currentRangeIndex];
			textNode.textContent = text; // finish typing up the last node
			currentRangeIndex++;
		}
		return ranges[currentRangeIndex];
	}
	const duration = totalLength / (speed * 0.01);

	return {
		delay,
		duration,
		tick: (t) => {
			const progress = ~~(totalLength * t);
			const { textNode, range, text } = getCurrentRange(progress);
			const [start, end] = range;
			const textLength = ((progress - start) / (end - start)) * text.length;

			textNode.textContent = text.slice(0, textLength);
		}
	};
};

const getAllTextNodes = (node: Node): Node[] => {
	if (node.nodeType === 3) {
		return [node];
	} else if (node.hasChildNodes()) {
		const list: Node[] = [];
		node.childNodes.forEach((child) => {
			getAllTextNodes(child).forEach((textNode) => list.push(textNode));
		});

		return list;
	}
	return [];
};
