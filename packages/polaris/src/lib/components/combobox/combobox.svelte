<script lang="ts">
	import type {
		ComboboxListboxOptionType,
		ComboboxListboxType,
		ComboboxTextFieldType
	} from '$utilities/combobox/types.js';
	import type { PopoverPublicAPI } from '../popover/types.js';
	import styles from './combobox.module.css';
	import type { ComboboxProps } from './types.js';
	import ComboboxTextFieldContextProvider from '../app-provider/combobox-text-filed-context-provider.svelte';
	import ComboboxListboxContextProvider from '../app-provider/combobox-list-box-context-provider.svelte';
	import ComboboxListboxOptionContextProvider from '../app-provider/combobox-list-box-option-context-provider.svelte';
	import Popover from '../popover/index.js';

	let {
		activator,
		allowMultiple,
		children,
		preferredPosition = 'below',
		willLoadMoreOptions,
		height,
		maxHeight,
		minHeight,
		onScrolledToBottom,
		onClose
	}: ComboboxProps = $props();

	let popoverActive = $state(false);
	let activeOptionId = $state<string | undefined>(undefined);
	let textFieldLabelId = $state<string | undefined>(undefined);
	let listboxId = $state<string | undefined>(undefined);
	let textFieldFocused = $state(false);
	let shouldOpen = $derived(!popoverActive);
	let ref = $state<PopoverPublicAPI | null>(null);

	const handleClose = () => {
		popoverActive = false;
		onClose?.();

		activeOptionId = undefined;
	};

	const handleOpen = () => {
		popoverActive = true;
		activeOptionId = undefined;
	};

	const onOptionSelected = () => {
		if (!allowMultiple) {
			handleClose();
			activeOptionId = undefined;
			return;
		}

		ref?.forceUpdatePosition();
	};

	const handleFocus = () => {
		if (shouldOpen) {
			handleOpen();
		}
	};

	const handleChange = () => {
		if (shouldOpen) {
			handleOpen();
		}
	};

	const handleBlur = () => {
		if (popoverActive) {
			handleClose();
		}
	};

	const textFieldContextValue: ComboboxTextFieldType = $derived({
		activeOptionId,
		expanded: popoverActive,
		listboxId,
		setTextFieldFocused: (value) => (textFieldFocused = value),
		setTextFieldLabelId: (value) => (textFieldLabelId = value),
		onTextFieldFocus: handleFocus,
		onTextFieldChange: handleChange,
		onTextFieldBlur: handleBlur
	});

	const listboxOptionContextValue: ComboboxListboxOptionType = $derived({ allowMultiple });
	const listboxContextValue: ComboboxListboxType = $derived({
		listboxId,
		textFieldLabelId,
		textFieldFocused,
		willLoadMoreOptions,
		onOptionSelected,
		setActiveOptionId: (value) => (activeOptionId = value),
		setListboxId: (value) => (listboxId = value),
		onKeyToBottom: onScrolledToBottom
	});
</script>

{#snippet activatorMarkup()}
	<ComboboxTextFieldContextProvider value={textFieldContextValue}>
		{@render activator()}
	</ComboboxTextFieldContextProvider>
{/snippet}

<Popover
	trigger={activatorMarkup}
	active={popoverActive}
	autofocusTarget="none"
	preventFocusOnClose
	fullWidth
	preferInputActivator={false}
	{preferredPosition}
	onClose={handleClose}
>
	<Popover.Pane {onScrolledToBottom} {height} {maxHeight} {minHeight}>
		<ComboboxListboxContextProvider value={listboxContextValue}>
			<ComboboxListboxOptionContextProvider value={listboxOptionContextValue}>
				<div class={styles.Listbox}>
					{@render children?.()}
				</div>
			</ComboboxListboxOptionContextProvider>
		</ComboboxListboxContextProvider>
	</Popover.Pane>
</Popover>
