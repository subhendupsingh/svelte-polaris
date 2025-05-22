<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { BaseEventProps, EventListenerProps } from './types.js';
	let { event, capture, handler, window: customWindow, passive }: EventListenerProps = $props();

	const attachListener = () => {
		const window = customWindow || globalThis.window;
		window.addEventListener(event, handler, { capture, passive });
	};

	const detachListener = (prevProps?: BaseEventProps) => {
		const window = customWindow || globalThis.window;
		window.removeEventListener(event, handler, capture);
	};

	onMount(() => {
		//console.log("In EventListner onMount");
		attachListener();
	});

	onDestroy(() => {
		//console.log("In EventListner onDestroy");
		detachListener();
	});
</script>
