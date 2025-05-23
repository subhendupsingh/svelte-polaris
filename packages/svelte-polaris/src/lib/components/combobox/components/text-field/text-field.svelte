<script lang="ts">
	import { labelID } from '$lib/components/label/types.js';
	import type { TextFieldProps } from '$lib/components/text-field/types.js';
	import { useComboboxTextField } from '$utilities/combobox/hooks.js';
	import TextField from '$lib/components/text-field/text-field.svelte';

	let {
		value,
		id: idProp,
		type = 'text',
		ariaAutocomplete = 'list',
		onFocus,
		onBlur,
		onChange,
		...rest
	}: TextFieldProps = $props();

	const comboboxTextFieldContext = useComboboxTextField();
	const {
		activeOptionId,
		listboxId,
		expanded,
		setTextFieldFocused,
		setTextFieldLabelId,
		onTextFieldFocus,
		onTextFieldChange,
		onTextFieldBlur
	} = comboboxTextFieldContext;
	const uniqueId = $props.id();
	const textFieldId = $derived(idProp || uniqueId);
	const labelId = $derived(labelID(idProp || uniqueId));

	$effect(() => {
		if (setTextFieldLabelId) setTextFieldLabelId(labelId);
	});

	const handleFocus = (event: FocusEvent | undefined) => {
		if (onFocus) onFocus(event);
		if (onTextFieldFocus) onTextFieldFocus();
		if (setTextFieldFocused) setTextFieldFocused(true);
	};

	const handleBlur = (event: FocusEvent | undefined) => {
		if (onBlur) onBlur(event);
		if (onTextFieldBlur) onTextFieldBlur();
		if (setTextFieldFocused) setTextFieldFocused(false);
	};

	const handleChange = (value: string, id: string) => {
		if (onChange) onChange(value, id);
		if (onTextFieldChange) onTextFieldChange(value);
	};
</script>

<TextField
	{...rest}
	{value}
	id={textFieldId}
	{type}
	{ariaAutocomplete}
	ariaActiveDescendant={activeOptionId}
	ariaControls={listboxId}
	role="combobox"
	ariaExpanded={expanded}
	onFocus={handleFocus}
	onBlur={handleBlur}
	onChange={handleChange}
/>
