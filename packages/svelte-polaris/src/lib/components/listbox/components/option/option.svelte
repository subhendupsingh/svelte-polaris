<script lang="ts">
	import {
		MAPPED_ACTION_CONTEXT_KEY,
		type MappedActionContextType
	} from '$lib/utilities/listbox/types.js';
	import UnstyledLink from '$lib/components/button/unstyled-link.svelte';
	import { useContext, useMappedAction } from '$utilities/contexts.js';
	import { classNames } from '$utilities/css.js';
	import {
		ACTION_CONTEXT_KEY,
		LISTBOX_CONTEXT_KEY,
		type ListboxContextType
	} from '$utilities/listbox/types.js';
	import { useSection } from '../section/hooks.js';
	import { listboxWithinSectionDataSelector } from '../section/selectors.js';
	import TextOption from '../text-option/text-option.svelte';
	import styles from './option.module.css';
	import type { OptionProps } from './types.js';
	let {
		value,
		children,
		selected,
		disabled = false,
		accessibilityLabel,
		divider
	}: OptionProps = $props();

	const isAction = useContext(ACTION_CONTEXT_KEY);
	const { onOptionSelect } = useContext<ListboxContextType>(LISTBOX_CONTEXT_KEY) || {};
	const { role, url, external, onAction, destructive } = useContext<MappedActionContextType>(MAPPED_ACTION_CONTEXT_KEY) || {};
	
	let listItemRef = $state<HTMLLIElement>();
	let domId = $props.id();
	const sectionId = useSection();
	const isWithinSection = $derived(Boolean(sectionId));

	const handleOptionSelect = (event: KeyboardEvent | MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		onAction && onAction();

		if (listItemRef && !onAction) {
			onOptionSelect({
				domId,
				value,
				element: listItemRef,
				disabled
			});
		}
	};

	const handleMouseDown = (event: MouseEvent) => {
		event.preventDefault();
	};

	const sectionAttributes = $derived({
		[listboxWithinSectionDataSelector.attribute]: isWithinSection
	});

	const legacyRoleSupport = role || 'option';
</script>

{#snippet content()}
	{#if typeof children === 'string'}
		<TextOption {selected} {disabled}>
			{children}
		</TextOption>
	{:else}
		{typeof children === 'string' ? "string" : "not string"}
		{@render children?.()}
	{/if}
{/snippet}

{#snippet contentMarkup()}
	{#if url}
		<UnstyledLink {url} {external}>
			{@render content()}
		</UnstyledLink>
	{:else}
		{@render content()}
	{/if}
{/snippet}

<li
	{...sectionAttributes}
	data-listbox-option
	data-listbox-option-action={isAction}
	data-listbox-option-value={value}
	data-listbox-option-destructive={destructive}
	data-within-section={isWithinSection}
	class={classNames(styles.Option, divider && styles.divider)}
	id={domId}
	bind:this={listItemRef}
	tabIndex={-1}
	role={legacyRoleSupport}
	aria-label={accessibilityLabel}
	aria-selected={selected}
	aria-disabled={disabled}
	onclick={disabled ? undefined : handleOptionSelect}
	onkeydown={disabled ? undefined : handleOptionSelect}
	onmousedown={handleMouseDown}
>
	{@render contentMarkup()}
</li>
