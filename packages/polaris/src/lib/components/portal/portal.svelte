<script lang="ts">
	import { useContext, type PortalsManager } from '$utilities/contexts.js';
	import { noop } from '$utilities/noop.js';
	import { onMount } from 'svelte';
	import type { PortalProps } from './types.js';
	import ThemeProvider from '../theme-provider/theme-provider.svelte';
	import { isThemeNameLocal } from '../theme-provider/types.js';
	import { THEME_NAME_CONTEXT_KEY } from '$utilities/use-theme.js';
	import { themeNameDefault, type ThemeName } from '@shopify/polaris-tokens';
	import { browser } from '$app/environment';
	import { PORTALS_MANAGER_CONTEXT_KEY } from '$utilities/portals/types.js';

	let { children, idPrefix = '', onPortalCreated = noop }: PortalProps = $props();

	const themeNameContext = useContext<ThemeName>(THEME_NAME_CONTEXT_KEY);
	let context = useContext<PortalsManager | undefined>(PORTALS_MANAGER_CONTEXT_KEY);
	let container = $derived(context()?.container);
	const uniqueId = $props.id();
	const portalId = $derived(idPrefix !== '' ? `${idPrefix}-${uniqueId}` : uniqueId);
	const themeName = $derived(themeNameContext());

	onMount(() => {
		onPortalCreated();
	});

	function portal(node: HTMLElement, target = document.body) {
		let targetElement;

		function update(newTarget: string | HTMLElement) {
			if (typeof newTarget === 'string') {
				targetElement = document.querySelector(newTarget);
			} else {
				targetElement = newTarget;
			}

			if (targetElement && targetElement !== node.parentNode) {
				targetElement.appendChild(node);
			}
		}

		update(target);

		return {
			update,
			destroy() {
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
			}
		};
	}
</script>

{#if browser}
	<div use:portal={container ?? undefined}>
		<ThemeProvider
			theme={themeName
				? isThemeNameLocal(themeName)
					? themeName
					: themeNameDefault
				: themeNameDefault}
			data-portal-id={portalId}
		>
			{@render children?.()}
		</ThemeProvider>
	</div>
{/if}
