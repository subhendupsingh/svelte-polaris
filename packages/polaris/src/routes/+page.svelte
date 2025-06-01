<script lang="ts">
	import { Badge, Card, InlineStack, BlockStack, Text } from '$lib/index.js';
</script>

<Card>
	<BlockStack gap="400">
		<Text variant="headingMd" as="h2">Payment Status Examples</Text>
		<InlineStack gap="400">
			<Badge tone="success">Paid</Badge>
			<Badge tone="warning">Partially paid</Badge>
			<Badge tone="attention">Pending</Badge>
			<Badge tone="critical">Overdue</Badge>
			<Badge tone="critical">Refunded</Badge>
		</InlineStack>
	</BlockStack>
</Card>
