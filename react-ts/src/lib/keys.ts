import { useEvent } from '@/lib/hooks';

export const useKeyEvent = (
  action: 'keydown' | 'keyup',
  key: string,
  handler: (data: KeyboardEvent) => void
) =>
  useEvent(action, (e) => {
    if (e.key === key) handler(e);
  });

export const useKeyUp = (key: string, handler: (data: KeyboardEvent) => void) =>
  useKeyEvent('keyup', key, handler);

export const useKeyDown = (
  key: string,
  handler: (data: KeyboardEvent) => void
) => useKeyEvent('keydown', key, handler);
