
export interface RowContextType {
  itemId?: string;
  selected?: boolean | 'indeterminate';
  disabled?: boolean;
  position?: number;
  onInteraction?: (event: MouseEvent | KeyboardEvent) => void;
}

export const ROW_CONTEXT_KEY = 'RowContext';
export const ROW_HOVERED_CONTEXT_KEY = 'RowHoveredContext';
export const SCROLL_CONTEXT_KEY = 'ScrollContext';

export interface ScrollContextType {
  scrollableContainer: HTMLDivElement | null;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

export const scrollDefaultContext = {
  scrollableContainer: null,
  canScrollLeft: false,
  canScrollRight: false,
};
