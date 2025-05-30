<script lang="ts">
	import { arraysAreEqual } from '$utilities/arrays.js';
	import { isSection } from '$utilities/options.js';
	import type { Descriptor, OptionDescriptor, SectionDescriptor } from '$utilities/types.js';
	import Box from '../box/box.svelte';
	import Text from '../text/text.svelte';
	import type { OptionListProps } from './types.js';
	import Option from './components/option/option.svelte';
	import type { BoxProps } from '../box/types.js';
	import BlockStack from '../block-stack/block-stack.svelte';

	let {
		options,
		sections,
		title,
		selected,
		allowMultiple,
		role,
		verticalAlign,
		onChange,
		id: idProp,
		onPointerEnterOption,
		onFocusOption
	}: OptionListProps = $props();

	function createNormalizedOptions(
		options?: OptionDescriptor[],
		sections?: SectionDescriptor[],
		title?: string
	): SectionDescriptor[] {
		if (options == null) {
			const section = { options: [], title };
			return sections == null ? [] : [section, ...sections];
		}
		if (sections == null) {
			return [
				{
					title,
					options
				}
			];
		}
		return [
			{
				title,
				options
			},
			...sections
		];
	}

	function optionArraysAreEqual(firstArray: Descriptor[], secondArray: Descriptor[]) {
		if (isSection(firstArray) && isSection(secondArray)) {
			return arraysAreEqual<SectionDescriptor>(firstArray, secondArray, testSectionsPropEquality);
		}

		return arraysAreEqual(firstArray, secondArray);
	}

	function testSectionsPropEquality(
		previousSection: SectionDescriptor,
		currentSection: SectionDescriptor
	) {
		const { options: previousOptions } = previousSection;
		const { options: currentOptions } = currentSection;
		const optionsAreEqual = arraysAreEqual(previousOptions, currentOptions);
		const titlesAreEqual = previousSection.title === currentSection.title;
		return optionsAreEqual && titlesAreEqual;
	}

	let normalizedOptions = $state(createNormalizedOptions(options, sections, title));

	$effect(() => {
		if (!optionArraysAreEqual(options ?? [], sections ?? [])) {
			normalizedOptions = createNormalizedOptions(options, sections, title);
		}
	});

	const handleClick = (sectionIndex: number, optionIndex: number) => {
		const selectedValue = normalizedOptions[sectionIndex].options[optionIndex].value;
		const foundIndex = selected.indexOf(selectedValue);
		if (allowMultiple) {
			const newSelection =
				foundIndex === -1
					? [selectedValue, ...selected]
					: [...selected.slice(0, foundIndex), ...selected.slice(foundIndex + 1, selected.length)];
			onChange(newSelection);
			return;
		}
		onChange([selectedValue]);
	};

	const handlePointerEnter = (sectionIndex: number, optionIndex: number) => {
		if (!onPointerEnterOption) return;

		const selectedValue = normalizedOptions[sectionIndex].options[optionIndex].value;

		onPointerEnterOption(selectedValue);
	};

	const handleFocus = (sectionIndex: number, optionIndex: number) => {
		if (!onFocusOption) return;

		const selectedValue = normalizedOptions[sectionIndex].options[optionIndex].value;

		onFocusOption(selectedValue);
	};

	const optionsExist = $derived(normalizedOptions.length > 0);
</script>

{#snippet optionsMarkup()}
	{#if optionsExist}
		{#each normalizedOptions as { title, options }, sectionIndex}
			{@const isFirstOption = sectionIndex === 0}
			{@const titleLevel = isFirstOption ? 'h2' : 'h3'}

			{#snippet titleMarkup()}
				{#if title}
					<Box
						paddingBlockStart={isFirstOption ? '050' : '300'}
						paddingInlineStart="150"
						paddingBlockEnd="100"
						paddingInlineEnd="150"
						borderColor="border-secondary"
					>
						<Text as={titleLevel} variant="headingSm">
							{title}
						</Text>
					</Box>
				{/if}
			{/snippet}

			{#snippet optionMarkup()}
				{#each options as option, optionIndex}
					{@const isSelected = selected.includes(option.value)}
					{@const optionId = option.id || `${idProp}-${sectionIndex}-${optionIndex}`}

					<Option
						{...option}
						id={optionId}
						section={sectionIndex}
						index={optionIndex}
						onClick={handleClick}
						select={isSelected}
						{allowMultiple}
						{verticalAlign}
						onPointerEnter={handlePointerEnter}
						onFocus={handleFocus}
					/>
				{/each}
			{/snippet}

			{#snippet option()}
				<Box as="ul" id={`${idProp}-${sectionIndex}`} role={role as BoxProps['role']}>
					{@render optionMarkup()}
				</Box>
			{/snippet}

			{@const blockStartPadding = isFirstOption ? (title ? '100' : '0') : title ? '050' : '0'}

			<Box as="li" paddingBlockStart={blockStartPadding}>
				<BlockStack gap={isFirstOption && sections ? undefined : '0'}>
					{@render titleMarkup()}
					{@render option()}
				</BlockStack>
			</Box>
		{/each}
	{/if}
{/snippet}

<Box as="ul" role={role as BoxProps['role']} padding="150">
	{@render optionsMarkup()}
</Box>
