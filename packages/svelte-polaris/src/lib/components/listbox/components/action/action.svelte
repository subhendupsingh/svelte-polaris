<script lang="ts">
	import Icon from '$lib/components/icon/icon.svelte';
	import type { IconProps } from '$lib/components/icon/types.js';
	import type { OptionProps } from '../option/types.js';
	import styles from './action.module.css';
	import { classNames } from '$utilities/css.js';
	import ActionContextProvider from '$lib/components/app-provider/action-context-provider.svelte';
	import TextOption from '../text-option/text-option.svelte';
    import Option from '../option/option.svelte';

	interface ActionProps extends OptionProps {
		icon?: IconProps['source'];
	}

	let { selected, disabled, children, icon, divider, value, accessibilityLabel }: ActionProps =
		$props();
	let className = $derived(classNames(styles.Action, divider && styles.ActionDivider));
</script>

{#snippet iconMarkup()}
	{#if icon}
		<div class={styles.Icon}>
			<Icon tone="subdued" source={icon} />
		</div>
	{/if}
{/snippet}

<ActionContextProvider value>
	<Option accessibilityLabel={accessibilityLabel} value={value} selected={selected} disabled={disabled} divider={divider}>
		<div class={className}>
			<TextOption {selected} {disabled}>
				{@render iconMarkup()}
				{#if typeof children === 'string'}
					{children}
				{:else}
					{@render children?.()}
				{/if}
			</TextOption>
		</div>
	</Option>
</ActionContextProvider>
