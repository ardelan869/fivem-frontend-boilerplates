export const useEvent = <T extends EventKeys>(event: T, callback: EventCallback<T>) => 
  window.addEventListener(event, callback);

export const useNuiEvent = <T = any>(
	action: string,
	handler: NuiHandlerSignature<T>,
) => useEvent('message', (event) => {
  const { data } = event;

  if (data.action === action) handler(data.data as T);
})
