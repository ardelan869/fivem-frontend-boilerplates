import { onCleanup, createSignal, createEffect } from 'solid-js';
import { noop } from '@/lib/constants';

export const useEvent = <T extends EventKeys>(
  event: T,
  callback: EventCallback<T>
) => {
  const [savedHandler, setSavedHandler] = createSignal<EventCallback<T>>(noop);

  createEffect(() => {
    setSavedHandler(() => callback);
  });

  createEffect(() => {
    const eventListener = savedHandler();

    window.addEventListener(event, eventListener);
    onCleanup(() => window.removeEventListener(event, eventListener));
  });
};

export const useNuiEvent = <T = any>(
  action: string,
  handler: NuiHandlerSignature<T>
) =>
  useEvent('message', (event) => {
    const { data } = event;

    if (data.action === action) handler(data.data as T);
  });
