<script>
    import { InlineStack, Badge } from "svelte-polaris";
</script>

<InlineStack gap="400">
    <Badge>Default</Badge>
    <Badge progress="partiallyComplete" tone="info">Info</Badge>
    <Badge progress="complete" tone="success">Success</Badge>
    <Badge progress="incomplete" tone="warning">Warning</Badge>
    <Badge progress="partiallyComplete" tone="critical">Critical</Badge>
    <Badge progress="partiallyComplete" tone="attention">Attention</Badge>
    <Badge progress="partiallyComplete" tone="new">New</Badge>
</InlineStack>
