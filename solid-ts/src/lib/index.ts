import { isEnvBrowser } from './constants';

declare global {
  interface Window {
    GetParentResourceName?: () => string;
  }
}

/**
 * Fetches and or emits data to the Nui resource.
 */
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

/**
 * Triggers `useNuiEvent` listeners, if the current environment is a browser.
 */
export function debugData<P>(events: DebugEvent<P>[], timer = 1000) {
  if (!import.meta.env.DEV || !isEnvBrowser) return;

  for (const { action, data } of events)
    setTimeout(() => window.postMessage({ action, data }), timer);
}
