import type { Target } from "$utilities/types.js";
import type { Component, Snippet } from "svelte";

export interface LinkLikeComponentProps {
  /** The url to link to */
  url: string;
  /**	The content to display inside the link */
  children?: Snippet;
  /** Makes the link open in a new tab */
  external?: boolean;
  /** Where to display the url */
  target?: Target;
  /** Makes the browser download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value. */
  download?: string | boolean;
  [key: string]: any;
}

export type LinkLikeComponent = Component<LinkLikeComponentProps>;
