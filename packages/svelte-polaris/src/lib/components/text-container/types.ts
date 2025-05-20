// Type definitions for text-container

import type { Snippet } from "svelte";

export type Spacing = 'tight' | 'loose';

export interface TextContainerProps {
  /** The amount of vertical spacing children will get between them */
  spacing?: Spacing;
  /** The content to render in the text container. */
  children?: Snippet;
}