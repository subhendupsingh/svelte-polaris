import type { OptionDescriptor, SectionDescriptor } from "$utilities/types.js";

type Alignment = 'top' | 'center' | 'bottom';

export interface OptionListProps {
  /** A unique identifier for the option list */
  id?: string;
  /** List title */
  title?: string;
  /** Collection of options to be listed */
  options?: OptionDescriptor[];
  /** Defines a specific role attribute for the list itself */
  role?: 'listbox' | 'combobox' | string;
  /** Sections containing a header and related options */
  sections?: SectionDescriptor[];
  /** The selected options */
  selected: string[];
  /** Allow more than one option to be selected */
  allowMultiple?: boolean;
  /** Vertically align child content to the center, top, or bottom.  */
  verticalAlign?: Alignment;
  /** Callback when selection is changed */
  onChange(selected: string[]): void;
  /** Callback when pointer enters an option */
  onPointerEnterOption?(selected: string): void;
  /** Callback when focusing an option */
  onFocusOption?(selected: string): void;
}
