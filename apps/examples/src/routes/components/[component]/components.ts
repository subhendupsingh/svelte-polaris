import Button from "$lib/components/button/button.svelte";
import BaseActionList from "$lib/components/action-list/base-action-list.svelte";
import ActionListWithIcons from "$lib/components/action-list/action-list-with-icons.svelte";
import ActionListWithSections from "$lib/components/action-list/action-list-with-sections.svelte";
import Autocomplete from "$lib/components/autocomplete/autocomplete.svelte";

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
        "base": Autocomplete
    }
}