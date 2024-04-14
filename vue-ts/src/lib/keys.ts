export const useKeyEvent = (
	action: 'keydown' | 'keyup',
	key: string,
	handler: (data: KeyboardEvent) => void,
) => {
	window.addEventListener(action, (event: KeyboardEvent) => {
		if (event.key === key) handler(event);
	});
};

export const useKeyUp = (key: string, handler: (data: KeyboardEvent) => void) =>
	useKeyEvent('keyup', key, handler);

export const useKeyDown = (
	key: string,
	handler: (data: KeyboardEvent) => void,
) => useKeyEvent('keydown', key, handler);
