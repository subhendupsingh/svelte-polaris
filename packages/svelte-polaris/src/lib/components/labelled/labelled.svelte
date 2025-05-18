<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import ButtonFrom from '../button/button-from.svelte';
	import styles from './labelled.module.css';
	import type { LabelledProps } from './types.js';
	import Text from '../text/text.svelte';
	import Label from '../label/label.svelte';

	let {
		id,
		label,
		error,
		action,
		helpText,
		children,
		labelHidden,
		requiredIndicator,
		disabled,
		readOnly,
		...rest
	}: LabelledProps = $props();

	const className = $derived(
		classNames(
			labelHidden && styles.hidden,
			disabled && styles.disabled,
			readOnly && styles.readOnly
		)
	);

	const helpTextID = (id: string) => `${id}-help-text`;
</script>

{#snippet actionMarkup()}
	{#if action}
		<div class={styles.Action}>
			<ButtonFrom {action} overrides={{ variant: 'plain' }} />
		</div>
	{/if}
{/snippet}

{#snippet helpTextMarkup()}
	{#if typeof helpText === 'string'}
		<div class={styles.HelpText} id={helpTextID(id)} aria-disabled={disabled}>
			<Text as="span" tone="subdued" variant="bodyMd" breakWord>
				{helpText}
			</Text>
		</div>
	{:else}
		{@render helpText?.()}
	{/if}
{/snippet}

{#snippet errorMarkup()}
	{#if error && typeof error !== 'boolean'}
		<div class={styles.Error}>
			<!-- <InlineError message={error} fieldID={id} /> -->
		</div>
	{/if}
{/snippet}

{#snippet labelMarkup()}
	{#if label}
		<div class={styles.LabelWrapper}>
			<Label {id} {requiredIndicator} {...rest} hidden={false}>
				{label}
			</Label>

			{@render actionMarkup()}
		</div>
	{/if}
{/snippet}

<div class={className}>
	{@render labelMarkup()}
	{@render children?.()}
	{@render errorMarkup()}
	{@render helpTextMarkup()}
</div>
