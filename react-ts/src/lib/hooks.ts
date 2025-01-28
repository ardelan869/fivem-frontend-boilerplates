import { useEffect, useRef } from 'react';
import { noop } from '@/lib/constants';
import { debugData } from '@/lib';

/**
 * Listens to the specified window events.
 */
export function useEvent<T extends EventKeys>(
  event: T,
  callback: EventCallback<T>
) {
  const savedHandler = useRef<EventCallback<T>>(noop);

  useEffect(() => {
    savedHandler.current = callback;
  }, [callback]);

  useEffect(() => {
    const listener = (event: Parameters<EventCallback<T>>[0]) => {
      savedHandler.current(event);
    };

    window.addEventListener(event, listener);

    return () => window.removeEventListener(event, listener);
  }, [event]);
}


/**
 * Listens to a Nui event.
 */
export function useNuiEvent<T = any>(
  action: string,
  handler: NuiHandlerSignature<T>
) {
  const savedHandler = useRef<NuiHandlerSignature<T>>(noop);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEvent('message', (event) => {
    const { data } = event;

    if (data.action === action) savedHandler?.current?.(data.data as T);
  });
}

/**
 * Does the same as `debugData`, wrapped in an `useEffect`.
 */
export function useDebugData<P>(events: DebugEvent<P>[], timer = 1000) {
  useEffect(() => {
    debugData(events, timer);
  }, []);
}

/**
 * Triggers when something outside the ref has been triggered
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent) => void
) {
  const savedHandler = useRef<(event: MouseEvent) => void>(noop);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const { clientX, clientY } = event;

      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        savedHandler?.current?.(event);
      }
    };

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [ref]);
}
