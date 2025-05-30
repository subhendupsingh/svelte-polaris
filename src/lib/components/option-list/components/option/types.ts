import type { AvatarProps } from "$lib/components/avatar/types.js";
import type { IconProps } from "$lib/components/icon/types.js";
import type { Component, Snippet } from "svelte";
import type { ThumbnailProps } from "$lib/components/thumbnail/types.js";
import type { VueNode } from "$utilities/types.js";

export type Alignment = 'top' | 'center' | 'bottom';

export interface OptionProps {
  id: string;
  label: string | Snippet;
  value: string;
  section: number;
  index: number;
  media?: VueNode;
  disabled?: boolean;
  active?: boolean;
  select?: boolean;
  allowMultiple?: boolean;
  verticalAlign?: Alignment;
  onClick(section: number, option: number): void;
  /** Callback when pointer enters the option */
  onPointerEnter(section: number, option: number): void;
  /** Callback when option is focused */
  onFocus(section: number, option: number): void;
}