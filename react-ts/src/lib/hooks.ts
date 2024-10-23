import { useEffect, useRef } from 'react';
import { noop } from '@/lib/constants';
import { debugData } from '@/lib';

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
  useEffect(() => {
    debugData(events, timer);
  }, [events, timer]);
}
