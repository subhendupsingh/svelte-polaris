<script lang="ts">
    import PlusCircleIcon from "@shopify/polaris-icons/dist/svg/PlusCircleIcon.svg?component";
    import SearchIcon from "@shopify/polaris-icons/dist/svg/SearchIcon.svg?component";
    import { AutoComplete } from "svelte-polaris";

    let selectedOptions: string[] = [];
    let inputValue = "";

    const options = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
        { value: "date", label: "Date" },
        { value: "elderberry", label: "Elderberry" },
        { value: "fig", label: "Fig" },
        { value: "grape", label: "Grape" },
    ];

    function updateText(value: string) {
        inputValue = value;
    }

    function updateSelection(selected: string[]) {
        selectedOptions = selected;
    }
</script>

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
    actionBefore={{
        accessibilityLabel: "Action label",
        badge: {
            tone: "new",
            content: "New!",
        },
        content: "Action with long name",
        ellipsis: true,
        helpText: "Help text",
        icon: PlusCircleIcon,
        onAction: () => {
            console.log("actionBefore clicked!");
        },
    }}
/>
