import { useEvent } from '@/lib/hooks';

const ALL = ['all', '*', ''];

/**
 * Adds either a keydown or keyup event listener to the window.
 */
export function useKeyEvent(
  action: 'keydown' | 'keyup',
  key: string | string[],
  handler: (data: KeyboardEvent) => void,
  options: {
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    metaKey?: boolean;
  } = {}
) {
  key =
    typeof key === 'string'
      ? key.toUpperCase()
      : key.map((k) => k.toUpperCase());

  useEvent(action, (e) => {
    const hasModifierOptions = Object.values(options).some(
      (value) => value !== undefined
    );

    const modifiersMatch = hasModifierOptions
      ? Object.entries(options).some(([modifier, required]) =>
          required ? e[modifier as keyof typeof e] : true
        )
      : true;

    if (!modifiersMatch) return;

    const eventKey = e.key.toUpperCase();

    if (
      eventKey === key ||
      ALL.includes(typeof key === 'string' ? key : key[0]) ||
      (Array.isArray(key) && key.includes(eventKey))
    ) {
      handler(e);
    }
  });
}

/**
 * Adds a keyup event listener to the window.
 */
export const useKeyUp = (
  key: Parameters<typeof useKeyEvent>[1],
  handler: Parameters<typeof useKeyEvent>[2],
  options?: Parameters<typeof useKeyEvent>[3]
) => useKeyEvent('keyup', key, handler, options);

/**
 * Adds a keydown event listener to the window.
 */
export const useKeyDown = (
  key: Parameters<typeof useKeyEvent>[1],
  handler: Parameters<typeof useKeyEvent>[2],
  options?: Parameters<typeof useKeyEvent>[3]
) => useKeyEvent('keydown', key, handler, options);
