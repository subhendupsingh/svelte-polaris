<script lang="ts">
	import ScrollContextProvider from '$lib/components/app-provider/scroll-context-provider.svelte';
	import { debounce } from '$utilities/debounce.js';
	import { scrollDefaultContext, type ScrollContextType } from '$utilities/index-table/context.js';
	import styles from './scrollcontainer.module.css';
	import type { ScrollContainerProps } from './types.js';

	let { children, scrollableContainerRef = $bindable(), onScroll }: ScrollContainerProps = $props();

	$effect(() => {
		if (!scrollableContainerRef) return;
		scrollableContainerRef.dispatchEvent(new Event('scroll'));
	});

	let containerScroll = $state<ScrollContextType>(scrollDefaultContext);
	const handleScroll = debounce(
		() => {
			if (!scrollableContainerRef) {
				return;
			}

			const availableScrollAmount =
				scrollableContainerRef.scrollWidth - scrollableContainerRef.offsetWidth;

			const canScrollLeft = scrollableContainerRef.scrollLeft > 0;
			const canScrollRight = scrollableContainerRef.scrollLeft < availableScrollAmount;
			onScroll(canScrollLeft, canScrollRight);
			containerScroll = {
				scrollableContainer: scrollableContainerRef,
				canScrollLeft,
				canScrollRight
			};
		},
		40,
		{ trailing: true, leading: true, maxWait: 40 }
	);
</script>

<ScrollContextProvider value={containerScroll}>
	<div class={styles.ScrollContainer} bind:this={scrollableContainerRef} onscroll={handleScroll}>
		{@render children?.()}
	</div>
</ScrollContextProvider>
