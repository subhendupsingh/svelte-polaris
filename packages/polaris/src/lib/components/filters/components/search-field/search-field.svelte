<script lang="ts">
	import { UseBreakpoints } from '$lib/use/use-breakpoints.svelte.js';
	import type { SearchFieldProps } from './types.js';
	import Text from '$lib/components/text/text.svelte';
	import TextField from '$lib/components/text-field/text-field.svelte';
	import Icon from '$lib/components/icon/icon.svelte';
	import SearchIcon from '@shopify/polaris-icons/dist/svg/SearchIcon.svg?component';

	let {
		onChange,
		onClear,
		onFocus,
		onBlur,
		focused,
		value,
		placeholder,
		disabled,
		borderlessQueryField,
		loading,
		selectedViewName
	}: SearchFieldProps = $props();

	const id = $props.id();
	const bp = new UseBreakpoints();
	const mdUp = $derived(bp.breakpoints?.mdUp);

	function handleChange(eventValue: string) {
		onChange(eventValue ?? value);
	}

	function handleClear() {
		if (onClear) {
			onClear();
		} else {
			onChange('');
		}
	}
</script>

{#snippet suffix()}
	{#if value && selectedViewName && mdUp}
		<Text as="span" variant="bodyMd" tone="subdued">
			{`in:${selectedViewName}`}
		</Text>
	{/if}
{/snippet}

{#snippet prefix()}
	{#if mdUp}
		<Icon source={SearchIcon} />
	{/if}
{/snippet}

<TextField
	{id}
	{value}
	onChange={handleChange}
	{onFocus}
	{onBlur}
	onClearButtonClick={handleClear}
	autoComplete="off"
	{placeholder}
	{disabled}
	variant={borderlessQueryField ? 'borderless' : 'inherit'}
	size="slim"
	{prefix}
	{suffix}
	{focused}
	label={placeholder ?? ""}
	labelHidden
	clearButton
	autoSize={Boolean(suffix)}
	{loading}
/>
