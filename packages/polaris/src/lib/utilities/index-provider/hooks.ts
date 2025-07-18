import { SELECT_ALL_ITEMS } from './types.js';
import type {
  BulkSelectionDataOptions,
} from './types.js';

export const INDEX_SELECTION_CHANGE_CONTEXT_KEY = 'IndexSelectionChangeContext';
export const INDEX_ROW_CONTEXT_KEY = 'IndexRowContext';
export const INDEX_CONTEXT_KEY = 'IndexContext';

export function useBulkSelectionData({
  selectedItemsCount,
  itemCount,
  hasMoreItems,
  resourceName: passedResourceName,
  defaultPaginatedSelectAllText,
}: BulkSelectionDataOptions) {
  const selectable = Boolean(selectedItemsCount);
  const selectMode = selectedItemsCount === 'All' || selectedItemsCount > 0;

  const defaultResourceName = {
    singular: "Item",
    plural: "Items",
  };

  const resourceName = passedResourceName
    ? passedResourceName
    : defaultResourceName;

  const paginatedSelectAllText = getPaginatedSelectAllText();

  const bulkActionsLabel = getBulkActionsLabel();
  const bulkActionsAccessibilityLabel = getBulkActionsAccessibilityLabel();

  let bulkSelectState: boolean | undefined = undefined;
  if (!selectedItemsCount || selectedItemsCount === 0) {
    bulkSelectState = undefined;
  } else if (
    selectedItemsCount === SELECT_ALL_ITEMS ||
    selectedItemsCount === itemCount
  ) {
    bulkSelectState = true;
  }

  return {
    paginatedSelectAllText,
    bulkActionsLabel,
    bulkActionsAccessibilityLabel,
    resourceName,
    selectMode,
    bulkSelectState,
    selectable,
  };

  function getPaginatedSelectAllText() {
    if (!selectable || !hasMoreItems) {
      return;
    }

    if (selectedItemsCount === SELECT_ALL_ITEMS) {
      if (defaultPaginatedSelectAllText) {
        return defaultPaginatedSelectAllText;
      }
      return `All ${itemCount}+ ${resourceName.plural} are selected`;
    }
  }

  function getBulkActionsLabel() {
    const selectedItemsCountLabel =
      selectedItemsCount === SELECT_ALL_ITEMS
        ? `${itemCount}+`
        : selectedItemsCount;

    return `${selectedItemsCount} selected`;
  }

  function getBulkActionsAccessibilityLabel() {
    const totalItemsCount = itemCount;
    const allSelected = selectedItemsCount === totalItemsCount;

    if (totalItemsCount === 1 && allSelected) {
      return `Deselect ${resourceName.singular}`;
    } else if (totalItemsCount === 1) {
      return `Select ${resourceName.singular}`;
    } else if (allSelected) {
      return `Deselect all ${resourceName.plural}`;
    } else {
      return `Select all ${resourceName.plural}`;
    }
  }
}