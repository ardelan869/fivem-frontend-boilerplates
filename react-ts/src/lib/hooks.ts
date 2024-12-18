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
    window.addEventListener(event, callback);

    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
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
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [ref, handler]);
}
