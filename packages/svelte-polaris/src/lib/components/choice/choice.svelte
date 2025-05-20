<script lang="ts">
	import {
		applyStyles,
		classNames,
		getResponsiveProps,
		getResponsiveValue,
		variationName
	} from '$utilities/css.js';
	import styles from './choice.module.css';
	import { helpTextID, type ChoiceProps } from './types.js';
	import Text from '../text/text.svelte';
	import InlineError from '../inline-error/inline-error.svelte';
	let {
		id,
		label,
		disabled,
		error,
		children,
		labelHidden,
		helpText,
		onClick,
		labelClassName,
		fill,
		bleed,
		bleedBlockStart,
		bleedBlockEnd,
		bleedInlineStart,
		bleedInlineEnd,
		tone
	}: ChoiceProps = $props();

	const className = $derived(
		classNames(
			styles.Choice,
			labelHidden && styles.labelHidden,
			disabled && styles.disabled,
			tone && styles[variationName('tone', tone)],
			labelClassName
		)
	);

	const labelStyle = $derived({
		// Pass through overrides for bleed values if they're set by the prop
		...getResponsiveProps('choice', 'bleed-block-end', 'space', bleedBlockEnd || bleed),
		...getResponsiveProps('choice', 'bleed-block-start', 'space', bleedBlockStart || bleed),
		...getResponsiveProps('choice', 'bleed-inline-start', 'space', bleedInlineStart || bleed),
		...getResponsiveProps('choice', 'bleed-inline-end', 'space', bleedInlineEnd || bleed),
		...Object.fromEntries(
			Object.entries(getResponsiveValue('choice', 'fill', fill)).map(
				// Map "true" => "100%" and "false" => "auto" for use in
				// inline/block-size calc()
				([key, value]) => [key, value ? '100%' : 'auto']
			)
		)
	});
</script>

{#snippet labelMarkup()}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<label class={className} for={id} onclick={onClick} style={applyStyles(labelStyle)}>
		<span class={styles.Control}>{@render children?.()}</span>
		<span class={styles.Label}>
			<Text as="span" variant="bodyMd">
				{label}
			</Text>
		</span>
	</label>
{/snippet}

{#snippet helpTextMarkup()}
	{#if helpText}
		<div class={styles.HelpText} id={helpTextID(id)}>
			<Text as="span" tone={disabled ? undefined : 'subdued'}>
				{helpText}
			</Text>
		</div>
	{/if}
{/snippet}

{#snippet errorMarkup()}
	{#if error && typeof error !== 'boolean'}
		<div class={styles.Error}>
			<InlineError message={error.message} fieldID={id} />
		</div>
	{/if}
{/snippet}

{#snippet descriptionMarkup()}
	<div class={styles.Descriptions}>
		{@render errorMarkup()}
		{@render helpTextMarkup()}
	</div>
{/snippet}

<div>
	{@render labelMarkup()}
	{@render descriptionMarkup()}
</div>
