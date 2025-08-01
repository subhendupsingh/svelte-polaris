import type { SvelteNode } from "$utilities/types.js";
import type { LabelledProps } from "../labelled/types.js";

export type DualValue = [number, number];

export type RangeSliderValue = number | DualValue;

export interface RangeSliderProps {
  /** Label for the range input */
  label: string;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** ID for range input */
  id?: string;
  /** Initial value for range input */
  value: RangeSliderValue;
  /** Minimum possible value for range input */
  min?: number;
  /** Maximum possible value for range input */
  max?: number;
  /** Increment value for range input changes */
  step?: number;
  /** Provide a tooltip while sliding, indicating the current value */
  output?: boolean;
  /** Additional text to aid in use */
  helpText?: string;
  /** Display an error message */
  error?: string;
  /** Disable input */
  disabled?: boolean;
  /** Element to display before the input */
  prefix?: SvelteNode;
  /** Element to display after the input */
  suffix?: SvelteNode;
  /** Callback when the range input is changed */
  onChange(value: RangeSliderValue, id: string): void;
  /** Callback when range input is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}