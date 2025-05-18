import type { Snippet } from "svelte";

export interface ConnectedProps {
    /** Content to display on the left */
    left?: Snippet;
    /** Content to display on the right */
    right?: Snippet;
    /** Connected content */
    children?: Snippet;
}

export type ItemPosition = 'left' | 'right' | 'primary';

export interface ItemProps {
  /** Position of the item */
  position: ItemPosition;
  /** Item content */
  children?: Snippet;
}