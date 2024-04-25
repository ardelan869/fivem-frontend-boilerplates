import { MutableRefObject, useEffect, useRef } from 'react';
import { noop } from './constants';

export const useKeyEvent = (
	action: 'keydown' | 'keyup',
	key: string,
	handler: (data: KeyboardEvent) => void,
) => {
	const savedHandler: MutableRefObject<(data: KeyboardEvent) => void> =
		useRef(noop);

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const keyListener = (event: KeyboardEvent) => {
			if (savedHandler.current && event.key === key)
				savedHandler.current(event);
		};

		window.addEventListener(action, keyListener);

		return () => window.removeEventListener(action, keyListener);
	}, [action, key, handler]);
};

export const useKeyUp = (key: string, handler: (data: KeyboardEvent) => void) =>
	useKeyEvent('keyup', key, handler);

export const useKeyDown = (
	key: string,
	handler: (data: KeyboardEvent) => void,
) => useKeyEvent('keydown', key, handler);
