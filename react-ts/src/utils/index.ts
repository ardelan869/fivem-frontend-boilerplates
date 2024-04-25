export * from './hooks';

export const isEnvBrowser = !('GetParentResourceName' in window);

export const vh = (i: number): `${string}vh` => `${0.09259259259259259 * i}vh`;
export const vmin = (i: number): `${string}vmin` =>
	`${0.09259259259259259 * i}vmin`;
export const vw = (i: number): `${string}vw` => `${0.05208 * i}vw`;
export const noop = () => {};

export const addZero = (i: number): string | number => (i < 10 ? `0${i}` : i);

export async function fetchNui<T = any>(
	event: string,
	data?: any,
	mockData?: T,
): Promise<void | T> {
	if (isEnvBrowser) {
		if (mockData) return mockData;
		return;
	}

	const resourceName: string = (window as any).GetParentResourceName
		? (window as any).GetParentResourceName()
		: 'nui-resource';

	const resp = await fetch(`https://${resourceName}/${event}`, {
		method: 'POST',
		body: JSON.stringify(data),
	});

	return await resp.json();
};

export const debugData = <P>(events: DebugEvent<P>[], timer = 1000): void => {
	if (import.meta.env.MODE === 'development' && isEnvBrowser) {
		for (const event of events) {
			setTimeout(() => {
				window.dispatchEvent(
					new MessageEvent('message', {
						data: {
							action: event.action,
							data: event.data,
						},
					}),
				);
			}, timer);
		}
	}
};