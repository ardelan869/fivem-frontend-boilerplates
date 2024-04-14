import {
	createEffect,
	createSignal,
	onCleanup,
} from 'solid-js';
import { noop } from './constants';

export const useKeyEvent = (
	action: 'keydown' | 'keyup',
	key: string,
	handler: (data: KeyboardEvent) => void,
) => {
	const [savedHandler, setSavedHandler] =
		createSignal<(data: KeyboardEvent) => void>(noop);

	createEffect(() => {
		setSavedHandler(() => handler);
	});

	createEffect(() => {
		const keyListener = (event: KeyboardEvent) => {
			if (savedHandler() && event.key === key) savedHandler()(event);
		};

		window.addEventListener(action, keyListener);

		onCleanup(() => window.removeEventListener(action, keyListener));
	});
};

export const useKeyUp = (key: string, handler: (data: KeyboardEvent) => void) =>
	useKeyEvent('keyup', key, handler);

export const useKeyDown = (
	key: string,
	handler: (data: KeyboardEvent) => void,
) => useKeyEvent('keydown', key, handler);
