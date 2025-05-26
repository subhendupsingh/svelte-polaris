export enum SelectionType {
  All = 'all',
  Page = 'page',
  Multi = 'multi',
  Single = 'single',
  Range = 'range',
}

export type Range = [number, number];

export type ResourceIDResolver<T extends {[key: string]: unknown}> = (
  resource: T,
) => string;

function defaultResourceIDResolver(resource: {[key: string]: any}): string {
  if ('id' in resource) {
    return resource.id;
  }

  throw new Error(
    'Your resource does not directly contain an `id`. Pass a `resourceIDResolver` to `useIndexResourceState`',
  );
}

export class IndexResourceState<T extends { [key: string]: unknown }> {
    private readonly initialResources: ReadonlyArray<T>;
    private readonly resourceIDResolver: ResourceIDResolver<T>;
    private readonly resourceFilter?: (value: T, index: number, array: ReadonlyArray<T>) => boolean;
  
    selectedResources = $state<string[]>([]);
    allResourcesSelected = $state<boolean>(false);
  
    constructor(
      initialResources: ReadonlyArray<T>,
      options: {
        selectedResources?: string[];
        allResourcesSelected?: boolean;
        resourceIDResolver?: ResourceIDResolver<T>;
        resourceFilter?: (value: T, index: number, array: ReadonlyArray<T>) => boolean;
      } = {},
    ) {
      this.initialResources = initialResources;
  
      const {
        selectedResources: initSelectedResources = [],
        allResourcesSelected: initAllResourcesSelected = false,
        resourceIDResolver = defaultResourceIDResolver as ResourceIDResolver<T>, // Cast if defaultResolver is not generic enough
        resourceFilter,
      } = options;
  
      // Initialize $state fields by assigning to them
      // Svelte 5 handles this initialization for $state fields within the constructor or as field initializers
      this.selectedResources = initSelectedResources;
      this.allResourcesSelected = initAllResourcesSelected;
  
      this.resourceIDResolver = resourceIDResolver;
      this.resourceFilter = resourceFilter;
    }
  
    handleSelectionChange = (
      selectionType: SelectionType,
      isSelecting: boolean,
      selection?: string | Range,
      // _position is unused
    ) => {
      if (selectionType === SelectionType.All) {
        this.allResourcesSelected = isSelecting;
      } else if (this.allResourcesSelected) {
        this.allResourcesSelected = false;
      }
  
      const currentSelected = this.selectedResources; // Access reactive state
  
      switch (selectionType) {
        case SelectionType.Single:
          if (typeof selection === 'string') {
            if (isSelecting) {
              if (!currentSelected.includes(selection)) {
                this.selectedResources = [...currentSelected, selection];
              }
            } else {
              this.selectedResources = currentSelected.filter((id) => id !== selection);
            }
          }
          break;
  
        case SelectionType.All:
        case SelectionType.Page:
          {
            const targetResources = this.resourceFilter
              ? this.initialResources.filter(this.resourceFilter)
              : this.initialResources;
            this.selectedResources = isSelecting
              ? targetResources.map(this.resourceIDResolver)
              : [];
          }
          break;
  
        case SelectionType.Multi:
          if (!selection || !Array.isArray(selection)) break;
          {
            const range = selection as Range;
            const idsToConsider: string[] = [];
  
            for (let i = range[0]; i <= range[1]; i++) {
              const resource = this.initialResources[i];
              if (resource) {
                if (this.resourceFilter && !this.resourceFilter(resource, i, this.initialResources)) {
                  continue;
                }
                idsToConsider.push(this.resourceIDResolver(resource));
              }
            }
  
            if (isSelecting) {
              const newIdsToAdd = idsToConsider.filter(id => !currentSelected.includes(id));
              this.selectedResources = [...currentSelected, ...newIdsToAdd];
            } else {
              this.selectedResources = currentSelected.filter(id => !idsToConsider.includes(id));
            }
          }
          break;
  
        case SelectionType.Range:
          if (!selection || !Array.isArray(selection)) break;
          {
            const targetResources = this.resourceFilter
              ? this.initialResources.filter(this.resourceFilter)
              : this.initialResources;
            
            const rangeIndices = selection as Range;
            const startIndex = Math.max(0, Number(rangeIndices[0]));
            const endIndex = Math.min(targetResources.length - 1, Number(rangeIndices[1]));
  
            const idsInRange: string[] = [];
            if (startIndex <= endIndex) {
              for (let i = startIndex; i <= endIndex; i++) {
                if (targetResources[i]) {
                  idsInRange.push(this.resourceIDResolver(targetResources[i]));
                }
              }
            }
            
            const isAnyInRangeSelected = idsInRange.some(id => currentSelected.includes(id));
            const areAllInRangeSelected = idsInRange.length > 0 && idsInRange.every(id => currentSelected.includes(id));
  
            if (isSelecting) {
               const newSelected = new Set([...currentSelected, ...idsInRange]);
               this.selectedResources = Array.from(newSelected);
            } else {
              if (areAllInRangeSelected || isAnyInRangeSelected) {
                  this.selectedResources = currentSelected.filter(id => !idsInRange.includes(id));
              }
            }
          }
          break;
      }
    };
  
    clearSelection = () => {
      this.selectedResources = [];
      this.allResourcesSelected = false;
    };
  
    removeSelectedResources = (removeResourceIds: string[]) => {
      this.selectedResources = this.selectedResources.filter(
        (id) => !removeResourceIds.includes(id),
      );
      if (this.allResourcesSelected && this.selectedResources.length < this.initialResources.filter(this.resourceFilter || (() => true)).length) {
        this.allResourcesSelected = false;
      }
    };
  }

/* export function useIndexResourceState<T extends {[key: string]: unknown}>(
  resources: T[],
  {
    selectedResources: initSelectedResources = [],
    allResourcesSelected: initAllResourcesSelected = false,
    resourceIDResolver = defaultResourceIDResolver,
    resourceFilter = undefined,
  }: {
    selectedResources?: string[];
    allResourcesSelected?: boolean;
    resourceIDResolver?: ResourceIDResolver<T>;
    resourceFilter?: (value: T, index: number) => boolean;
  } = {
    selectedResources: [],
    allResourcesSelected: false,
    resourceIDResolver: defaultResourceIDResolver,
    resourceFilter: undefined,
  },
) {
  
    let selectedResources = $state(initSelectedResources);
    let allResourcesSelected = $state(initAllResourcesSelected);

  const handleSelectionChange = (selectionType: SelectionType,
      isSelecting: boolean,
      selection?: string | Range,
      // This is not used in the function, but needed to keep the type compatible with IndexProviderProps onSelectionChange
      _position?: number,
    ) => {
      if (selectionType === SelectionType.All) {
        allResourcesSelected = isSelecting;
      } else if (allResourcesSelected) {
        allResourcesSelected = false;
      }

      switch (selectionType) {
        case SelectionType.Single:
          selectedResources =
            isSelecting
              ? [...selectedResources, selection as string]
              : selectedResources.filter((id) => id !== selection);
          break;
        case SelectionType.All:
        case SelectionType.Page:
          if (resourceFilter) {
            const filteredResources = resources.filter(resourceFilter);
            selectedResources =
              isSelecting && selectedResources.length < filteredResources.length
                ? filteredResources.map(resourceIDResolver)
                : [];
          } else {
            selectedResources =
              isSelecting ? resources.map(resourceIDResolver) : [];
          }

          break;
        case SelectionType.Multi:
          if (!selection) break;
          selectedResources = () => {
            const ids: string[] = [];
            const filteredResources = resourceFilter
              ? resources.filter(resourceFilter)
              : resources;
            for (
              let i = selection[0] as number;
              i <= (selection[1] as number);
              i++
            ) {
              if (filteredResources.includes(resources[i])) {
                const id = resourceIDResolver(resources[i]);

                if (
                  (isSelecting && !selectedResources.includes(id)) ||
                  (!isSelecting && selectedResources.includes(id))
                ) {
                  ids.push(id);
                }
              }
            }

            return isSelecting
              ? [...selectedResources, ...ids]
              : selectedResources.filter((id) => !ids.includes(id));
          };

          break;
        case SelectionType.Range:
          if (!selection) break;

          setSelectedResources((currentSelectedResources) => {
            const filteredResources = resourceFilter
              ? resources.filter(resourceFilter)
              : resources;

            const resourceIds = filteredResources.map(resourceIDResolver);

            const selectedIds = resourceIds.slice(
              Number(selection[0]),
              Number(selection[1]) + 1,
            );

            const isIndeterminate = selectedIds.some((id) => {
              return selectedResources.includes(id);
            });

            const isChecked = selectedIds.every((id) => {
              return selectedResources.includes(id);
            });

            const isSelectingAllInRange =
              !isChecked && (isSelecting || isIndeterminate);

            const nextSelectedResources = isSelectingAllInRange
              ? [
                  ...new Set([
                    ...currentSelectedResources,
                    ...selectedIds,
                  ]).values(),
                ]
              : currentSelectedResources.filter(
                  (id) => !selectedIds.includes(id),
                );

            return nextSelectedResources;
          });
          break;
      }
    };

  const clearSelection = () => {
    setSelectedResources([]);
    allResourcesSelected = false);
  };

  const removeSelectedResources = (removeResources: string[]) => {
      const selectedResourcesCopy = [...selectedResources];

      const newSelectedResources = selectedResourcesCopy.filter(
        (resource) => !removeResources.includes(resource),
      );

      setSelectedResources(newSelectedResources);

      if (newSelectedResources.length === 0) {
        allResourcesSelected = false);
      }
    };

  return {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
    removeSelectedResources,
  };
} */
