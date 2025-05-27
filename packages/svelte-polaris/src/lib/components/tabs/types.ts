import type { ActionListItemDescriptor } from "$utilities/types.js";
import type { Snippet } from "svelte";

export type TabAction =
  | 'rename'
  | 'edit'
  | 'edit-columns'
  | 'duplicate'
  | 'delete';

interface TabActionDescriptor
  extends Omit<ActionListItemDescriptor, 'onAction'> {
  type: TabAction;
  onAction?: (name: string) => void;
  onPrimaryAction?: (name: string) => Promise<boolean> | void;
}

export interface TabProps {
  /** Optional callback invoked when a merchant clicks on a Tab when it is not active */
  onAction?(): void;
  /** The unique identifier for the Tab */
  id: string;
  /** The name of the Tab */
  content: string;
  /** A unique identifier for the panel */
  panelID?: string;
  /** The accessible label for the Tab, if the name alone does not give enough context */
  accessibilityLabel?: string;
  /** A badge to render next to the view name */
  badge?: string;
  /** An icon to render in place of a view name. Please pass the full Icon component, rather
   * than a reference to the particular icon source. */
  icon?: Snippet;
  /** Optional URL if the Tab points to a location */
  url?: string;
  /** If true, will remove the ability to edit/rename/delete the view. */
  isLocked?: boolean;
  /** Whether the Tab is disabled */
  disabled?: boolean;
  /** A list of actions which map to actions that a merchant can take with this  */
  actions?: TabActionDescriptor[];
  /** Optional array that has a list of names of currently existing views. Used to check if a view name is unique. */
  viewNames?: string[];
  /** If true, the primary button in the currently open Modal will show a loading state */
  isModalLoading?: boolean;
  /** If the Tab is currently focused */
  focused?: boolean;
  /** If a sibling Tab currently has focus */
  siblingTabHasFocus?: boolean;
  /** If the Tab is selected */
  selected?: boolean;
  /** If the Tab is currently being measured */
  measuring?: boolean;
  /** Overrides the tabIndex calculated by the Tabs component */
  tabIndexOverride?: 0 | -1;
  /** Override z-index of popovers and tooltips */
  disclosureZIndexOverride?: number;
  /** Optional callback invoked when the Tabs component is focused */
  onFocus?(): void;
}

export interface TabPropsWithAddedMethods extends TabProps {
  /** Callback to let the Tabs know that a Popover is open inside of a Tab. Used to control focus. */
  onTogglePopover: (value: boolean) => void;
  /** Callback to let the Tabs know that a Modal is open inside of a Tab. Used to control focus. */
  onToggleModal: (value: boolean) => void;
}

export interface TabMeasurements {
  containerWidth: number;
  disclosureWidth: number;
  hiddenTabWidths: number[];
}

export interface TabsState {
    disclosureWidth: number;
    tabWidths: number[];
    visibleTabs: number[];
    hiddenTabs: number[];
    containerWidth: number;
    showDisclosure: boolean;
    tabToFocus: number;
    isTabPopoverOpen: boolean;
    isTabModalOpen: boolean;
    isNewViewModalActive: boolean;
    modalSubmitted: boolean;
    isTabsFocused: boolean;
}

export interface TabsProps {
    /** The items that map to each Tab. */
    tabs: TabProps[];
    /** Content to display in tabs */
    children?: Snippet;
    /** The index of the currently selected Tab. */
    selected: number;
    /** Whether the Tabs are disabled or not. */
    disabled?: boolean;
    /** Whether to show the add new view Tab. */
    canCreateNewView?: boolean;
    /** Label for the new view Tab. Will override the default of "Create new view" */
    newViewAccessibilityLabel?: string;
    /** Fit tabs to container */
    fitted?: boolean;
    /** Text to replace disclosures horizontal dots */
    disclosureText?: string;
    /** Override z-index of popovers and tooltips */
    disclosureZIndexOverride?: number;
    /** Optional callback invoked when a Tab becomes selected. */
    onSelect?: (selectedTabIndex: number) => void;
    /** Optional callback invoked when a merchant saves a new view from the Modal */
    onCreateNewView?: (value: string) => Promise<boolean>;
}

export const CREATE_NEW_VIEW_ID = 'create-new-view';