<script lang="ts">
	import { createThemeClassName, themeNameDefault } from '@shopify/polaris-tokens';
	import styles from './theme-provider.module.css';
	import type { ThemeProviderProps } from './types.js';
	import { classNames } from '$utilities/css.js';
	import ThemeNameContextProvider from '../app-provider/theme-name-context-provider.svelte';
	import ThemeContextProvider from '../app-provider/theme-context-provider.svelte';
	import { getTheme } from './types.js';
	let {
		as: ThemeContainer = 'div',
		children,
		className,
		theme: themeName = themeNameDefault,
		...restProps
	}: ThemeProviderProps = $props();
</script>

<ThemeNameContextProvider value={themeName}>
	<ThemeContextProvider value={getTheme(themeName)}>
		<svelte:element
			this={ThemeContainer}
			data-portal-id={restProps['data-portal-id']}
			class={classNames(createThemeClassName(themeName), styles.themeContainer, className)}
		>
			{@render children?.()}
		</svelte:element>
	</ThemeContextProvider>
</ThemeNameContextProvider>
