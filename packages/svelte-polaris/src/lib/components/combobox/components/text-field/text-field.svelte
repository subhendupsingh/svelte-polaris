<script lang="ts">
	import { labelID } from '$lib/components/label/types.js';
	import type { TextFieldProps } from '$lib/components/text-field/types.js';
	import TextField from '$lib/components/text-field/text-field.svelte';
	import { COMBOBOX_TEXT_FIELD_CONTEXT_KEY, type ComboboxTextFieldType } from '$utilities/combobox/types.js';
	import { useContext } from '$utilities/contexts.js';

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

	const comboboxTextFieldContext = useContext<ComboboxTextFieldType>(COMBOBOX_TEXT_FIELD_CONTEXT_KEY);
	const {
		activeOptionId,
		listboxId,
		expanded,
		setTextFieldFocused,
		setTextFieldLabelId,
		onTextFieldFocus,
		onTextFieldChange,
		onTextFieldBlur
	} = $derived(comboboxTextFieldContext());
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
