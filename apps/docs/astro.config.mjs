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
                    {
                        label: 'Box',
                        slug: 'getting-started/box',
                    },
                    {
                        label: 'BlockStack',
                        slug: 'getting-started/block-stack',
                    },
                    {
                        label: 'InlineStack',
                        slug: 'getting-started/inline-stack',
                    },
                    {
                        label: 'Layout',
                        slug: 'getting-started/layout',
                    },
                    {
                        label: 'Tabs',
                        slug: 'getting-started/tabs',
                    },
                    {
                        label: 'Bleed',
                        slug: 'getting-started/bleed',
                    },
                    {
                        label: 'ChoiceList',
                        slug: 'getting-started/choice-list',
                    },
                    {
                        label: 'Link',
                        slug: 'getting-started/link',
                    },
                    {
                        label: 'Page',
                        slug: 'getting-started/page',
                    },
                    {
                        label: 'RadioButton',
                        slug: 'getting-started/radio-button',
                    },
                    {
                        label: 'List',
                        slug: 'getting-started/list',
                    },
                    {
                        label: 'Tag',
                        slug: 'getting-started/tag',
                    },
                    {
                        label: 'Thumbnail',
                        slug: 'getting-started/thumbnail',
                    },
                    {
                        label: 'Tooltip',
                        slug: 'getting-started/tooltip',
                    },
                    {
                        label: 'Pagination',
                        slug: 'getting-started/pagination',
                    },
                    {
                        label: 'EmptyState',
                        slug: 'getting-started/empty-state',
                    },
                    {
                        label: 'CalloutCard',
                        slug: 'getting-started/callout-card',
                    }
                ],
            }
        ],
    }), svelte()],
});