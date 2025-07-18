<script lang="ts">
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import { classNames, variationName } from '$utilities/css.js';
	import Box from '../box/box.svelte';
	import { helpTextID } from '../choice/types.js';
	import styles from './select.module.css';
	import Text from '../text/text.svelte';
	import {
		PLACEHOLDER_VALUE,
		type HideableStrictOption,
		type SelectGroup,
		type SelectOption,
		type SelectProps,
		type StrictGroup,
		type StrictOption
	} from './types.js';
	import type { Snippet } from 'svelte';
	import Icon from '../icon/icon.svelte';
	import SelectIcon from '@shopify/polaris-icons/dist/svg/SelectIcon.svg?component';
	import Labelled from '../labelled/labelled.svelte';

	let {
		options: optionsProp,
		label,
		labelAction,
		labelHidden: labelHiddenProp,
		labelInline,
		disabled,
		helpText,
		placeholder,
		id: idProp,
		name,
		value = $bindable(PLACEHOLDER_VALUE),
		error,
		onChange,
		onFocus,
		onBlur,
		requiredIndicator,
		tone
	}: SelectProps = $props();

	const focused = new UseToggle(false);
	const toggleFocused = focused.toggle;

	const uniqId = $props.id();
	const id = idProp ?? uniqId;
	const labelHidden = labelInline ? true : labelHiddenProp;

	const className = classNames(
		styles.Select,
		error && styles.error,
		tone && styles[variationName('tone', tone)],
		disabled && styles.disabled
	);

	const handleFocus = (event: FocusEvent) => {
		toggleFocused();
		onFocus?.(event);
	};

	const handleBlur = (event: FocusEvent) => {
		toggleFocused();
		onBlur?.(event);
	};

	const handleChange = onChange
		? (event: Event) => onChange((event.target as HTMLSelectElement).value, id)
		: undefined;

	const describedBy: string[] = $derived.by(() => {
		const newDescribedBy: string[] = [];
		if (helpText) {
			newDescribedBy.push(helpTextID(id));
		}
		if (focused.value) {
			newDescribedBy.push(`${id}Error`);
		}
		return newDescribedBy;
	});

	function isString(option: SelectOption | SelectGroup): option is string {
		return typeof option === 'string';
	}

	function isGroup(option: SelectOption | SelectGroup): option is SelectGroup {
		return typeof option === 'object' && 'options' in option && option.options != null;
	}

	function normalizeStringOption(option: string): StrictOption {
		return {
			label: option,
			value: option
		};
	}

	function normalizeOption(option: SelectOption | SelectGroup): HideableStrictOption | StrictGroup {
		if (isString(option)) {
			return normalizeStringOption(option);
		} else if (isGroup(option)) {
			const { title, options } = option;
			return {
				title,
				options: options.map((option) => {
					return isString(option) ? normalizeStringOption(option) : option;
				})
			};
		}

		return option;
	}

	const options = $derived(optionsProp || []);
	const normalizedOptions = $derived.by(() => {
		let newNormalizedOptions = options.map(normalizeOption);
		if (placeholder) {
			newNormalizedOptions = [
				{
					label: placeholder,
					value: PLACEHOLDER_VALUE,
					disabled: true
				},
				...newNormalizedOptions
			];
		}
		return newNormalizedOptions;
	});

	/**
	 * Gets the text to display in the UI, for the currently selected option
	 */
	function getSelectedOption(
		options: (HideableStrictOption | StrictGroup)[],
		value: string
	): HideableStrictOption {
		const flatOptions = flattenOptions(options);
		let selectedOption = flatOptions.find((option) => value === option.value);

		if (selectedOption === undefined) {
			// Get the first visible option (not the hidden placeholder)
			selectedOption = flatOptions.find((option) => !option.hidden);
		}

		return selectedOption || { value: '', label: '' };
	}

	/**
	 * Ungroups an options array
	 */
	function flattenOptions(options: (HideableStrictOption | StrictGroup)[]): HideableStrictOption[] {
		let flatOptions: HideableStrictOption[] = [];

		options.forEach((optionOrGroup) => {
			if (isGroup(optionOrGroup)) {
				flatOptions = flatOptions.concat(optionOrGroup.options);
			} else {
				flatOptions.push(optionOrGroup);
			}
		});

		return flatOptions;
	}

	const selectedOption = $derived(getSelectedOption(normalizedOptions, value));
</script>

{#snippet inlineLabelMarkup()}
	{#if labelInline}
		<Box paddingInlineEnd="100">
			<Text
				as="span"
				variant="bodyMd"
				tone={tone && tone === 'magic' && !focused.value ? 'magic-subdued' : 'subdued'}
				truncate
			>
				{#if typeof label === 'string'}
					{label}
				{/if}
			</Text>
		</Box>
	{/if}
{/snippet}

{#snippet prefixMarkup()}
	<div class={styles.Prefix}>
		{@render selectedOption.prefix?.()}
	</div>
{/snippet}

{#snippet contentMarkup()}
	<div class={styles.Content} aria-hidden={true} aria-disabled={disabled}>
		{@render inlineLabelMarkup()}
		{@render prefixMarkup()}
		<span class={styles.SelectedOption}>{selectedOption.label}</span>
		<span class={styles.Icon}>
			<Icon source={SelectIcon} />
		</span>
	</div>
{/snippet}

{#snippet renderSingleOption(option: HideableStrictOption)}
	{@const { value, label, prefix: _prefix, key, ...rest } = option}
	<option {value} {...rest}>
		{label}
	</option>
{/snippet}

{#snippet renderOption(optionOrGroup: HideableStrictOption | StrictGroup)}
	{#if isGroup(optionOrGroup)}
		{@const { title, options } = optionOrGroup}
		<optgroup label={title}>
			{#each options as option}
				{@render renderSingleOption(option)}
			{/each}
		</optgroup>
	{:else}
		{@render renderSingleOption(optionOrGroup)}
	{/if}
{/snippet}

{#snippet optionsMarkup()}
	{#each normalizedOptions as option}
		{@render renderOption(option)}
	{/each}
{/snippet}

<Labelled
	{id}
	{label}
	{error}
	action={labelAction}
	{labelHidden}
	{helpText}
	{requiredIndicator}
	{disabled}
>
	<div class={className}>
		<select
			{id}
			{name}
			{value}
			class={styles.Input}
			{disabled}
			onfocus={handleFocus}
			onblur={handleBlur}
			onchange={handleChange}
			aria-invalid={Boolean(error)}
			aria-describedby={describedBy.length ? describedBy.join(' ') : undefined}
			aria-required={requiredIndicator}
		>
			{@render optionsMarkup()}
		</select>
		{@render contentMarkup()}
		<div class={styles.Backdrop}></div>
	</div>
</Labelled>
