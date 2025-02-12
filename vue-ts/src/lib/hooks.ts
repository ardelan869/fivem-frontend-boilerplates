import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import { debugData } from '@/lib';

/**
 * Listens to the specified window events.
 */
export function useEvent<T extends EventKeys>(
  event: T,
  callback: EventCallback<T>
) {
  window.addEventListener(event, callback);
}

/**
 * Listens to a Nui event.
 */
export function useNuiEvent<T = any>(
  action: string,
  handler: NuiHandlerSignature<T>
) {
  return useEvent('message', (event) => {
    const { data } = event;

    if (data.action === action) handler(data.data as T);
  });
}

/**
 * Does the same as `debugData`, wrapped in an `useEffect`.
 */
export function useDebugData<P>(events: DebugEvent<P>[], timer = 1000) {
  onMounted(() => {
    debugData(events, timer);
  });
}

/**
 * Triggers when something outside the ref has been triggered
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: Ref<T | null>,
  handler: (event: MouseEvent) => void
) {
  const handleClick = (event: MouseEvent) => {
    if (ref.value) {
      const rect = ref.value.getBoundingClientRect();
      const { clientX, clientY } = event;

      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        handler(event);
      }
    }
  };

  onMounted(() => {
    window.addEventListener('mousedown', handleClick);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('mousedown', handleClick);
  });
}

/**
 * Returns a debounced version of the given value.
 */
export function useDebounce<T>(value: T, delay = 500): Ref<T> {
  const debouncedValue = ref(value) as Ref<T>; // 💡 Casten auf Ref<T>

  let timer: ReturnType<typeof setTimeout> | null = null;

  watch(
    () => value,
    (newValue) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        debouncedValue.value = newValue;
      }, delay);
    },
    { immediate: true }
  );

  onBeforeUnmount(() => {
    if (timer) clearTimeout(timer);
  });

  return debouncedValue;
}
