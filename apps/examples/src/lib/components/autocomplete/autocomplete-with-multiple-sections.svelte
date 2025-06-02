<script lang="ts">
  import { AutoComplete, Tag, InlineStack } from "svelte-polaris";
  import SearchIcon from "@shopify/polaris-icons/dist/svg/SearchIcon.svg?component";

  let selectedOptions: string[] = [];
  let inputValue = "";

  type Section = {
    title: string;
    options: {
      value: string;
      label: string;
    }[];
  };

  const options: Section[] = [
    {
      title: "Frequently used",
      options: [
        { value: "ups", label: "UPS" },
        { value: "usps", label: "USPS" },
      ],
    },
    {
      title: "All carriers",
      options: [
        { value: "dhl", label: "DHL Express" },
        { value: "canada_post", label: "Canada Post" },
      ],
    },
  ];

  function updateText(value: string) {
    inputValue = value;
  }

  function updateSelection(selected: string[]) {
    selectedOptions = selected;
  }

  function removeTag(option: string) {
    selectedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption !== option,
    );
  }
</script>

{#snippet textField()}
  <AutoComplete.TextField
    onChange={updateText}
    label="Programming languages"
    value={inputValue}
    prefix={SearchIcon}
    placeholder="Search languages..."
    autoComplete="off"
  />
{/snippet}

<AutoComplete
  allowMultiple
  {options}
  selected={selectedOptions}
  onSelect={updateSelection}
  {textField}
/>

{#if selectedOptions.length > 0}
  <div style="margin-top: 1rem;">
    <InlineStack gap="200">
      {#each selectedOptions as option}
        <Tag onRemove={() => removeTag(option)}>
          {option}
        </Tag>
      {/each}
    </InlineStack>
  </div>
{/if}
