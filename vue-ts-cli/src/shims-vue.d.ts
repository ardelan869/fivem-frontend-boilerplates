/* eslint-disable */
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

interface NuiMessageData<T = unknown> {
	action: string;
	data: T;
}

type NuiHandlerSignature<T> = (data: T) => void;

interface DebugEvent<T = unknown> {
	action: string;
	data: T;
}
