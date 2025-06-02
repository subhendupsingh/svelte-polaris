import Button from "$lib/components/button/button.svelte";
import BaseActionList from "$lib/components/action-list/base-action-list.svelte";
import ActionListWithIcons from "$lib/components/action-list/action-list-with-icons.svelte";
import ActionListWithSections from "$lib/components/action-list/action-list-with-sections.svelte";
import Autocomplete from "$lib/components/autocomplete/autocomplete.svelte";
import AutocompleteWithMultipleSections from "$lib/components/autocomplete/autocomplete-with-multiple-sections.svelte";
import AutocompleteWithLoadingState from "$lib/components/autocomplete/with-loading-state.svelte";
import AutocompleteWithEmptyState from "$lib/components/autocomplete/with-empty-state.svelte";
import AutocompleteWithAction from "$lib/components/autocomplete/with-action.svelte";
import Avatar from "$lib/components/avatar/avatar.svelte";
import Badge from "$lib/components/badge/badge.svelte";
import BadgeWithTone from "$lib/components/badge/with-tone.svelte";
import BadgeWithSize from "$lib/components/badge/with-size.svelte";
import Bleed from "$lib/components/bleed/bleed.svelte";
import ButtonTones from "$lib/components/button/button-tones.svelte";
import ButtonSizes from "$lib/components/button/button-sizes.svelte";
import ButtonGroup from "$lib/components/button-group/button-group.svelte";
import Segmented from "$lib/components/button-group/segmented.svelte";

export const componentsMap: Record<string, any> = {
    "button": {
        "base": Button,
        "tones": ButtonTones,
        "sizes": ButtonSizes
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
    },
    "avatar": {
        "base": Avatar
    },
    "badge": {
        "base": Badge,
        "with-tone": BadgeWithTone,
        "with-size": BadgeWithSize
    },
    "bleed": {
        "base": Bleed,
    },
    "button-group": {
        "base": ButtonGroup,
        "segmented": Segmented
    }
}