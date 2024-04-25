import { MutableRefObject, useEffect, useRef } from 'react';
import { noop } from './constants';

export const dragScroll = (slider: HTMLElement): void => {
	let isDown = false;
	let startX: number;
	let scrollLeft: number;

	const handleMouseDown = (e: MouseEvent): void => {
		isDown = true;
		startX = e.pageX - slider.getBoundingClientRect().left;
		scrollLeft = slider.scrollLeft;
	};

	const handleMouseUp = () => (isDown = false);
	const handleMouseLeave = () => (isDown = false);

	const handleMouseMove = ({ pageX, preventDefault }: MouseEvent): void => {
		if (!isDown) return;

		preventDefault();

		slider.scrollLeft =
			scrollLeft - (pageX - slider.getBoundingClientRect().left - startX);
	};

	slider.addEventListener('mousedown', handleMouseDown);
	slider.addEventListener('mouseup', handleMouseUp);
	slider.addEventListener('mouseleave', handleMouseLeave);
	slider.addEventListener('mousemove', handleMouseMove);
	slider.classList.add('scroll-drag');
};

export const useNuiEvent = <T = any>(
	action: string,
	handler: NuiHandlerSignature<T>,
) => {
	const savedHandler: MutableRefObject<NuiHandlerSignature<T>> = useRef(noop);

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const eventListener = (event: MessageEvent): void => {
			const { data } = event;

			if (savedHandler.current && data.action === action)
				savedHandler.current(data.data as T);
		};

		window.addEventListener('message', eventListener);

		return () => window.removeEventListener('message', eventListener);
	}, [action, handler]);
};
