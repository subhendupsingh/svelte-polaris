import type { ResponsiveProp } from "$utilities/css.js";
import type { SpaceScale } from "@shopify/polaris-tokens";
import type { Snippet } from "svelte";

export type ColumnsAlias = 'oneThird' | 'oneHalf' | 'twoThirds';
export type ColumnsType = number | string | ColumnsAlias[];
export type Columns = ResponsiveProp<ColumnsType>;
export type Gap = ResponsiveProp<SpaceScale>;
export type InlineGridAlignItems = 'start' | 'end' | 'center';

export interface InlineGridProps {
  children?: Snippet;
  /** The number of columns to display. Accepts either a single value or an object of values for different screen sizes.
   * @example
   * columns={6}
   * columns={{xs: 1, sm: 2, md: 3, lg: 4, xl: 6}}
   */
  columns?: Columns;
  /** The spacing between children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * gap='200'
   * gap={{xs: '100', sm: '200', md: '300', lg: '400', xl: '500'}}
   */
  gap?: Gap;
  /** Vertical alignment of children. If not set, inline elements will stretch to the height of the parent.
   * @example
   * alignItems='start'
   */
  alignItems?: InlineGridAlignItems;
}