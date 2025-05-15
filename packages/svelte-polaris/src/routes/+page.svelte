<script lang="ts">
	import Bleed from '$lib/components/bleed/bleed.svelte';
	import BlockStack from '$lib/components/block-stack/block-stack.svelte';
	import Box from '$lib/components/box/box.svelte';
	import Button from '$lib/components/button/button.svelte';
	import Text from '$lib/components/text/text.svelte';
</script>

<Box background="bg-fill-info">
	<BlockStack gap="100">
		<Text as="h2" variant="heading2xl">Content inside a card</Text>
		<Bleed marginInline="0">
			<Text as="p" variant="bodyMd">Content inside a card</Text>
		</Bleed>

		<div>
			<Button variant="primary" fullWidth={false}>Button</Button>
		</div>
	</BlockStack>
</Box>
