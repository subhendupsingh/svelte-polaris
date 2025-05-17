<script lang="ts">
	import type { PopoverProps } from './types.js';
	import { Popover } from 'bits-ui';
	import styles from './popover.module.css';
	import { applyStyles, classNames } from '$utilities/css.js';
	import Box from '../box/box.svelte';

	let {
		children,
		onClose,
		activator,
		preventFocusOnClose,
		active = false,
		zIndexOverride,
		fullWidth,
		fullHeight,
		hideOnPrint,
		preventInteraction,
		classNames: propClassNames,
		autofocusTarget,
		captureOverscroll,
		preferredAlignment,
		preferredPosition,
		preventCloseOnChildOverlayClick,
		sectioned,
		sideOffset = 0
	}: PopoverProps = $props();

	const overlayClassName = $derived(
		classNames(
			styles.PositionedOverlay,
			styles.PopoverOverlay,
			preventInteraction && styles.preventInteraction,
			propClassNames
		)
	);

	const popoverClassNames = classNames(
		styles.Popover,
		fullWidth && styles.fullWidth,
		hideOnPrint && styles['PopoverOverlay-hideOnPrint']
	);

	const contentClassNames = classNames(styles.Content, fullHeight && styles['Content-fullHeight']);

	const style = $derived(classNames(zIndexOverride && `z-index: ${zIndexOverride}`));
</script>

<Popover.Root
	bind:open={active}
	onOpenChange={(open) => {
		if (!open) {
			onClose?.();
		}
	}}
>
	<Popover.Trigger>
		{#snippet child({ props })}
			{@render activator?.({ props })}
		{/snippet}
	</Popover.Trigger>
	<Popover.Portal>
		<Popover.Content
			{sideOffset}
			forceMount={true}
			onEscapeKeydown={(e) => (active = false)}
			onInteractOutside={(e) => {
				if (preventCloseOnChildOverlayClick) {
					e.preventDefault();
				} else {
					active = false;
				}
			}}
			preventScroll={captureOverscroll}
			autofocus={autofocusTarget}
			onCloseAutoFocus={(e) => {
				if (preventFocusOnClose) {
					e.preventDefault();
				}
			}}
			side={preferredPosition}
			align={preferredAlignment}
		>
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps}>
						<div {...props} {style}>
							<div class={popoverClassNames}>
								<div class={styles.ContentContainer}>
									<div class={contentClassNames}>
										{#if sectioned}
											<div class={styles.Section}>
												<Box
													paddingInlineStart="300"
													paddingInlineEnd="300"
													paddingBlockStart="200"
													paddingBlockEnd="150"
												>
													{@render children?.()}
												</Box>
											</div>
										{:else}
											{@render children?.()}
										{/if}
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}
			{/snippet}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
