<script lang="ts">
	import type { TextOptionProps } from './types.js';
	import styles from './text-option.module.css';
	import { classNames } from '$utilities/css.js';
	import { useContext } from '$utilities/contexts.js';
	import { ACTION_CONTEXT_KEY } from '$utilities/listbox/types.js';
	import Box from '$lib/components/box/box.svelte';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import Icon from '$lib/components/icon/icon.svelte';
	import CheckIcon from '@shopify/polaris-icons/dist/svg/CheckIcon.svg?component';
	import Checkbox from '$lib/components/checkbox/checkbox.svelte';
	import {
		COMBOBOX_LIST_BOX_OPTION_CONTEXT_KEY,
		type ComboboxListboxOptionType
	} from '$utilities/combobox/types.js';
	import Text from '$lib/components/text/text.svelte';

	let { children, selected, disabled }: TextOptionProps = $props();

	//const { allowMultiple } = useContext<ComboboxListboxOptionType>(COMBOBOX_LIST_BOX_OPTION_CONTEXT_KEY) || {};
	const comboboxListboxOptionContext =
		useContext<ComboboxListboxOptionType>(COMBOBOX_LIST_BOX_OPTION_CONTEXT_KEY) || {};
	const actionContext = useContext<boolean>(ACTION_CONTEXT_KEY) || false;

	const textOptionClassName = $derived(
		classNames(
			styles.TextOption,
			selected && !comboboxListboxOptionContext()?.allowMultiple && styles.selected,
			disabled && styles.disabled,
			comboboxListboxOptionContext()?.allowMultiple && styles.allowMultiple,
			actionContext() && styles.isAction
		)
	);
</script>

{#snippet renderChildren()}
	{#if typeof children === 'string'}
		{children}
	{:else}
		{@render children()}
	{/if}
{/snippet}

{#snippet optionMarkup()}
	{#if selected}
		<Box width="100%">
			<InlineStack wrap={false} align="space-between" gap="200">
				{@render renderChildren()}
				<InlineStack align="end">
					<Icon source={CheckIcon} />
				</InlineStack>
			</InlineStack>
		</Box>
	{:else}
		{@render renderChildren()}
	{/if}
{/snippet}

<div class={textOptionClassName}>
	<div class={styles.Content}>
		{#if comboboxListboxOptionContext()?.allowMultiple && !actionContext()}
			<div class={styles.Checkbox}>
				<Checkbox {disabled} checked={selected} label={children} />
			</div>
		{:else}
			{@render optionMarkup()}
		{/if}
	</div>
</div>
