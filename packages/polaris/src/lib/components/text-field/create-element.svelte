<script lang="ts">
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';

	// Define the expected props. Many are optional.
	// We use intersection for attributes and add custom/logic props.
	type BaseProps = {
		multiline?: boolean;
		value?: string | number; // For direct value control or initial value
		class?: string; // Svelte uses 'class' instead of 'className'

		// For refs, Svelte uses bind:this.
		// If the parent needs the ref, it's best to pass a callback.
		elementRef?: HTMLInputElement | HTMLTextAreaElement | null;

		// Event handlers: Svelte 5 uses lowercase direct properties or on:event
		// We'll assume they are passed in lowercase if spread, or handle specific ones.
		onFocus?: (e: FocusEvent & { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => void;
		onBlur?: (e: FocusEvent & { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => void;
		onClick?: (e: MouseEvent & { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => void;
		onKeyPress?: (
			e: KeyboardEvent & { currentTarget: HTMLInputElement | HTMLTextAreaElement }
		) => void;
		onKeyDown?: (
			e: KeyboardEvent & { currentTarget: HTMLInputElement | HTMLTextAreaElement }
		) => void;
		onInput?: (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => void; // More specific: InputEvent
		onChange?: (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => void;

		// All other HTML attributes (name, id, disabled, readOnly, type, aria-*, data-*, etc.)
		// will be caught by {...restProps}
		[key: string]: any;
	};

	// Props specific to <input> not already in HTMLInputAttributes if needed
	// interface CustomInputProps { /* ... */ }
	// Props specific to <textarea> not already in HTMLTextareaAttributes if needed
	// interface CustomTextareaProps { /* ... */ }

	type AllProps = BaseProps &
		Partial<Omit<HTMLInputAttributes & HTMLTextareaAttributes, 'value' | 'class'>>;

	let {
		multiline = false,
		value: currentValue = $bindable(),
		className,
		elementRef = $bindable(),
		// Event handlers can be destructured if special logic is needed,
		// otherwise they'll be in restProps.
		onFocus,
		onBlur,
		onClick,
		onKeyPress,
		onKeyDown,
		onInput,
		onChange,
		...restProps // Captures all other attributes like name, id, type, aria-*, data-*, etc.
	}: AllProps = $props();

	const tagName = $derived(multiline ? 'textarea' : 'input');
</script>

{#if tagName == 'input'}
	<input
		bind:this={elementRef}
		class={className}
		bind:value={currentValue}
		{...restProps}
		onfocus={onFocus}
		onblur={onBlur}
		onclick={onClick}
		onkeypress={onKeyPress}
		onkeydown={onKeyDown}
		oninput={onInput}
		onchange={onChange}
	/>
{:else if tagName == 'textarea'}
	<textarea
		bind:this={elementRef}
		class={className}
		bind:value={currentValue}
		{...restProps}
		onfocus={onFocus}
		onblur={onBlur}
		onclick={onClick}
		onkeypress={onKeyPress}
		onkeydown={onKeyDown}
		oninput={onInput}
		onchange={onChange}
	></textarea>
{/if}
