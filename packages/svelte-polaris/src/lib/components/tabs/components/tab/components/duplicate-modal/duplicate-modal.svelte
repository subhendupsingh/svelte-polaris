<script lang="ts">
	import { focusFirstFocusableNode } from '$utilities/focus.js';
	import { MAX_VIEW_NAME_LENGTH, type DuplicateModalProps } from './types.js';

	let {
		open,
		isModalLoading,
		name,
		onClose,
		onClickPrimaryAction,
		onClickSecondaryAction,
		helpText,
		viewNames
	}: DuplicateModalProps = $props();

	let value = $state(name);
	let container = $state<HTMLDivElement | null>(null);

	const hasSameNameError = $derived(
		viewNames?.some((viewName) => viewName.trim().toLowerCase() === value.trim().toLowerCase())
	);

	const isPrimaryActionDisabled = $derived(
		isModalLoading || hasSameNameError || !value || value.length > MAX_VIEW_NAME_LENGTH
	);

	$effect(() => {
		if (!container) return;
		if (open) {
			focusFirstFocusableNode(container);
		}
	});

	$effect(() => {
		if (open) {
			value = name.slice(0, MAX_VIEW_NAME_LENGTH);
		}
	});

	const handleChange = (newValue: string) => {
		value = newValue;
	};

	async function handlePrimaryAction() {
		if (isPrimaryActionDisabled) {
			return;
		}
		await onClickPrimaryAction(value);
		value = '';
		onClose();
	}

	function handleSecondaryAction() {
		onClickSecondaryAction?.();
		value = name;
		onClose();
	}
</script>
