import {
  onCleanup,
  createSignal,
  createEffect,
  onMount,
  type Accessor
} from 'solid-js';
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

/**
 * Triggers when something outside the ref has been triggered
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: Accessor<T | undefined>,
  handler: (event: MouseEvent) => void
) {
  createEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = ref();
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const { clientX, clientY } = event;

      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        handler(event);
      }
    };

    window.addEventListener('click', handleClick);

    onCleanup(() => {
      window.removeEventListener('click', handleClick);
    });
  });
}
