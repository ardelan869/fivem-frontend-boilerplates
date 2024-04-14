import { onCleanup, createSignal, createEffect } from 'solid-js';
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

	onCleanup(() => {
		slider.removeEventListener('mousedown', handleMouseDown);
		slider.removeEventListener('mouseup', handleMouseUp);
		slider.removeEventListener('mouseleave', handleMouseLeave);
		slider.removeEventListener('mousemove', handleMouseMove);
		slider.classList.remove('scroll-drag');
	});
};

export const useNuiEvent = <T = any>(
	action: string,
	handler: NuiHandlerSignature<T>,
) => {
	const [savedHandler, setSavedHandler] =
		createSignal<NuiHandlerSignature<T>>(noop);

	createEffect(() => {
		setSavedHandler(() => handler);
	});

	createEffect(() => {
		const eventListener = (event: MessageEvent): void => {
			const { data } = event;

			if (savedHandler() && data.action === action)
				savedHandler()(data.data as T);
		};

		window.addEventListener('message', eventListener);
		onCleanup(() => window.removeEventListener('message', eventListener));
	});
};
