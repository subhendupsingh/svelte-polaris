<script lang="ts">
	import { classNames, variationName } from '$utilities/css.js';
	import styles from './text-field.module.css';
	import type { SpinnerProps, TextFieldProps } from './types.js';
	import Text from '../text/text.svelte';
	import LoadingSpinner from '../spinner/spinner.svelte';
	import XCircleIcon from '@shopify/polaris-icons/dist/svg/XCircleIcon.svg?component';
	import Icon from '../icon/icon.svelte';
	import { browser } from '$app/environment';
	import TextFieldResizer from './components/resizer/text-field-resizer.svelte';
	import { Key } from '$utilities/types.js';
	import type { ChangeEventHandler } from 'svelte/elements';
	import CreateElement from './create-element.svelte';
	import Labelled from '../labelled/labelled.svelte';
	import Connected from '../connected/connected.svelte';
	import Spinner from './components/spinner/spinner.svelte';

	let {
		prefix,
		suffix,
		verticalContent,
		placeholder,
		value = '',
		helpText,
		label,
		labelAction,
		labelHidden,
		disabled,
		clearButton,
		readOnly,
		autoFocus,
		focused,
		multiline,
		error,
		connectedRight,
		connectedLeft,
		type = 'text',
		name,
		id: idProp,
		role,
		step,
		largeStep,
		autoComplete,
		max,
		maxLength,
		maxHeight,
		min,
		minLength,
		pattern,
		inputMode,
		spellCheck,
		ariaOwns,
		ariaControls,
		ariaExpanded,
		ariaActiveDescendant,
		ariaAutocomplete,
		showCharacterCount,
		align,
		requiredIndicator,
		monospaced,
		selectTextOnFocus,
		suggestion,
		variant = 'inherit',
		size = 'medium',
		onClearButtonClick,
		onChange,
		onSpinnerChange,
		onFocus,
		onBlur,
		tone,
		autoSize,
		loading
	}: TextFieldProps = $props();

	let height = $state<number | null>(null);
	let focus = $derived(focused ?? false);
	const uniqId = $props.id();
	const id = idProp ?? uniqId;

	let textFieldRef = $state<HTMLDivElement>();
	let inputRef = $state<HTMLInputElement>();
	let textAreaRef = $state<HTMLTextAreaElement>();
	let prefixRef = $state<HTMLDivElement>();
	let suffixRef = $state<HTMLDivElement>();
	let loadingRef = $state<HTMLDivElement>();
	let verticalContentRef = $state<HTMLDivElement>();
	let buttonPressTimer = $state<number>();
	let spinnerRef = $state<HTMLDivElement>();
	let describedBy: string[] = $state([]);
	const labelledBy: string[] = $state([]);
	const isSupportedInputType = $derived(
		type === 'text' ||
		type === 'tel' ||
		type === 'search' ||
		type === 'url' ||
		type === 'password'
	);

	const getInputRef = () => {
		return multiline ? textAreaRef : inputRef;
	};

	function helpTextID(id: string) {
		return `${id}HelpText`;
	}

	function labelID(id: string) {
		return `${id}Label`;
	}

	$effect(() => {
		const input = inputRef;
		
		if (!input || !isSupportedInputType || !suggestion) {
			return;
		}

		input.setSelectionRange(value.length, suggestion.length);

		if (error) {
			describedBy.push(`${id}Error`);
		}
		if (helpText) {
			describedBy.push(helpTextID(id));
		}
		if (showCharacterCount) {
			describedBy.push(`${id}-CharacterCounter`);
		}

		if (prefix) {
			labelledBy.push(`${id}-Prefix`);
		}

		if (suffix) {
			labelledBy.push(`${id}-Suffix`);
		}

		if (verticalContent) {
			labelledBy.push(`${id}-VerticalContent`);
		}

		labelledBy.unshift(labelID(id));
	});

	const normalizedValue = $derived(suggestion ? suggestion : value);
	const normalizedStep = $derived(step != null ? step : 1);
	const normalizedMax = $derived(max != null ? max : Infinity);
	const normalizedMin = $derived(min != null ? min : -Infinity);

	const className = $derived(
		classNames(
			styles.TextField,
			Boolean(normalizedValue) && styles.hasValue,
			disabled && styles.disabled,
			readOnly && styles.readOnly,
			error && styles.error,
			tone && styles[variationName('tone', tone)],
			multiline && styles.multiline,
			focus && !disabled && styles.focus,
			variant !== 'inherit' && styles[variant],
			size === 'slim' && styles.slim
		)
	);

	const inputType = type === 'currency' ? 'text' : type;
	const isNumericType = type === 'number' || type === 'integer';
	const characterCountClassName = $derived(
		classNames(styles.CharacterCount, multiline && styles.AlignFieldBottom)
	);

	function handleClearButtonPress() {
		onClearButtonClick && onClearButtonClick(id);
	}

	const handleNumberChange = (steps: number, stepAmount = normalizedStep) => {
		if (onChange == null && onSpinnerChange == null) {
			return;
		}

		const dpl = (num: number) => (num.toString().split('.')[1] || []).length;

		const numericValue = value ? parseFloat(value) : 0;
		if (isNaN(numericValue)) {
			return;
		}

		// Making sure the new value has the same length of decimal places as the
		// step / value has.
		const decimalPlaces = type === 'integer' ? 0 : Math.max(dpl(numericValue), dpl(stepAmount));

		const newValue = Math.min(
			Number(normalizedMax),
			Math.max(numericValue + steps * stepAmount, Number(normalizedMin))
		);

		if (onSpinnerChange != null) {
			onSpinnerChange(String(newValue.toFixed(decimalPlaces)), id);
		} else if (onChange != null) {
			onChange(String(newValue.toFixed(decimalPlaces)), id);
		}
	};

	const handleSpinnerButtonRelease = () => {
		clearTimeout(buttonPressTimer);
	};

	const handleSpinnerButtonPress: SpinnerProps['onMouseDown'] = (onChange) => {
		const minInterval = 50;
		const decrementBy = 10;
		let interval = 200;

		const onChangeInterval = () => {
			if (interval > minInterval) interval -= decrementBy;
			onChange(0);
			buttonPressTimer = window.setTimeout(onChangeInterval, interval);
		};

		buttonPressTimer = window.setTimeout(onChangeInterval, interval);

		document.addEventListener('mouseup', handleSpinnerButtonRelease, {
			once: true
		});
	};

	const style = $derived(multiline && height ? { height, maxHeight } : null);

	const handleExpandingResize = (height: number) => {
		height = height;
	};

	const inputClassName = $derived(
		classNames(
			styles.Input,
			align && styles[variationName('Input-align', align)],
			suffix && styles['Input-suffixed'],
			clearButton && styles['Input-hasClearButton'],
			monospaced && styles.monospaced,
			suggestion && styles.suggestion,
			autoSize && styles['Input-autoSize']
		)
	);

	const handleOnFocus = (event: FocusEvent | MouseEvent) => {
		focus = true;
		if (selectTextOnFocus && !suggestion) {
			const input = getInputRef();
			input?.select();
		}

		if (onFocus) {
			onFocus(event as FocusEvent);
		}
	};

	function handleOnWheel(event: WheelEvent) {
		if (document.activeElement === event.target && isNumericType) {
			event.stopPropagation();
		}
	}

	function handleOnBlur(event: FocusEvent) {
		focus = false;

		// Return early if new focus target is inside the TextField component
		if (textFieldRef?.contains(event.relatedTarget as Node)) {
			return;
		}

		if (onBlur) {
			onBlur(event);
		}
	}

	function isInput(target: HTMLElement | EventTarget) {
		const input = getInputRef();
		return (
			target instanceof HTMLElement &&
			input &&
			(input.contains(target) || input.contains(document.activeElement))
		);
	}

	function isPrefixOrSuffix(target: Element | EventTarget) {
		return (
			target instanceof Element &&
			((prefixRef && prefixRef.contains(target)) || (suffixRef && suffixRef.contains(target)))
		);
	}

	function isSpinner(target: Element | EventTarget) {
		return target instanceof Element && spinnerRef && spinnerRef.contains(target);
	}

	function isLoadingSpinner(target: Element | EventTarget) {
		return target instanceof Element && loadingRef && loadingRef.contains(target);
	}

	function isVerticalContent(target: Element | EventTarget) {
		return (
			target instanceof Element &&
			verticalContentRef &&
			(verticalContentRef.contains(target) || verticalContentRef.contains(document.activeElement))
		);
	}

	function getRows(multiline?: boolean | number) {
		if (!multiline) return undefined;

		return typeof multiline === 'number' ? multiline : 1;
	}

	function normalizeAriaMultiline(multiline?: boolean | number) {
		if (!multiline) return undefined;

		return Boolean(multiline) || (typeof multiline === 'number' && multiline > 0)
			? { 'aria-multiline': true }
			: undefined;
	}

	function handleClickChild(event: MouseEvent) {
		if (!isSpinner(event.target as Element) && !isInput(event.target as Element)) {
			event.stopPropagation();
		}

		if (
			isPrefixOrSuffix(event.target as Element) ||
			isVerticalContent(event.target as Element) ||
			isInput(event.target as Element) ||
			isLoadingSpinner(event.target as Element) ||
			focus
		) {
			return;
		}

		focus = true;
		getInputRef()?.focus();
	}

	function handleClick(event: MouseEvent) {
		const { target } = event;

		// For TextFields used with Combobox, focus needs to be set again even
		// if the TextField is already focused to trigger the logic to open the
		// Combobox activator
		const inputRefRole = inputRef?.getAttribute('role');
		if (target === inputRef && inputRefRole === 'combobox') {
			inputRef?.focus();
			handleOnFocus(event);
			return;
		}

		if (
			isPrefixOrSuffix(target as Element) ||
			isVerticalContent(target as Element) ||
			isInput(target as Element) ||
			isSpinner(target as Element) ||
			isLoadingSpinner(target as Element) ||
			focus
		) {
			return;
		}

		getInputRef()?.focus();
	}

	function handleKeyPress(event: KeyboardEvent) {
		const { key, which } = event;
		const numbersSpec = /[\d.,eE+-]$/;
		const integerSpec = /[\deE+-]$/;

		if (
			!isNumericType ||
			which === Key.Enter ||
			(type === 'number' && numbersSpec.test(key)) ||
			(type === 'integer' && integerSpec.test(key))
		) {
			return;
		}

		event.preventDefault();
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (!isNumericType) {
			return;
		}

		const { key, which } = event;

		if (type === 'integer' && (key === 'ArrowUp' || which === Key.UpArrow)) {
			handleNumberChange(1);
			event.preventDefault();
		}
		if (type === 'integer' && (key === 'ArrowDown' || which === Key.DownArrow)) {
			handleNumberChange(-1);
			event.preventDefault();
		}

		if ((which === Key.Home || key === 'Home') && min !== undefined) {
			if (onSpinnerChange != null) {
				onSpinnerChange(String(min), id);
			} else if (onChange != null) {
				onChange(String(min), id);
			}
		}

		if ((which === Key.End || key === 'End') && max !== undefined) {
			if (onSpinnerChange != null) {
				onSpinnerChange(String(max), id);
			} else if (onChange != null) {
				onChange(String(max), id);
			}
		}

		if ((which === Key.PageUp || key === 'PageUp') && largeStep !== undefined) {
			handleNumberChange(1, largeStep);
		}

		if ((which === Key.PageDown || key === 'PageDown') && largeStep !== undefined) {
			handleNumberChange(-1, largeStep);
		}
	}

	function handleChange(event: Event) {
		onChange && onChange((event.target as HTMLInputElement).value, id);
	}

	const inputProps = $derived.by(() => {
		const props: Record<string, any> = {
			name,
			id,
			disabled,
			readOnly,
			role,
			autoFocus,
			multiline,
			value: normalizedValue,
			placeholder,
			style,
			autoComplete,
			className: inputClassName,
			ref: multiline ? textAreaRef : inputRef,
			min,
			max,
			step,
			minLength,
			maxLength,
			spellCheck,
			pattern,
			inputMode,
			type: inputType,
			size: autoSize ? 1 : undefined,
			'aria-describedby': describedBy.length ? describedBy.join(' ') : undefined,
			'aria-labelledby': labelledBy.join(' '),
			'aria-invalid': Boolean(error),
			'aria-owns': ariaOwns,
			'aria-activedescendant': ariaActiveDescendant,
			'aria-autocomplete': ariaAutocomplete,
			'aria-controls': ariaControls,
			'aria-expanded': ariaExpanded,
			'aria-required': requiredIndicator,
			...normalizeAriaMultiline(multiline),
			onfocus: handleOnFocus,
			onblur: handleOnBlur,
			onclick: handleClickChild,
			onkeypress: handleKeyPress,
			onkeydown: handleKeyDown,
			onchange: !suggestion ? handleChange : undefined,
			oninput: suggestion ? handleChange : undefined,
			// 1Password disable data attribute
			'data-1p-ignore': autoComplete === 'off' || undefined,
			// LastPass disable data attribute
			'data-lpignore': autoComplete === 'off' || undefined,
			// Dashlane disable data attribute
			'data-form-type': autoComplete === 'off' ? 'other' : undefined
		};
		
		if (!multiline) {
			props.type = inputType;
			props.size = autoSize ? 1 : undefined;
		} else {
			props.rows = getRows(multiline);
		}

		return props;
	});
</script>

{#snippet prefixMarkup()}
	{#if prefix}
		<div
			class={classNames(styles.Prefix, styles.PrefixIcon)}
			id={`${id}-Prefix`}
			bind:this={prefixRef}
		>
			<Text as="span" variant="bodyMd">
				{prefix}
			</Text>
		</div>
	{/if}
{/snippet}

{#snippet suffixMarkup()}
	{#if suffix}
		<div class={styles.Suffix} id={`${id}-Suffix`} bind:this={suffixRef}>
			<Text as="span" variant="bodyMd">
				{suffix}
			</Text>
		</div>
	{/if}
{/snippet}

{#snippet loadingMarkup()}
	{#if loading}
		<div class={styles.Loading} id={`${id}-Loading`} bind:this={loadingRef}>
			<LoadingSpinner size="small" />
		</div>
	{/if}
{/snippet}

{#snippet characterCountMarkup()}
	{#if showCharacterCount}
		{@const characterCount = normalizedValue.length}
		{@const characterCountLabel = maxLength
			? `${characterCount} of ${maxLength} characters used`
			: `${characterCount} characters`}
		{@const characterCountText = !maxLength ? characterCount : `${characterCount}/${maxLength}`}

		<div
			id={`${id}-CharacterCounter`}
			class={characterCountClassName}
			aria-label={characterCountLabel}
			aria-live={focus ? 'polite' : 'off'}
			aria-atomic="true"
		>
			<Text as="span" variant="bodyMd">
				{characterCountText}
			</Text>
		</div>
	{/if}
{/snippet}

{#snippet clearButtonMarkup()}
	{@const clearButtonVisible = normalizedValue !== ''}
	{#if clearButton && clearButtonVisible}
		<button type="button" class={styles.ClearButton} onclick={handleClearButtonPress} {disabled}>
			<Text as="span" visuallyHidden>Clear</Text>
			<Icon source={XCircleIcon} tone="base" />
		</button>
	{/if}
{/snippet}

{#snippet spinnerMarkup()}
	{#if isNumericType && step !== 0 && !disabled && !readOnly}
		<Spinner 
			onClick={handleClickChild}
			onChange={handleNumberChange}
			onMouseDown={handleSpinnerButtonPress}
			onMouseUp={handleSpinnerButtonRelease}
			ref={spinnerRef}
			onBlur={handleOnBlur}
		/>
	{/if}
{/snippet}

{#snippet resizerMarkup()}
	{#if multiline && browser}
		<TextFieldResizer
			contents={normalizedValue || placeholder}
			currentHeight={height}
			minimumLines={typeof multiline === 'number' ? multiline : 1}
			onHeightChange={handleExpandingResize}
		/>
	{/if}
{/snippet}

{#snippet inputWithVerticalContentMarkup()}
	{#if verticalContent}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class={styles.VerticalContent}
			id={`${id}-VerticalContent`}
			bind:this={verticalContentRef}
			onclick={handleClickChild}
		>
			{verticalContent}
			<CreateElement {...inputProps} />
		</div>
	{/if}
{/snippet}

{#snippet inputMarkup()}
	{#if verticalContent}
		{@render inputWithVerticalContentMarkup()}
	{:else}
		<CreateElement {...inputProps} />
	{/if}
{/snippet}

{#snippet backdropMarkup()}
	<div
		class={classNames(
			styles.Backdrop,
			connectedLeft && styles['Backdrop-connectedLeft'],
			connectedRight && styles['Backdrop-connectedRight']
		)}
	></div>
{/snippet}

{#snippet inputAndSuffixMarkup()}
	{#if autoSize}
		<div class={styles.InputAndSuffixWrapper}>
			<div
				class={classNames(styles.AutoSizeWrapper, suffix && styles.AutoSizeWrapperWithSuffix)}
				data-auto-size-value={value || placeholder}
			>
				{@render inputMarkup()}
			</div>
			{@render suffixMarkup()}
		</div>
	{:else}
		{@render inputMarkup()}
		{@render suffixMarkup()}
	{/if}
{/snippet}

<Labelled
	{label}
	{id}
	{error}
	action={labelAction}
	{labelHidden}
	{helpText}
	{requiredIndicator}
	{disabled}
	{readOnly}
>
	<Connected left={connectedLeft} right={connectedRight}>
		<!--  svelte-ignore a11y_no_static_element_interactions -->
		<!--  svelte-ignore a11y_click_events_have_key_events -->
		<div class={className} onclick={handleClick} bind:this={textFieldRef}>
			{@render prefixMarkup()}
			{@render inputAndSuffixMarkup()}
			{@render characterCountMarkup()}
			{@render loadingMarkup()}
			{@render clearButtonMarkup()}
			{@render spinnerMarkup()}
			{@render backdropMarkup()}
			{@render resizerMarkup()}
		</div>
	</Connected>
</Labelled>
