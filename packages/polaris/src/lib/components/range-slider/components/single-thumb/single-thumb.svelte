<script lang="ts">
	import { helpTextID } from '$lib/components/choice/types.js';
	import { clamp } from '$utilities/clamp.js';
	import { invertNumber } from '$utilities/invert-number.js';
	import styles from './single-thumb.module.css';
	import sharedStyles from '../../range-slider.module.css';
	import type { SingleThumbProps } from './types.js';
	import Text from '$lib/components/text/text.svelte';
	import RenderSvelteNode from '$lib/components/render-svelte-node.svelte';
	import { applyStyles, classNames } from '$utilities/css.js';
	import Labelled from '$lib/components/labelled/labelled.svelte';

	let {
		id,
		error,
		helpText,
		value = $bindable(),
		min,
		max,
		disabled,
		output,
		prefix,
		suffix,
		label,
		labelAction,
		labelHidden,
		step,
		onBlur,
		onFocus,
		onChange,
		...rest
	}: SingleThumbProps = $props();

	let clampedValue = $derived(clamp(value, min, max));
	
	const describedBy: string[] = $derived.by(() => {
		const newDescribedBy: string[] = [];

		if (error) {
			newDescribedBy.push(`${id}Error`);
		}

		if (helpText) {
			newDescribedBy.push(helpTextID(id));
		}

		return newDescribedBy;
	});

	const ariaDescribedBy = $derived(describedBy.length ? describedBy.join(' ') : undefined);

	const sliderProgress = $derived(((clampedValue - min) * 100) / (max - min));
	const outputFactor = $derived(invertNumber((sliderProgress - 50) / 100));

	const cssVars = $derived({
		'--pc-range-slider-min': min,
		'--pc-range-slider-max': max,
		'--pc-range-slider-current': clampedValue,
		'--pc-range-slider-progress': `${sliderProgress}%`,
		'--pc-range-slider-output-factor': `${outputFactor}`
	});

	const className = $derived(
		classNames(
			styles.SingleThumb,
			sharedStyles.RangeSlider,
			error && styles.error,
			disabled && styles.disabled
		)
	);

	function handleChange(event: Event) {
		onChange && onChange(parseFloat((event.currentTarget as HTMLInputElement)?.value), id);
	}
</script>

{#snippet outputMarkup()}
	{#if !disabled && output}
		<output for={id} class={styles.Output}>
			<div class={styles.OutputBubble}>
				<Text as="span" variant="headingSm" alignment="center">
					{clampedValue}
				</Text>
			</div>
		</output>
	{/if}
{/snippet}

{#snippet prefixMarkup()}
	{#if prefix}
		<div class={styles.Prefix}>
			<RenderSvelteNode node={prefix} />
		</div>
	{/if}
{/snippet}

{#snippet suffixMarkup()}
	{#if suffix}
		<div class={styles.Suffix}>
			<RenderSvelteNode node={suffix} />
		</div>
	{/if}
{/snippet}

<Labelled {id} {label} {error} action={labelAction} {labelHidden} {helpText}>
	<div class={className} style={applyStyles(cssVars)}>
		{@render prefixMarkup()}
		<div class={classNames(styles.InputWrapper, sharedStyles['Track--dashed-after'])}>
			<input
				type="range"
				class={styles.Input}
				{id}
				name={id}
				{min}
				{max}
				{step}
				bind:value={clampedValue}
				{disabled}
				onchange={handleChange}
				onfocus={onFocus}
				onblur={onBlur}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={clampedValue}
				aria-invalid={Boolean(error)}
				aria-describedby={ariaDescribedBy}
			/>
			{@render outputMarkup()}
		</div>
		{@render suffixMarkup()}
	</div>
</Labelled>
