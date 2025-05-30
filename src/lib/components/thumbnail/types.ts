import type { Component } from "svelte";

export type Size = 'extraSmall' | 'small' | 'medium' | 'large';

export interface ThumbnailProps {
  /**
   * Size of thumbnail
   * @default 'medium'
   */
  size?: Size;
  /** URL for the image */
  source: string | Component;
  /** Alt text for the thumbnail image */
  alt: string;
  /** Transparent background */
  transparent?: boolean;
}