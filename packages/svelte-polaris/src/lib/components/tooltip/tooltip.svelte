<script lang="ts">
	import { applyStyles, classNames } from '$utilities/css.js';
	import styles from './tooltip.module.css';
	import { Tooltip } from 'bits-ui';
	import { type Snippet } from 'svelte';
	import type { TooltipProps } from './types.js';

	type TriggerWithProps = {
		trigger: Snippet<[{ props?: Tooltip.TriggerProps }]>;
		triggerProps?: Tooltip.TriggerProps;
		customTrigger?: true
	};

	type TriggerWithoutProps = {
		trigger: Snippet;
		triggerProps?: Tooltip.TriggerProps;
		customTrigger?: false;
	};

	type TriggerProps = TriggerWithProps | TriggerWithoutProps;
	type Props = Tooltip.RootProps & TooltipProps & TriggerProps;

	let {
		open = $bindable(false),
		onOpenChange,
		trigger,
		hasUnderline,
		triggerProps = {},
		content,
		borderRadius = '200',
		dismissOnMouseOut,
		active: originalActive,
		hoverDelay,
		preferredPosition,
		activatorWrapper = 'span',
		accessibilityLabel,
		width = 'default',
		padding = 'default',
		borderRadius: borderRadiusProp,
		zIndexOverride,
		persistOnClick,
		onOpen,
		onClose,
		customTrigger,
		...restProps
	}: Props = $props();

	const wrapperClassNames = $derived(
		classNames(styles.TooltipContainer, hasUnderline && styles.HasUnderline)
	);

	const containerClassName = classNames(
		styles.TooltipOverlay,
		preferredPosition === 'top' && styles.positionedAbove
	);

	const contentClassName = classNames(styles.Content, width && styles[width]);

	const style = {
		'--pc-tooltip-border-radius': borderRadius
			? `var(--p-border-radius-${borderRadius})`
			: undefined,
		'--pc-tooltip-padding':
			padding && padding === 'default'
				? 'var(--p-space-100) var(--p-space-200)'
				: `var(--p-space-${padding})`
	};
</script>

<Tooltip.Provider>
	<Tooltip.Root bind:open {onOpenChange}>
		{#if customTrigger}
			<Tooltip.Trigger class={styles.Trigger} {...triggerProps}>
				{#snippet child({ props }: { props: Tooltip.TriggerProps })}
					{@render trigger({ props })}
				{/snippet}
			</Tooltip.Trigger>
		{:else}
			<Tooltip.Trigger class={styles.Trigger} {...triggerProps}>
				{@render trigger()}
			</Tooltip.Trigger>
		{/if}
		<Tooltip.Portal>
			<Tooltip.Content forceMount>
				{#snippet child({ props, wrapperProps, open })}
					{#if open}
						<div {...wrapperProps}>
							<div {...props} class={containerClassName} style={applyStyles(style)} {...restProps}>
								<Tooltip.Arrow height={11} width={19}>
									{#snippet child({ props })}
										<svg {...props} class={styles.Tail} width="19" height="11" fill="none"
											><path
												d="m0 2 6.967 7.25a3 3 0 0 0 4.243.083L18.829 2h-1.442l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2H0Z"
												fill="var(--p-color-tooltip-tail-down-border)"
											></path><path
												d="M1.387 0h16v2l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2V0Z"
												fill="var(--p-color-bg-surface)"
											></path></svg
										>
									{/snippet}
								</Tooltip.Arrow>
								<div class={wrapperClassNames}>
									<div class={contentClassName} style={applyStyles(style)}>
										{#if typeof content === 'string'}
											{content}
										{:else}
											{@render content?.()}
										{/if}
									</div>
								</div>
							</div>
						</div>
					{/if}
				{/snippet}
			</Tooltip.Content>
		</Tooltip.Portal>
	</Tooltip.Root>
</Tooltip.Provider>
