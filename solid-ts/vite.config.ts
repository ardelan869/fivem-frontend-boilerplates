import { defineConfig } from 'vite';
import devtools from 'solid-devtools/vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
	plugins: [
		devtools({
			autoname: true,
		}),
		solid(),
	],
	base: './',
	build: {
		outDir: './dist',
	},
});
