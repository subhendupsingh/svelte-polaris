<script lang="ts">
	import type { FormProps } from './types.js';
	import Text from '../text/text.svelte';

	let {
		acceptCharset,
		action,
		autoComplete,
		children,
		encType,
		implicitSubmit = true,
		method = 'post',
		name,
		noValidate,
		preventDefault = true,
		target,
		onSubmit
	}: FormProps = $props();

	function normalizeAutoComplete(autoComplete?: boolean) {
		if (autoComplete == null) {
			return autoComplete;
		}

		return autoComplete ? 'on' : 'off';
	}

	const autoCompleteInputs = normalizeAutoComplete(autoComplete);

	const handleSubmit = (event: SubmitEvent) => {
		if (!preventDefault) {
			return;
		}

		event.preventDefault();
		onSubmit(event);
	};
</script>

<form
	acceptcharset={acceptCharset}
	enctype={encType}
	{action}
	autoComplete={autoCompleteInputs}
	{method}
	{name}
	novalidate={noValidate}
	{target}
	onsubmit={handleSubmit}
>
	{#if implicitSubmit}
		<Text as="span" visuallyHidden>
			<button type="submit" aria-hidden="true" tabIndex={-1}> Submit </button>
		</Text>
	{/if}
	{children}
</form>
