<script lang="ts">
	import { noop } from '$utilities/noop.js';
	import type { Component } from 'svelte';
	import styles from './choice-list.module.css';
	import type { Choice, ChoiceListProps } from './types.js';
	import Checkbox from '../checkbox/checkbox.svelte';
	import RadioButton from '../radio-button/radio-button.svelte';
	import Box from '../box/box.svelte';
	import Text from '../text/text.svelte';
	import Bleed from '../bleed/bleed.svelte';
	import { errorTextID } from '../inline-error/types.js';
	import InlineError from '../inline-error/inline-error.svelte';
	import BlockStack from '../block-stack/block-stack.svelte';
	let {
		title,
		titleHidden,
		allowMultiple,
		choices,
		selected,
		onChange = noop,
		error,
		disabled = false,
		name: nameProp,
		tone
	}: ChoiceListProps = $props();

	const ControlComponent: any = allowMultiple ? Checkbox : RadioButton;
	const uniqName = $props.id();
	const name = nameProp ?? uniqName;
	const finalName = allowMultiple ? `${name}[]` : name;

	function updateSelectedChoices(
		{ value }: Choice,
		checked: boolean,
		selected: string[],
		allowMultiple = false
	) {
		if (checked) {
			return allowMultiple ? [...selected, value] : [value];
		}

		const s = selected.filter((selectedChoice) => selectedChoice !== value);
		return s;
	}

	function handleChange(checked: boolean, choice: Choice) {
		onChange(updateSelectedChoices(choice, checked, selected, allowMultiple), name);
	}

	function choiceIsSelected({ value }: Choice, selected: string[]) {
		return selected.includes(value);
	}
</script>

{#snippet titleMarkup()}
	{#if title}
		<Box as="legend" paddingBlockEnd={{ xs: '0', md: '100' }}>
			<Text as="span" variant="bodyMd" visuallyHidden={titleHidden}>
				{title}
			</Text>
		</Box>
	{/if}
{/snippet}

{#snippet choicesMarkup()}
	{#each choices as choice}
		{@const { value, id, label, helpText, disabled: choiceDisabled, describedByError } = choice}
		{@const isSelected = choiceIsSelected(choice, selected)}
		{@const renderedChildren = choice.renderChildren ? choice.renderChildren(isSelected) : null}

		{#snippet children()}
			{#if renderedChildren}
				<div class={styles.ChoiceChildren}>
					<Box paddingBlockStart={{ xs: '400', md: '0' }}>{renderedChildren}</Box>
				</div>
			{/if}
		{/snippet}

		<li>
			<Bleed marginBlockEnd={helpText ? { xs: '100', md: '0' } : { xs: '0' }}>
				<ControlComponent
					name={finalName}
					{value}
					{id}
					{label}
					disabled={choiceDisabled || disabled}
					fill={{ xs: true, sm: false }}
					checked={choiceIsSelected(choice, selected)}
					{helpText}
					onChange={handleChange}
					ariaDescribedBy={error && describedByError ? errorTextID(finalName) : null}
					{tone}
				/>
				{@render children()}
			</Bleed>
		</li>
	{/each}
{/snippet}

{#snippet errorMarkup()}
	{#if error}
		<Box paddingBlockStart={{ xs: '0', md: '100' }} paddingBlockEnd="200">
			<InlineError message={error.message} fieldID={finalName} />
		</Box>
	{/if}
{/snippet}

<BlockStack as="fieldset" gap={{ xs: '400', md: '0' }} id={finalName}>
	{@render titleMarkup()}
	<BlockStack as="ul" gap={{ xs: '400', md: '0' }}>
		{@render choicesMarkup()}
	</BlockStack>
	{@render errorMarkup()}
</BlockStack>
