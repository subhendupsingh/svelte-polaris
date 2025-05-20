<script lang="ts">
	import { classNames, variationName } from '$utilities/css.js';
	import { noop } from '$utilities/noop.js';
	import MinusIcon from '@shopify/polaris-icons/dist/svg/MinusIcon.svg?component';
	import Choice from '../choice/choice.svelte';
	import { helpTextID } from '../choice/types.js';
	import Icon from '../icon/icon.svelte';
	import { errorTextID } from '../inline-error/types.js';
	import styles from './checkbox.module.css';
	import type { CheckboxProps } from './types.js';
	let {
		ariaControls,
		ariaDescribedBy: ariaDescribedByProp,
		label,
		labelHidden,
		checked = $bindable(false),
		helpText,
		disabled,
		id: idProp,
		name,
		value,
		error,
		onChange,
		onFocus,
		onBlur,
		labelClassName,
		fill,
		bleed,
		bleedBlockStart,
		bleedBlockEnd,
		bleedInlineStart,
		bleedInlineEnd,
		isWithinListbox,
		tone
	}: CheckboxProps = $props();

	let inputNode = $state<HTMLInputElement | undefined>(undefined);
	const uniqId = $props.id();
	const id = idProp ?? uniqId;

	const handleBlur = () => {
		onBlur && onBlur();
	};

	const handleOnClick = () => {
		if (onChange == null || inputNode == null || disabled) {
			return;
		}

		onChange(inputNode.checked, id);
		inputNode.focus();
	};

	const describedBy: string[] = $derived.by(() => {
		const newDescribedBy: string[] = [];
		if (error && typeof error !== 'boolean') {
			newDescribedBy.push(errorTextID(id));
		}
		if (helpText) {
			newDescribedBy.push(helpTextID(id));
		}
		if (ariaDescribedByProp) {
			newDescribedBy.push(ariaDescribedByProp);
		}
		return newDescribedBy;
	});

	const ariaDescribedBy = $derived(describedBy.length ? describedBy.join(' ') : undefined);
	const wrapperClassName = $derived(classNames(styles.Checkbox, error && styles.error));

	/* const isIndeterminate = $derived(checked === 'indeterminate'); */
	const isChecked = $derived(Boolean(checked));

	/* const indeterminateAttributes = $derived(
		isIndeterminate
			? { indeterminate: true, 'aria-checked': 'mixed' as const }
			: { 'aria-checked': isChecked }
	); */

	const inputClassName = $derived(
		classNames(
			styles.Input,
			/* isIndeterminate && styles['Input-indeterminate'], */
			tone && styles[variationName('tone', tone)]
		)
	);

	const extraChoiceProps = $derived({
		helpText,
		error,
		bleed,
		bleedBlockStart,
		bleedBlockEnd,
		bleedInlineStart,
		bleedInlineEnd
	});
</script>

{#snippet iconSource()}
	<svg viewBox="0 0 16 16" style="color: white;" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
		<path
			class={classNames(checked && styles.checked)}
			d="M1.5,5.5L3.44655,8.22517C3.72862,8.62007,4.30578,8.64717,4.62362,8.28044L10.5,1.5"
			transform="translate(2 2.980376)"
			opacity="0"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			pathLength="1"
		/>
	</svg>
{/snippet}

<Choice
	{id}
	{label}
	{labelHidden}
	{disabled}
	labelClassName={classNames(styles.ChoiceLabel, labelClassName)}
	{fill}
	{tone}
	{...extraChoiceProps}
>
	<span class={wrapperClassName}>
		<input
			bind:this={inputNode}
			{id}
			{name}
			{value}
			type="checkbox"
			bind:checked={checked}
			{disabled}
			class={inputClassName}
			onblur={handleBlur}
			onchange={noop}
			onclick={handleOnClick}
			onfocus={onFocus}
			aria-invalid={error != null}
			aria-controls={ariaControls}
			aria-describedby={ariaDescribedBy}
			role={isWithinListbox ? 'presentation' : 'checkbox'}
		/>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<span
			class={styles.Backdrop}
			onclick={(e) => e.stopPropagation()}
			onkeyup={(e) => e.stopPropagation()}
		/>
		<span class={classNames(styles.Icon, styles.animated)}>
			<!-- {#if isIndeterminate}
				<Icon source={MinusIcon} />
			{:else} -->
				{@render iconSource()}
			<!-- {/if} -->
		</span>
	</span>
</Choice>
