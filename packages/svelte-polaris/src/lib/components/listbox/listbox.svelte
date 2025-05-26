<script lang="ts">
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import { debounce } from '$utilities/debounce.js';
	import { scrollOptionIntoView } from '$utilities/listbox/utilities.js';
	import { scrollable } from '$utilities/shared.js';
	import { Key, type ComboboxListboxType, type NavigableOption } from '$utilities/types.js';
	import KeypressListener from '../keypress-listener/keypress-listener.svelte';
	import styles from './listbox.module.css';
	import Text from '../text/text.svelte';
	import {
		AutoSelection,
		OPTION_ACTION_ATTRIBUTE,
		OPTION_FOCUS_ATTRIBUTE,
		OPTION_SELECTOR,
		OPTION_VALUE_ATTRIBUTE,
		type ArrowKeys,
		type ListboxProps
	} from './types.js';
	import ListboxContentProvider from '../app-provider/list-box-content-provider.svelte';
	import WithinListBoxContextProvider from '../app-provider/within-list-box-context-provider.svelte';
	import { useContext } from '$utilities/contexts.js';
	import { COMBOBOX_LIST_BOX_CONTEXT_KEY } from '$utilities/combobox/types.js';
	let {
		children,
		autoSelection = AutoSelection.FirstSelected,
		enableKeyboardControl,
		accessibilityLabel,
		customListId,
		onSelect,
		onActiveOptionChange
	}: ListboxProps = $props();

	let loading = $state<string | undefined>();
	let activeOption = $state<NavigableOption | undefined>();
	let lazyLoading = $state(false);
	let currentOptions = $state<HTMLElement[]>([]);
	const uniqueId = $props.id();
	const listId = customListId || uniqueId;
	let scrollableRef = $state<HTMLElement | null>(null);
	let listboxRef = $state<HTMLUListElement | null>(null);

	const keyboardEventsEnabled = new UseToggle(Boolean(enableKeyboardControl));
	const enableKeyboardEvents = keyboardEventsEnabled.setTrue;
	const disableKeyboardEvents = keyboardEventsEnabled.setFalse;

	/* const {
		listboxId,
		textFieldLabelId,
		textFieldFocused,
		willLoadMoreOptions,
		setActiveOptionId,
		setListboxId,
		onOptionSelected,
		onKeyToBottom
	} = useContext<ComboboxListboxType>(COMBOBOX_LIST_BOX_CONTEXT_KEY) || {}; */

	const comboboxListBoxContext = useContext<ComboboxListboxType>(COMBOBOX_LIST_BOX_CONTEXT_KEY);

	const inCombobox = Boolean(comboboxListBoxContext()?.setActiveOptionId);

	$effect(() => {
		if (comboboxListBoxContext()?.setListboxId && !comboboxListBoxContext()?.listboxId) {
			comboboxListBoxContext()?.setListboxId?.(listId);
		}
	});

	const getNavigableOptions = () => {
		if (!listboxRef) {
			return [];
		}

		return [...new Set(listboxRef.querySelectorAll<HTMLElement>(OPTION_SELECTOR))];
	};

	const getFirstNavigableOption = (currentOptions: HTMLElement[]) => {
		const hasSelectedOptions = currentOptions.some(
			(option) => option.getAttribute('aria-selected') === 'true'
		);

		let elementIndex = 0;
		const element = currentOptions.find((option, index) => {
			const isInteractable = option.getAttribute('aria-disabled') !== 'true';
			let isFirstNavigableOption;

			if (hasSelectedOptions && autoSelection === AutoSelection.FirstSelected) {
				const isSelected = option.getAttribute('aria-selected') === 'true';
				isFirstNavigableOption = isSelected && isInteractable;
			} else {
				isFirstNavigableOption = isInteractable;
			}

			if (isFirstNavigableOption) elementIndex = index;

			return isFirstNavigableOption;
		});

		if (!element) return;

		return { element, index: elementIndex };
	};

	const handleScrollIntoView = (option: NavigableOption) => {
		if (!scrollableRef) return;
		const scrollable = scrollableRef;

		if (scrollable) {
			scrollOptionIntoView(option.element, scrollable);
		}
	};

	const handleScrollIntoViewDebounced = debounce(handleScrollIntoView, 50);
	const handleKeyToBottom = () => {
		if (comboboxListBoxContext()?.onKeyToBottom) {
			lazyLoading = true;
			return Promise.resolve(comboboxListBoxContext()?.onKeyToBottom?.());
		}
	};

	const handleChangeActiveOption = (nextOption?: NavigableOption) => {
		if (!nextOption) return;
		activeOption?.element?.removeAttribute(OPTION_FOCUS_ATTRIBUTE);
		nextOption.element?.setAttribute(OPTION_FOCUS_ATTRIBUTE, 'true');
		handleScrollIntoViewDebounced(nextOption);
		activeOption = nextOption;
		comboboxListBoxContext()?.setActiveOptionId?.(nextOption.domId);
		onActiveOptionChange?.(nextOption.value, nextOption.domId);
	};

	const getFormattedOption = (element: HTMLElement, index: number) => {
		return {
			element,
			index,
			domId: element.id,
			value: element.getAttribute(OPTION_VALUE_ATTRIBUTE) || '',
			disabled: element.getAttribute('aria-disabled') === 'true',
			isAction: element.getAttribute(OPTION_ACTION_ATTRIBUTE) === 'true'
		};
	};

	const resetActiveOption = () => {
		let nextOption;
		const nextOptions = getNavigableOptions();
		const nextActiveOption = getFirstNavigableOption(nextOptions);
		if (nextOptions.length === 0 && currentOptions.length > 0) {
			currentOptions = nextOptions;
			handleChangeActiveOption();
			return;
		}

		if (nextActiveOption) {
			const { element, index } = nextActiveOption;
			nextOption = getFormattedOption(element, index);
		}

		const optionIsAlreadyActive =
			activeOption !== undefined && nextOption?.domId === activeOption?.domId;

		const actionContentHasUpdated =
			activeOption?.isAction && nextOption?.isAction && nextOption?.value !== activeOption?.value;

		const currentValues = currentOptions.map((option) =>
			option.getAttribute(OPTION_VALUE_ATTRIBUTE)
		);

		const nextValues = nextOptions.map((option) => option.getAttribute(OPTION_VALUE_ATTRIBUTE));

		const listIsUnchanged =
			nextValues.length === currentValues.length &&
			nextValues.every((value, index) => {
				return currentValues[index] === value;
			});

		const listIsAppended =
			currentValues.length !== 0 &&
			nextValues.length > currentValues.length &&
			currentValues.every((value, index) => {
				return nextValues[index] === value;
			});

		if (listIsUnchanged) {
			if (optionIsAlreadyActive && actionContentHasUpdated) {
				currentOptions = nextOptions;
				handleChangeActiveOption(nextOption);
			}

			return;
		}

		if (listIsAppended) {
			currentOptions = nextOptions;
			return;
		}

		currentOptions = nextOptions;

		if (lazyLoading) {
			lazyLoading = false;
			return;
		}

		handleChangeActiveOption(nextOption);
	};

	$effect(() => {
		if (autoSelection !== AutoSelection.None && !loading) {
			resetActiveOption();
		}
	});

	$effect(() => {
		if (listboxRef) {
			scrollableRef = listboxRef.closest(scrollable.selector);
		}
	});

	$effect(() => {
		if (enableKeyboardControl && !keyboardEventsEnabled) {
			enableKeyboardEvents();
		}
	});

	const onOptionSelect = (option: NavigableOption) => {
		handleChangeActiveOption(option);

		if (comboboxListBoxContext()?.onOptionSelected) comboboxListBoxContext()?.onOptionSelected?.();
		if (onSelect) onSelect(option.value);
	};

	const getNextIndex = (currentIndex: number, lastIndex: number, direction: string) => {
		let nextIndex;

		if (direction === 'down') {
			if (currentIndex === lastIndex) {
				nextIndex = comboboxListBoxContext()?.willLoadMoreOptions ? currentIndex + 1 : 0;
			} else {
				nextIndex = currentIndex + 1;
			}
		} else {
			nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
		}

		return nextIndex;
	};

	const getNextValidOption = async (key: ArrowKeys) => {
		const lastIndex = currentOptions.length - 1;
		let currentIndex = activeOption?.index || 0;
		let nextIndex = 0;
		let element = activeOption?.element;
		let totalOptions = -1;

		if (!activeOption && autoSelection === AutoSelection.None) {
			const nextOptions = getNavigableOptions();
			const nextActiveOption = getFirstNavigableOption(nextOptions);
			currentOptions = nextOptions;
			return {
				element: nextActiveOption?.element,
				nextIndex: nextActiveOption?.index || 0
			};
		}

		while (totalOptions++ < lastIndex) {
			nextIndex = getNextIndex(currentIndex, lastIndex, key);
			element = currentOptions[nextIndex];
			const triggerLazyLoad = nextIndex >= lastIndex;
			const isDisabled = element?.getAttribute('aria-disabled') === 'true';

			if (triggerLazyLoad && comboboxListBoxContext()?.willLoadMoreOptions) {
				await handleKeyToBottom();
			}

			if (isDisabled) {
				currentIndex = nextIndex;
				element = undefined;
				continue;
			}

			break;
		}
		return { element, nextIndex };
	};

	const handleArrow = async (type: ArrowKeys, event: KeyboardEvent) => {
		event.preventDefault();
		const { element, nextIndex } = await getNextValidOption(type);
		if (!element) return;
		const nextOption = getFormattedOption(element, nextIndex);
		handleChangeActiveOption(nextOption);
	};

	const handleDownArrow = (event: KeyboardEvent) => {
		handleArrow('down', event);
	};

	const handleUpArrow = (event: KeyboardEvent) => {
		handleArrow('up', event);
	};

	const handleEnter = (event: KeyboardEvent) => {
		event.preventDefault();
		event.stopPropagation();
		if (activeOption) {
			onOptionSelect(activeOption);
		}
	};

	const handleFocus = () => {
		if (enableKeyboardControl) return;
		enableKeyboardEvents();
	};

	const handleBlur = (event: FocusEvent) => {
		event.stopPropagation();
		if (keyboardEventsEnabled) {
			const nextActiveOption = getFirstNavigableOption(currentOptions);

			if (nextActiveOption) {
				const { element, index } = nextActiveOption;
				const nextOption = getFormattedOption(element, index);
				handleChangeActiveOption(nextOption);
			}
		}
		if (enableKeyboardControl) return;
		disableKeyboardEvents();
	};

	const setLoading = (label?: string) => {
		loading = label;
	};

	const listboxContext = $derived({
		onOptionSelect,
		setLoading
	});
</script>

{#snippet listeners()}
	{#if keyboardEventsEnabled || comboboxListBoxContext()?.textFieldFocused}
		<KeypressListener keyEvent="keydown" keyCode={Key.DownArrow} handler={handleDownArrow} />
		<KeypressListener keyEvent="keydown" keyCode={Key.UpArrow} handler={handleUpArrow} />
		<KeypressListener keyEvent="keydown" keyCode={Key.Enter} handler={handleEnter} />
	{/if}
{/snippet}

{@render listeners()}

<Text as="span" visuallyHidden>
	<div aria-live="polite">{loading ? loading : null}</div>
</Text>

<ListboxContentProvider value={listboxContext}>
	<WithinListBoxContextProvider value>
		<ul
			role="listbox"
			class={styles.Listbox}
			aria-label={inCombobox ? undefined : accessibilityLabel}
			aria-labelledby={comboboxListBoxContext()?.textFieldLabelId}
			aria-busy={Boolean(loading)}
			aria-activedescendant={activeOption && activeOption.domId}
			tabindex="0"
			id={listId}
			onfocus={inCombobox ? undefined : handleFocus}
			onblur={inCombobox ? undefined : handleBlur}
			bind:this={listboxRef}
		>
			{@render children?.()}
		</ul>
	</WithinListBoxContextProvider>
</ListboxContentProvider>
