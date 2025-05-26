<script lang="ts">
	import { onMount } from 'svelte';
	import type { CombinedProps, State } from './types.js';
	import { applyStyles } from '$utilities/css.js';
	import { getRectForNode } from '$utilities/geometry.js';

	let states: State = $state({
		isSticky: false,
		style: {}
	});

	let placeHolderNode: HTMLElement | null = $state(null);
	let stickyNode: HTMLElement | null = $state(null);
	let {
		offset = false,
		disableWhenStacked = false,
		stickyManager,
		children,
		onStickyChange,
		boundingElement,
		isSticky = $bindable()
	}: CombinedProps = $props();

	const handlePositioning = (stick: boolean, top = 0, left = 0, width = 0) => {
		isSticky = states.isSticky;

		if ((stick && !isSticky) || (!stick && isSticky)) {
			adjustPlaceHolderNode(stick);
			states.isSticky = !isSticky;

			if (onStickyChange) {
				onStickyChange(!isSticky);
			}

			if (boundingElement) {
				boundingElement.toggleAttribute('data-sticky-active');
			}
		}

		const style = stick
			? {
					position: 'fixed',
					top,
					left,
					width
				}
			: {};

		states.style = style;
	};

	const adjustPlaceHolderNode = (add: boolean) => {
		if (placeHolderNode && stickyNode) {
			placeHolderNode.style.paddingBottom = add ? `${getRectForNode(stickyNode).height}px` : '0px';
		}
	};

	onMount(() => {
		if (!stickyNode || !placeHolderNode) return;

		stickyManager().registerStickyItem({
			stickyNode,
			placeHolderNode,
			handlePositioning,
			offset,
			boundingElement,
			disableWhenStacked
		});

		return () => {
			if (!stickyNode) return;
			stickyManager().unregisterStickyItem(stickyNode);
		};
	});
</script>

<div>
	<div bind:this={placeHolderNode}></div>
	<div bind:this={stickyNode} style={applyStyles(states.style)}>
		{@render children?.()}
	</div>
</div>
