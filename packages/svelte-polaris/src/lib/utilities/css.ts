import type { BreakpointsAlias } from '@shopify/polaris-tokens';
import { breakpointsAliases } from '@shopify/polaris-tokens';

import { isObject } from '$utilities/is-object.js';

type Falsy = boolean | undefined | null | 0;

type ResponsivePropConfig<T = string> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T> = T | ResponsivePropConfig<T>;

export type ResponsiveValue<T = string> = undefined | ResponsiveProp<T>;

type ResponsiveVariables<T> = {
  [Breakpoint in `${string}-${BreakpointsAlias}`]?: T;
};

export function classNames(...classes: (string | Falsy)[]) {
  return classes.filter(Boolean).join(' ');
}

export function variationName(name: string, value: string) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export const isFalsyString = (value: string | undefined) => value != null && value !== '' && value != undefined;

export function sanitizeCustomProperties(
  styles: Record<string, string | number | undefined | null>,
): Record<string, string> {
  const nonNullValues: [string, string][] = Object.entries(styles).filter(
    ([_, value]) => value != null && value !== '' && value != undefined,
  ) as [string, string][];

  return nonNullValues.length ? Object.fromEntries(nonNullValues) : {};
}

/**
 * Given params like so:
 * (
 *   'button',
 *   'padding',
 *   'spacing',
 *   {
 *     sm: "4",
 *     lg: "6"
 *   }
 * )
 * Converts it to an object like so:
 * {
 *   '--pc-button-padding-sm': 'var(--p-spacing-4)',
 *   '--pc-button-padding-lg': 'var(--p-spacing-6)'
 * }
 *
 */
export function getResponsiveProps<T = string>(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?: ResponsiveProp<T>,
): ResponsiveVariables<T> {
  if (!responsiveProp) return {};

  let result: ResponsivePropConfig;

  if (!isObject(responsiveProp)) {
    result = {
      [breakpointsAliases[0]]: `var(--p-${tokenSubgroup}-${responsiveProp})`,
    };
  } else {
    result = Object.fromEntries(
      Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [
        breakpointAlias,
        `var(--p-${tokenSubgroup}-${aliasOrScale})`,
      ]),
    );
  }

  // Prefix each responsive key with the correct token name
  return Object.fromEntries(
    Object.entries(result).map(([breakpointAlias, value]) => [
      `--pc-${componentName}-${componentProp}-${breakpointAlias}`,
      value,
    ]),
  ) as unknown as ResponsiveVariables<T>;
}

export function getResponsiveValue<T = string>(
  componentName: string,
  componentProp: string,
  responsiveProp?: ResponsiveValue<T>,
): ResponsiveVariables<T> {
  if (!responsiveProp) return {};

  if (!isObject(responsiveProp)) {
    return {
      [`--pc-${componentName}-${componentProp}-${breakpointsAliases[0]}`]:
        responsiveProp,
    } as ResponsiveVariables<T>;
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, responsiveValue]) => [
      `--pc-${componentName}-${componentProp}-${breakpointAlias}`,
      responsiveValue,
    ]),
  );
}

export function createStyleString(styleObject: Record<string, string>) {
  let styleString = '';
  for (const property in styleObject) {
    if (Object.prototype.hasOwnProperty.call(styleObject, property)) {
      // For CSS custom properties (which start with '--'),
      // they are directly used as property names in the style string.
      styleString += `${property}: ${styleObject[property]}; `;
    }
  }
  return styleString.trim(); // Trim any trailing space
}

export function mapResponsiveProp(
  responsiveProp: ResponsiveProp<boolean>,
  callback: (value: boolean) => string,
): ResponsiveProp<string> {
  if (typeof responsiveProp === 'boolean') {
    return callback(responsiveProp);
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointsAlias, value]) => [
      breakpointsAlias,
      callback(value),
    ]),
  );
}

export function applyStyles(styles: Record<string, string | number | undefined>): string {
    return createStyleString(sanitizeCustomProperties(styles));
}