import adapter from '@sveltejs/adapter-node';
import { sveltePreprocess } from 'svelte-preprocess';
import postcssPlugins from './build-configs/postcss-plugins.js';
import { generateScopedName } from './build-configs/namespaced-classname.js';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$utilities: 'src/lib/utilities',
		}
	},
};

export default config;
