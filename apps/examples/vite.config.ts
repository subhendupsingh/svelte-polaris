import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svg from '@poppanator/sveltekit-svg'

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
});
