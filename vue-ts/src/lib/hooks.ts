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
	window.addEventListener('message', (event: MessageEvent) => {
		const { data } = event;

		if (data.action === action) handler(data.data as T);
	});
};
