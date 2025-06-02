<script lang="ts">
    import { BlockStack, Icon, Text, AutoComplete, Box } from 'svelte-polaris';
    import SearchIcon from "@shopify/polaris-icons/dist/svg/SearchIcon.svg?component";

    let selectedOptions: string[] = [];
    let inputValue = "";

    const options:[] = [
    ];

    function updateText(value: string) {
        inputValue = value;
    }

    function updateSelection(selected: string[]) {
        selectedOptions = selected;
    }
</script>

{#snippet emptyState()}
    <Box padding="200">
        <BlockStack gap="200">
            <Icon source={SearchIcon} />
            <Text variant="headingMd" as="h2">No colors found</Text>
            <Text variant="bodyMd" as="p">Try searching for red, blue, or green</Text>
        </BlockStack>
    </Box>
{/snippet}

{#snippet textField()}
    <AutoComplete.TextField
        onChange={updateText}
        label="Tags"
        value={inputValue}
        prefix={SearchIcon}
        placeholder="Search"
        autoComplete="off"
    />
{/snippet}

<AutoComplete
    {options}
    selected={selectedOptions}
    onSelect={updateSelection}
    {textField}
    {emptyState}
/>
