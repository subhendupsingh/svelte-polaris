<script lang="ts">
	import { handleMouseUpByBlurring } from '$utilities/focus.js';
	import type { UnstyledButtonProps } from './unstyled-button.types.js';
	import UnstyledLink from './unstyled-link.svelte';

	let {
		id,
		children,
		className,
		url,
		external,
		target,
		download,
		submit,
		disabled,
		loading,
		pressed,
		accessibilityLabel,
		role,
		ariaControls,
		ariaExpanded,
		ariaDescribedBy,
		ariaChecked,
		triggerProps,
		onClick,
		onFocus,
		onBlur,
		onKeyDown,
		onKeyPress,
		onKeyUp,
		onMouseEnter,
		onTouchStart,
		...restProps
	}: UnstyledButtonProps = $props();

	const commonProps = {
		id,
		className,
		'aria-label': accessibilityLabel
	};

	const interactiveProps = {
		...commonProps,
		role,
		onClick,
		onFocus,
		onBlur,
		onMouseUp: handleMouseUpByBlurring,
		onMouseEnter,
		onTouchStart
	};
</script>

{#if url}
    {#if disabled}
        <a {...commonProps} {...restProps}>
            {@render children?.()}
        </a>
    {:else}
        <UnstyledLink 
            {...interactiveProps}
            {...restProps}
            url={url}
            external={external}
            target={target}
            download={download}
        >
            {@render children?.()}
        </UnstyledLink>
    {/if}
{:else}
	{#if triggerProps}
		<button {...restProps} {...triggerProps}>{@render children?.()}</button>
	{:else}
		<button
			{...interactiveProps}
			{...restProps}
			{...triggerProps}
			onclick={onClick}
			onfocus={onFocus}
			onblur={onBlur}
			onkeydown={onKeyDown}
			onkeypress={onKeyPress}
			onkeyup={onKeyUp}
			onmouseenter={onMouseEnter}
			ontouchstart={onTouchStart}
			aria-disabled={disabled}
			type={submit ? 'submit' : 'button'}
			aria-busy={loading ? true : undefined}
			aria-controls={ariaControls}
			aria-expanded={ariaExpanded}
			aria-describedby={ariaDescribedBy}
			aria-pressed={pressed}
			tabIndex={disabled ? -1 : undefined}>
			{@render children?.()}
		</button>
	{/if}
{/if}
