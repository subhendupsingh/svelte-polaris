<script lang="ts">
	import Checkbox from '$lib/components/checkbox/checkbox.svelte';
	import Icon from '$lib/components/icon/icon.svelte';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import { classNames, variationName } from '$utilities/css.js';
	import CheckIcon from '@shopify/polaris-icons/dist/svg/CheckIcon.svg?component';
	import styles from './option.module.css';
	import type { Alignment, OptionProps } from './types.js';
	import type { InlineStackProps } from '$lib/components/inline-stack/types.js';
	import Scrollable from '$lib/components/scrollable/index.js';

	let {
		label,
		value,
		id,
		select,
		active,
		allowMultiple,
		disabled,
		media,
		onClick,
		section,
		index,
		verticalAlign,
		onPointerEnter,
		onFocus
	}: OptionProps = $props();

	const focused = new UseToggle(false);
	const toggleFocused = focused.toggle;

	const handleClick = () => {
		if (disabled) {
			return;
		}

		onClick(section, index);
	};

	const handlePointerEnter = () => {
		if (disabled) {
			return;
		}

		onPointerEnter(section, index);
	};

	const handleFocus = () => {
		toggleFocused();

		onFocus(section, index);
	};

	const singleSelectClassName = $derived(
		classNames(
			styles.SingleSelectOption,
			focused && styles.focused,
			disabled && styles.disabled,
			select && styles.select,
			active && styles.active,
			verticalAlign && styles[variationName('verticalAlign', verticalAlign)]
		)
	);

	const multiSelectClassName = $derived(
		classNames(
			styles.Label,
			disabled && styles.disabled,
			active && styles.active,
			select && styles.select,
			verticalAlign && styles[variationName('verticalAlign', verticalAlign)],
			allowMultiple && styles.CheckboxLabel,
			allowMultiple && styles.MultiSelectOption
		)
	);

	function verticalAlignToBlockAlign(verticalAlign?: Alignment): InlineStackProps['blockAlign'] {
		switch (verticalAlign) {
			case 'top':
				return 'start';
			case 'center':
				return 'center';
			case 'bottom':
				return 'end';
			default:
				return 'start';
		}
	}
</script>

{#snippet mediaMarkup()}
	{#if media}
		<div class={styles.Media}>
			<media></media>
		</div>
	{/if}
{/snippet}

{#snippet optionMarkup()}
	{#if allowMultiple}
		<label for={id} class={multiSelectClassName}>
			<div class={styles.Checkbox}>
				<Checkbox
					{id}
					label=""
					ariaDescribedBy={`${id}-label`}
					{value}
					checked={select}
					{disabled}
					onChange={handleClick}
				/>
			</div>
			{@render mediaMarkup()}
			<span id={`${id}-label`}>{label}</span>
		</label>
	{:else}
		<button
			{id}
			type="button"
			class={singleSelectClassName}
			onclick={handleClick}
			{disabled}
			onfocus={handleFocus}
			onblur={toggleFocused}
			aria-pressed={active || select}
		>
			<InlineStack wrap={false} blockAlign={verticalAlignToBlockAlign(verticalAlign)}>
				{@render mediaMarkup()}
				{label}
			</InlineStack>
			{#if select || active}
				<span class={styles.Icon}>
					<Icon source={CheckIcon} />
				</span>
			{/if}
		</button>
	{/if}
{/snippet}

{#snippet scrollMarkup()}
	{#if active}
		<Scrollable.ScrollTo />
	{/if}
{/snippet}

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<li class={styles.Option} tabindex={-1} onpointerenter={handlePointerEnter}>
	{@render scrollMarkup()}
	{@render optionMarkup()}
</li>
