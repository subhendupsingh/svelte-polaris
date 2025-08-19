<script>
	import Popover from "$lib/components/popover/popover.svelte";
	import { Button, Tooltip } from "$lib/index.js";
	import ClipboardIcon from "@shopify/polaris-icons/dist/svg/ClipboardIcon.svg?component";

	let open = $state(false);
	$inspect(open);
</script>

<Popover active={open} onClose={() => {open = false}}>
	{#snippet trigger()}
		<Button onClick={() => {open = true}} icon={ClipboardIcon}>Copy</Button>
	{/snippet}

	Hello
</Popover>