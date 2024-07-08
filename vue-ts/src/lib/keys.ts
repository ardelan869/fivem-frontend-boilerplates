import { useEvent } from '@/lib/hooks';

export const useKeyEvent = (
  action: 'keydown' | 'keyup',
  key: string,
  handler: (data: KeyboardEvent) => void
) =>
  useEvent(action, (event) => {
    if (event.key === key) handler(event);
  });

export const useKeyUp = (key: string, handler: (data: KeyboardEvent) => void) =>
  useKeyEvent('keyup', key, handler);

export const useKeyDown = (
  key: string,
  handler: (data: KeyboardEvent) => void
) => useKeyEvent('keydown', key, handler);
