import { MutableRefObject, useEffect, useRef } from 'react';
import { noop } from '.';

export const useDragScroll = (slider: HTMLElement) => {
	let isDown = false;
	let startX: number;
	let scrollLeft: number;

	slider.addEventListener('mousedown', (e) => {
		isDown = true;
		startX = e.pageX - slider.offsetLeft;
		scrollLeft = slider.scrollLeft;
	});

	slider.addEventListener('mouseup', () => (isDown = false));
	slider.addEventListener('mouseleave', () => (isDown = false));

	slider.addEventListener('mousemove', (e) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - slider.offsetLeft;
		const walk = x - startX;
		slider.scrollLeft = scrollLeft - walk;
	});

	slider.classList.add('scroll-drag');
};

export const useNuiEvent = <T = any>(
	action: string,
	handler: (data: T) => void,
) => {
	const savedHandler: MutableRefObject<NuiHandlerSignature<T>> = useRef(noop);

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const eventListener = (event: MessageEvent) => {
			if (savedHandler.current) {
				if (event.data.action === action) {
					savedHandler.current(event.data.data as T);
				}
			}
		};

		window.addEventListener('message', eventListener);
		return () => window.removeEventListener('message', eventListener);
	}, [action]);
};

export const useKeyEvent = (
	key: string,
	handler: (data: KeyboardEvent) => void,
) => {
	const savedHandler: MutableRefObject<(e: KeyboardEvent) => any> =
		useRef(noop);

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const keyListener = (event: KeyboardEvent) => {
			if (savedHandler.current) {
				if (event.key === key) {
					savedHandler.current(event);
				}
			}
		};

		window.addEventListener('keydown', keyListener);
		return () =>
			window.removeEventListener('keydown', keyListener);
	}, [key]);
};
