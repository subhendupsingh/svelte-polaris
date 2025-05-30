import type { Snippet } from "svelte";
import type { PopoverProps } from "../popover/types.js";
import type { ListboxProps } from "../listbox/types.js";
import type { TextFieldProps } from "../text-field/types.js";

export interface ComboboxProps {
    /** The text field component to activate the Popover */
    activator: Snippet
    /** Allows more than one option to be selected */
    allowMultiple?: boolean;
    /** The content to display inside the popover */
    children?: Snippet;
    /** The preferred direction to open the popover */
    preferredPosition?: PopoverProps['preferredPosition'];
    /** Whether or not more options are available to lazy load when the bottom of the listbox reached. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
    willLoadMoreOptions?: boolean;
    /** Height to set on the Popover Pane. */
    height?: string;
    /** Callback fired when the bottom of the listbox is reached. Use to lazy load when listbox option data is paginated. */
    maxHeight?: string;
    /** Min Height to set on the Popover Pane. */
    minHeight?: string;
    /** Callback fired when the bottom of the lisbox is reached. Use to lazy load when listbox option data is paginated. */
    onScrolledToBottom?(): void;
    /** Callback fired when the popover closes */
    onClose?(): void;
}