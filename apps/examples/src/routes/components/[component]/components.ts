import Button from "$lib/components/button/button.svelte";
import BaseActionList from "$lib/components/action-list/base-action-list.svelte";
import ActionListWithIcons from "$lib/components/action-list/action-list-with-icons.svelte";
import ActionListWithSections from "$lib/components/action-list/action-list-with-sections.svelte";
import Autocomplete from "$lib/components/autocomplete/autocomplete.svelte";
import AutocompleteWithMultipleSections from "$lib/components/autocomplete/autocomplete-with-multiple-sections.svelte";
import AutocompleteWithLoadingState from "$lib/components/autocomplete/with-loading-state.svelte";
import AutocompleteWithEmptyState from "$lib/components/autocomplete/with-empty-state.svelte";
import AutocompleteWithAction from "$lib/components/autocomplete/with-action.svelte";

export const componentsMap: Record<string, any> = {
    "button": {
        "base": Button
    },
    "action-list": {
        "base": BaseActionList,
        "action-list-with-icons": ActionListWithIcons,
        "action-list-with-sections": ActionListWithSections
    },
    "autocomplete": {
        "base": Autocomplete,
        "autocomplete-with-multiple-sections": AutocompleteWithMultipleSections,
        "with-loading-state": AutocompleteWithLoadingState,
        "with-empty-state": AutocompleteWithEmptyState,
        "with-action": AutocompleteWithAction
    }
}