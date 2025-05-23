<script lang="ts">
	import type { OptionDescriptor } from '$utilities/types.js';
	import Combobox from '../combobox/index.js';
	import Listbox from '../listbox/index.js';
	import { AutoSelection } from '../listbox/types.js';
	import styles from './autocomplete.module.css';
	import MappedAction from './components/mapped-action/mapped-action.svelte';
	import MappedOption from './components/mapped-option/mapped-option.svelte';
	import { isSection, type AutocompleteProps } from './types.js';
	let {
		options,
		selected,
		textField,
		preferredPosition,
		listTitle,
		allowMultiple,
		loading,
		actionBefore,
		willLoadMoreResults,
		emptyState,
		onSelect,
		onLoadMoreResults
	}: AutocompleteProps = $props();

	const updateSelection = (newSelection: string) => {
		if (actionBefore && newSelection === actionBefore.content) {
			actionBefore.onAction && actionBefore.onAction();
			return;
		}

		if (allowMultiple) {
			if (selected.includes(newSelection)) {
				onSelect(selected.filter((option) => option !== newSelection));
			} else {
				onSelect([...selected, newSelection]);
			}
		} else {
			onSelect([newSelection]);
		}
	};

	const autoSelection = actionBefore ? AutoSelection.First : undefined;
</script>

{#snippet buildMappedOptionFromOption(options: OptionDescriptor[])}
	{#if options.length > 0}
		{#each options as option}
			<MappedOption
				{...option}
				selected={selected.includes(option.value)}
				singleSelection={!allowMultiple}
			/>
		{/each}
	{/if}
{/snippet}

{#snippet optionsMarkup()}
	{@const conditionalOptions = loading && !willLoadMoreResults ? [] : options}

	{#if isSection(conditionalOptions)}
		{@const noOptionsAvailable = conditionalOptions.every(({ options }) => options.length === 0)}

		{#if !noOptionsAvailable}
			<div class={styles.SectionWrapper}>
				{#each conditionalOptions as { options, title: sectionTitle }}
					<Listbox.Section divider={false}>
						{#snippet title()}
							<Listbox.Header>{sectionTitle}</Listbox.Header>
						{/snippet}
						{@render buildMappedOptionFromOption(options)}
					</Listbox.Section>
				{/each}
			</div>
		{/if}
	{:else if listTitle}
		<Listbox.Section divider={false}>
			{#snippet title()}
				<Listbox.Header>{listTitle}</Listbox.Header>
			{/snippet}
			{@render buildMappedOptionFromOption(conditionalOptions)}
		</Listbox.Section>
	{:else}
		{@render buildMappedOptionFromOption(conditionalOptions)}
	{/if}
{/snippet}

{#snippet loadingMarkup()}
	{#if loading}
		<Listbox.Loading accessibilityLabel={'Loading'} />
	{/if}
{/snippet}

{#snippet actionMarkup()}
	{#if actionBefore}
		<MappedAction {...actionBefore} />
	{/if}
{/snippet}

{#snippet emptyStateMarkup()}
	{#if options.length < 1 && !loading}
		{@render emptyState?.()}
	{/if}
{/snippet}

<Combobox
	activator={textField}
	{allowMultiple}
	onScrolledToBottom={onLoadMoreResults}
	{preferredPosition}
	willLoadMoreOptions={willLoadMoreResults}
>
	<Listbox {autoSelection} onSelect={updateSelection}>
		{@render actionMarkup()}
		{#if !loading || willLoadMoreResults}
			{@render optionsMarkup()}
		{/if}
		{@render loadingMarkup()}
		{@render emptyStateMarkup()}
	</Listbox>
</Combobox>
