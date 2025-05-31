<script lang="ts">
	import { classNames, variationName } from '$utilities/css.js';
	import Choice from '../choice/choice.svelte';
	import { helpTextID } from '../choice/types.js';
	import styles from './radio-button.module.css';
	import type { RadioButtonProps } from './types.js';
	let {
		ariaDescribedBy: ariaDescribedByProp,
		label,
		labelHidden,
		helpText,
		checked,
		disabled,
		onChange,
		onFocus,
		onBlur,
		id: idProp,
		name: nameProp,
		value,
		fill,
		bleed,
		bleedBlockStart,
		bleedBlockEnd,
		bleedInlineStart,
		bleedInlineEnd,
		tone
	}: RadioButtonProps = $props();

	const uniqId = $props.id();
	const id = idProp ?? uniqId;
	const name = nameProp || id;
	let inputNode = $state<HTMLInputElement | undefined>(undefined);

	const handleBlur = () => {
		onBlur && onBlur();
	};

	function handleChange({ currentTarget }: Event) {
		onChange && onChange((currentTarget as HTMLInputElement)?.checked, id);
	}

	const describedBy: string[] = $derived.by(() => {
		const newDescribedBy: string[] = [];
		if (helpText) {
			newDescribedBy.push(helpTextID(id));
		}
		if (ariaDescribedByProp) {
			newDescribedBy.push(ariaDescribedByProp);
		}
		return newDescribedBy;
	});

	const ariaDescribedBy = $derived(describedBy.length ? describedBy.join(' ') : undefined);

	const inputClassName = $derived(
		classNames(styles.Input, tone && styles[variationName('tone', tone)])
	);

	const extraChoiceProps = $derived({
		helpText,
		bleed,
		bleedBlockStart,
		bleedBlockEnd,
		bleedInlineStart,
		bleedInlineEnd
	});
</script>

<Choice
	{label}
	{labelHidden}
	{disabled}
	{id}
	labelClassName={styles.ChoiceLabel}
	{fill}
	{...extraChoiceProps}
	{...checked ? { tone } : {}}
>
	<span class={styles.RadioButton}>
		<input
			{id}
			{name}
			{value}
			type="radio"
			{checked}
			{disabled}
			class={inputClassName}
			onchange={handleChange}
			onfocus={onFocus}
			onblur={handleBlur}
			aria-describedby={ariaDescribedBy}
			bind:this={inputNode}
		/>
		<span class={styles.Backdrop}></span>
	</span>
</Choice>
