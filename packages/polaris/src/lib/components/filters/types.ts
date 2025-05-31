import type { AppliedFilterInterface, FilterInterface } from "$utilities/types.js";
import type { Snippet } from "svelte";
import type { TransitionStatus } from "../popover/components/popover-overlay/types.js";

export const TRANSITION_DURATION = 'var(--p-motion-duration-150)';
export const TRANSITION_MARGIN = '-36px';

export const defaultStyle = {
    transition: `opacity ${TRANSITION_DURATION} var(--p-motion-ease)`,
    opacity: 0,
};

export const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
    unmounted: { opacity: 0 },
};

export const defaultFilterStyles = {
    transition: `opacity ${TRANSITION_DURATION} var(--p-motion-ease), margin ${TRANSITION_DURATION} var(--p-motion-ease)`,
    opacity: 0,
    marginTop: TRANSITION_MARGIN,
};

export const transitionFilterStyles = {
    entering: {
        opacity: 1,
        marginTop: 0,
    },
    entered: {
        opacity: 1,
        marginTop: 0,
    },
    exiting: {
        opacity: 0,
        marginTop: TRANSITION_MARGIN,
    },
    exited: {
        opacity: 0,
        marginTop: TRANSITION_MARGIN,
    },
    unmounted: {
        opacity: 0,
        marginTop: TRANSITION_MARGIN,
    },
};

export interface FiltersProps {
    /** Currently entered text in the query field */
    queryValue?: string;
    /** Placeholder text for the query field. */
    queryPlaceholder?: string;
    /** Whether the query field is focused. */
    focused?: boolean;
    /** Available filters added to the filter bar. Shortcut filters are pinned to the front of the bar. */
    filters: FilterInterface[];
    /** Applied filters which are rendered as filter pills. The remove callback is called with the respective key. */
    appliedFilters?: AppliedFilterInterface[];
    /** Callback when the query field is changed. */
    onQueryChange: (queryValue: string) => void;
    /** Callback when the clear button is triggered. */
    onQueryClear: () => void;
    /** Callback when the reset all button is pressed. */
    onClearAll: () => void;
    /** Callback when the query field is blurred. */
    onQueryBlur?: () => void;
    /** Callback when the query field is focused. */
    onQueryFocus?: () => void;
    /** The content to display inline with the controls. */
    children?: Snippet;
    /** Disable all filters. */
    disabled?: boolean;
    /** Hide filter bar for applied filters. */
    hideFilters?: boolean;
    /** Hide the query field. */
    hideQueryField?: boolean;
    /** Disable the query field. */
    disableQueryField?: boolean;
    /** Disable the filters */
    disableFilters?: boolean;
    /** Whether the text field should be borderless. Should be true when used as part of the IndexFilters component. */
    borderlessQueryField?: boolean;
    /** Whether an asyncronous task is currently being run. */
    loading?: boolean;
    mountedState?: TransitionStatus;
    /** Callback when the add filter button is clicked. */
    onAddFilterClick?: () => void;
    /** Whether the filter should close when clicking inside another Popover. */
    closeOnChildOverlayClick?: boolean;
    /** @deprecated The name of the currently selected view */
    selectedViewName?: string;
}