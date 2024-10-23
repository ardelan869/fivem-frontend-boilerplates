import { createEffect } from 'solid-js';
import { isEnvBrowser } from './constants';

declare global {
  interface Window {
    GetParentResourceName?: () => string;
  }
}

export const addZero = (i: number): string | number => (i < 10 ? `0${i}` : i);

export async function fetchNui<T = any>(
  event: string,
  data?: any,
  mockData?: T
): Promise<void | T> {
  if (isEnvBrowser) {
    if (mockData) return mockData;
    return;
  }

  const resourceName: string = window.GetParentResourceName
    ? window.GetParentResourceName()
    : 'nui-resource';

  const resp = await fetch(`https://${resourceName}/${event}`, {
    method: 'POST',
    body: JSON.stringify(data)
  });

  return await resp.json();
}

export const parseMinutes = (time: number): string => {
  const timer = time;
  let minutes, seconds;

  minutes = parseInt((timer / 60).toString(), 10);
  seconds = parseInt((timer % 60).toString(), 10);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return minutes + ':' + seconds;
};

export const debugData = <P>(events: DebugEvent<P>[], timer = 1000) => {
  if (import.meta.env.MODE !== 'development' || !isEnvBrowser) return;

  createEffect(() => {
    for (const { action, data } of events)
      setTimeout(() => window.postMessage({ action, data }), timer);
  });
};
