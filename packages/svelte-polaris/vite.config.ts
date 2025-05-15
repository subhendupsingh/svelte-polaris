import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svg from '@poppanator/sveltekit-svg'
import { generateScopedName } from './build-configs/namespaced-classname.js';
import postcssPlugins from './build-configs/postcss-plugins.js';

const dev = process.env.DEV === 'true';

export default defineConfig({
	plugins: [
		sveltekit(),
		svg({
			type: "component",
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: 'preset-default',
						params: { overrides: { removeViewBox: false } },
					},
					{ name: 'removeAttrs', params: { attrs: '(fill|stroke)' } },
				],
			},
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true,
			},
		},
		postcss: {
			plugins: postcssPlugins,
		}
	},
});
