import type { Snippet } from "svelte";

export type Type = 'bullet' | 'number';

export type Spacing = 'extraTight' | 'loose';

export interface ListProps {
  /**
   * Determines the space between list items
   * @default 'loose'
   */
  gap?: Spacing;
  /**
   * Type of list to display
   * @default 'bullet'
   */
  type?: Type;
  /** List item elements */
  children?: Snippet;
}