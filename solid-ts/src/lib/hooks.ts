import { onCleanup, createSignal, createEffect, onMount } from 'solid-js';
import { noop } from '@/lib/constants';
import { debugData } from '@/lib';

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

export function useNuiEvent<T = any>(
  action: string,
  handler: NuiHandlerSignature<T>
) {
  useEvent('message', (event) => {
    const { data } = event;

    if (data.action === action) handler(data.data as T);
  });
}

export function useDebugData<P>(events: DebugEvent<P>[], timer = 1000) {
  onMount(() => {
    debugData(events, timer);
  });
}
