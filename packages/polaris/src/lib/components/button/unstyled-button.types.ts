import type { BaseButton } from "$utilities/types.js";
import type { Snippet } from "svelte";

export interface UnstyledButtonProps extends BaseButton {
  children?: Snippet;
  ref?: HTMLElement;
  class?: string;
  [key: string]: any;
}