<script>
    import { Bleed, Card, Box, Text } from "svelte-polaris";
</script>

<Card>
    <Box padding="400">
        <Text as="p">This content is contained within the card padding.</Text>
        <Bleed marginInline="800">
            <Box background="bg-fill-info" padding="400">
                <Text as="p"
                    >This content bleeds beyond the card padding horizontally.</Text
                >
            </Box>
        </Bleed>
        <Text as="p">This content is back within the normal padding.</Text>
    </Box>
</Card>
