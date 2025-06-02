<script>
    import { Button, InlineStack } from "svelte-polaris";

    function handleClick() {
        console.log("Button clicked");
    }
</script>

<InlineStack gap="200" wrap>
    <Button onClick={handleClick} variant="primary">Primary button</Button>
    <Button onClick={handleClick} variant="secondary">Secondary button</Button>
    <Button onClick={handleClick} variant="tertiary">Tertiary button</Button>
    <Button onClick={handleClick} variant="plain">Plain button</Button>
    <Button onClick={handleClick} variant="monochromePlain">Monochrome plain button</Button>
</InlineStack>
