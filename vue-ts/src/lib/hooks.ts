import { onMounted } from 'vue';
import { debugData } from '@/lib';

export function useEvent<T extends EventKeys>(
  event: T,
  callback: EventCallback<T>
) {
  window.addEventListener(event, callback);
}

export function useNuiEvent<T = any>(
  action: string,
  handler: NuiHandlerSignature<T>
) {
  return useEvent('message', (event) => {
    const { data } = event;

    if (data.action === action) handler(data.data as T);
  });
}

export function useDebugData<P>(events: DebugEvent<P>[], timer = 1000) {
  onMounted(() => {
    debugData(events, timer);
  });
}
