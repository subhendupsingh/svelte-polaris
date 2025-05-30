<script lang="ts">
	import { onMount } from 'svelte';
	import type { KeypressListenerProps } from './types.js';
	let {
		keyCode,
		handler,
		keyEvent = 'keyup',
		options,
		useCapture,
		document: ownerDocument = globalThis.document
	}: KeypressListenerProps = $props();

	const tracked = $state({ handler, keyCode });

	const handleKeyEvent = (event: KeyboardEvent) => {
		const { handler, keyCode } = tracked;
		if (event.keyCode === keyCode) {
			handler(event);
		}
	};

	onMount(() => {
		ownerDocument.addEventListener(keyEvent, handleKeyEvent, useCapture || options);
		return () => {
			ownerDocument.removeEventListener(keyEvent, handleKeyEvent, useCapture || options);
		};
	});
</script>
