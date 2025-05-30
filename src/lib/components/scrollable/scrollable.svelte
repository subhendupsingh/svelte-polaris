<script lang="ts">
	import { StickyManager } from '$utilities/sticky-manager/sticky-manager.js';
	import { onMount } from 'svelte';
	import styles from './scrollable.module.css';
	import {
		LOW_RES_BUFFER,
		performScrollHint,
		type ScrollableProps
	} from './types.js';
	import { debounce } from '$utilities/debounce.js';
	import { applyStyles, classNames, variationName } from '$utilities/css.js';
	import { scrollable } from '$utilities/shared.js';
	import ScrollableProvider from '../app-provider/scrollable-provider.svelte';
	import StickymanagerProvider from '../app-provider/stickymanager-provider.svelte';
	let {
		children,
		horizontal = true,
		vertical = true,
		class: className,
		shadow,
		hint,
		focusable,
		style,
		scrollbarWidth = 'thin',
		scrollbarGutter,
		onScrolledToBottom,
		...rest
	}: ScrollableProps & { class?: string, style?: Record<string, string | number | undefined> } = $props();

	let topShadow = $state(false);
	let bottomShadow = $state(false);
	const stickyManager = new StickyManager();
	let scrollArea: HTMLDivElement | undefined = $state();

	const handleScroll = () => {
		const currentScrollArea = scrollArea;
		if (!currentScrollArea) {
			return;
		}

		requestAnimationFrame(() => {
			const { scrollTop, clientHeight, scrollHeight } = currentScrollArea;
			const canScroll = Boolean(scrollHeight > clientHeight);
			const isBelowTopOfScroll = Boolean(scrollTop > 0);
			const isAtBottomOfScroll = Boolean(scrollTop + clientHeight >= scrollHeight - LOW_RES_BUFFER);

			topShadow = isBelowTopOfScroll;
			bottomShadow = !isAtBottomOfScroll;

			if (canScroll && isAtBottomOfScroll && onScrolledToBottom) {
				onScrolledToBottom();
			}
		});
	};

	onMount(() => {
		handleScroll();

		if (hint) {
			requestAnimationFrame(() => performScrollHint(scrollArea));
		}
	});

	$effect(() => {
		const currentScrollArea = scrollArea;

		if (!currentScrollArea) {
			return;
		}

		const handleResize = debounce(handleScroll, 50, { trailing: true });

		stickyManager.setContainer(currentScrollArea);
		currentScrollArea.addEventListener('scroll', handleScroll);
		globalThis.addEventListener('resize', handleResize);

		return () => {
			currentScrollArea.removeEventListener('scroll', handleScroll);
			globalThis.removeEventListener('resize', handleResize);
		};
	});

	const finalClassName = $derived(
		classNames(
			className,
			styles.Scrollable,
			vertical && styles.vertical,
			horizontal && styles.horizontal,
			shadow && topShadow && styles.hasTopShadow,
			shadow && bottomShadow && styles.hasBottomShadow,
			scrollbarWidth && styles[variationName('scrollbarWidth', scrollbarWidth)],
			scrollbarGutter && styles[variationName('scrollbarGutter', scrollbarGutter.replace(' ', ''))]
		)
	);
</script>

<ScrollableProvider>
	<StickymanagerProvider value={stickyManager}>
		<div
			class={finalClassName}
			{...scrollable.props}
			{...rest}
			style={style ? applyStyles(style) : undefined}
			bind:this={scrollArea}
			tabIndex={focusable ? 0 : undefined}
		>
			{@render children?.()}
		</div>
	</StickymanagerProvider>
</ScrollableProvider>
