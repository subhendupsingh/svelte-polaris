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
                        label: 'ActionList',
                        slug: 'getting-started/action-list',
                    },
                    {
                        label: 'ActionMenu',
                        slug: 'getting-started/action-menu',
                    },
                    {
                        label: 'AutoComplete',
                        slug: 'getting-started/autocomplete',
                    },
                    {
                        label: 'Avatar',
                        slug: 'getting-started/avatar',
                    },
                    {
                        label: 'Badge',
                        slug: 'getting-started/badge',
                    },
                    {
                        label: 'BlockStack',
                        slug: 'getting-started/block-stack',
                    },
                    {
                        label: 'Bleed',
                        slug: 'getting-started/bleed',
                    },
                    {
                        label: 'Box',
                        slug: 'getting-started/box',
                    },
                    {
                        label: 'Button',
                        slug: 'getting-started/button',
                    },
                    {
                        label: 'ButtonGroup',
                        slug: 'getting-started/button-group',
                    },
                    {
                        label: 'CalloutCard',
                        slug: 'getting-started/callout-card',
                    },
                    {
                        label: 'Card',
                        slug: 'getting-started/card',
                    },
                    {
                        label: 'Checkbox',
                        slug: 'getting-started/checkbox',
                    },
                    {
                        label: 'ChoiceList',
                        slug: 'getting-started/choice-list',
                    },
                    {
                        label: 'Combobox',
                        slug: 'getting-started/combobox',
                    },
                    {
                        label: 'Datepicker',
                        slug: 'getting-started/datepicker',
                    },
                    {
                        label: 'DescriptionList',
                        slug: 'getting-started/description-list',
                    },
                    {
                        label: 'Divider',
                        slug: 'getting-started/divider',
                    },
                    {
                        label: 'EmptySearchResult',
                        slug: 'getting-started/empty-search-result',
                    },
                    {
                        label: 'EmptyState',
                        slug: 'getting-started/empty-state',
                    },
                    {
                        label: 'Filters',
                        slug: 'getting-started/filters',
                    },
                    {
                        label: 'Form',
                        slug: 'getting-started/form',
                    },
                    {
                        label: 'FormLayout',
                        slug: 'getting-started/form-layout',
                    },
                    {
                        label: 'Grid',
                        slug: 'getting-started/grid',
                    },
                    {
                        label: 'Icon',
                        slug: 'getting-started/icon',
                    },
                    {
                        label: 'Image',
                        slug: 'getting-started/image',
                    },
                    {
                        label: 'IndexTable',
                        slug: 'getting-started/index-table',
                    },
                    {
                        label: 'Indicator',
                        slug: 'getting-started/indicator',
                    },
                    {
                        label: 'InlineStack',
                        slug: 'getting-started/inline-stack',
                    },
                    {
                        label: 'Installation',
                        slug: 'getting-started/installation',
                    },
                    {
                        label: 'Layout',
                        slug: 'getting-started/layout',
                    },
                    {
                        label: 'Link',
                        slug: 'getting-started/link',
                    },
                    {
                        label: 'List',
                        slug: 'getting-started/list',
                    },
                    {
                        label: 'Page',
                        slug: 'getting-started/page',
                    },
                    {
                        label: 'Pagination',
                        slug: 'getting-started/pagination',
                    },
                    {
                        label: 'RadioButton',
                        slug: 'getting-started/radio-button',
                    },
                    {
                        label: 'Select',
                        slug: 'getting-started/select',
                    },
                    {
                        label: 'Set up',
                        slug: 'getting-started/set-up',
                    },
                    {
                        label: 'Spinner',
                        slug: 'getting-started/spinner',
                    },
                    {
                        label: 'Tabs',
                        slug: 'getting-started/tabs',
                    },
                    {
                        label: 'Tag',
                        slug: 'getting-started/tag',
                    },
                    {
                        label: 'Text',
                        slug: 'getting-started/text',
                    },
                    {
                        label: 'TextField',
                        slug: 'getting-started/text-field',
                    },
                    {
                        label: 'Thumbnail',
                        slug: 'getting-started/thumbnail',
                    },
                    {
                        label: 'Tooltip',
                        slug: 'getting-started/tooltip',
                    },
                ],
            },
        ],
    }), svelte()],
});