import { isEnvBrowser } from '@/lib/constants';

declare global {
  interface Window {
    GetParentResourceName?: () => string;
  }
}

export async function fetchNui<T = any>(
  event: string,
  data?: any,
  mockData?: T
): Promise<void | T> {
  if (isEnvBrowser) {
    return mockData;
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

export function debugData<P>(events: DebugEvent<P>[], timer = 1000) {
  if (!import.meta.env.DEV || !isEnvBrowser) return;

  for (const { action, data } of events)
    setTimeout(() => window.postMessage({ action, data }), timer);
}
