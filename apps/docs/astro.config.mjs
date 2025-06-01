// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    integrations: [starlight({
        title: 'My Docs',
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
        sidebar: [
            {
                label: 'Getting Started',
                items: [
                    {
                        label: 'Installation',
                        slug: 'getting-started/installation',
                    },
                    {
                        label: 'Set up',
                        slug: 'getting-started/set-up',
                    },
                    {
                        label: 'Button',
                        slug: 'getting-started/button',
                    },
                    {
                        label: 'Card',
                        slug: 'getting-started/card',
                    },
                    {
                        label: 'TextField',
                        slug: 'getting-started/text-field',
                    },
                    {
                        label: 'Select',
                        slug: 'getting-started/select',
                    },
                    {
                        label: 'ButtonGroup',
                        slug: 'getting-started/button-group',
                    },
                    {
                        label: 'FormLayout',
                        slug: 'getting-started/form-layout',
                    },
                    {
                        label: 'Checkbox',
                        slug: 'getting-started/checkbox',
                    },
                    {
                        label: 'Badge',
                        slug: 'getting-started/badge',
                    },
                    {
                        label: 'Avatar',
                        slug: 'getting-started/avatar',
                    },
                    {
                        label: 'Text',
                        slug: 'getting-started/text',
                    },
                    {
                        label: 'Icon',
                        slug: 'getting-started/icon',
                    },
                    {
                        label: 'Spinner',
                        slug: 'getting-started/spinner',
                    },
                    {
                        label: 'Divider',
                        slug: 'getting-started/divider',
                    },
                ],
            }
        ],
    }), svelte()],
});