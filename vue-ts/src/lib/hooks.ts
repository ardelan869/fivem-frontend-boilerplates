import { onMounted } from 'vue';
import { debugData } from '@/lib';

/**
 * Listens to the specified window events.
 */
export function useEvent<T extends EventKeys>(
  event: T,
  callback: EventCallback<T>
) {
  window.addEventListener(event, callback);
}

/**
 * Listens to a Nui event.
 */
export function useNuiEvent<T = any>(
  action: string,
  handler: NuiHandlerSignature<T>
) {
  return useEvent('message', (event) => {
    const { data } = event;

    if (data.action === action) handler(data.data as T);
  });
}

/**
 * Does the same as `debugData`, wrapped in an `useEffect`.
 */
export function useDebugData<P>(events: DebugEvent<P>[], timer = 1000) {
  onMounted(() => {
    debugData(events, timer);
  });
}
