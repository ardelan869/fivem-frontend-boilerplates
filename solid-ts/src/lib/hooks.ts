import { onCleanup, createSignal, createEffect, onMount } from 'solid-js';
import { noop } from '@/lib/constants';
import { debugData } from '@/lib';

/**
 * Listens to the specified window events.
 */
export function useEvent<T extends EventKeys>(
  event: T,
  callback: EventCallback<T>
) {
  const [savedHandler, setSavedHandler] = createSignal<EventCallback<T>>(noop);

  createEffect(() => {
    setSavedHandler(() => callback);
  });

  createEffect(() => {
    const eventListener = savedHandler();

    window.addEventListener(event, eventListener);
    onCleanup(() => window.removeEventListener(event, eventListener));
  });
}

/**
 * Listens to a Nui event.
 */
export function useNuiEvent<T = any>(
  action: string,
  handler: NuiHandlerSignature<T>
) {
  useEvent('message', (event) => {
    const { data } = event;

    if (data.action === action) handler(data.data as T);
  });
}

/**
 * Does the same as `debugData`, wrapped in an `useEffect`.
 */
export function useDebugData<P>(events: DebugEvent<P>[], timer = 1000) {
  onMount(() => {
    debugData(events, timer);
  });
}
