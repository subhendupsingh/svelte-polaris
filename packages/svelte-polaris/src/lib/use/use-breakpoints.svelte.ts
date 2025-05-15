import { browser } from '$app/environment';
import {getMediaConditions, themeDefault} from '@shopify/polaris-tokens';
import type {
  BreakpointsAlias,
  BreakpointsAliasDirection,
  BreakpointsTokenGroup,
} from '@shopify/polaris-tokens';
import { onDestroy } from 'svelte';

const Breakpoints = {
  // TODO: Update to smDown
  navigationBarCollapsed: '767.95px',
  // TODO: Update to lgDown
  stackedContent: '1039.95px',
};

const noWindowMatches: MediaQueryList = {
  media: '',
  addListener: noop,
  removeListener: noop,
  matches: false,
  onchange: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: (_: Event) => true,
};

function noop() {}

export function navigationBarCollapsed() {
  return typeof window === 'undefined'
    ? noWindowMatches
    : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
}

export function stackedContent() {
  return typeof window === 'undefined'
    ? noWindowMatches
    : window.matchMedia(`(max-width: ${Breakpoints.stackedContent})`);
}

/**
 * Directional alias for each Polaris `breakpoints` token.
 *
 * @example 'smUp' | 'smDown' | 'smOnly' | 'mdUp' | etc.
 */
export type BreakpointsDirectionAlias =
  `${BreakpointsAlias}${Capitalize<BreakpointsAliasDirection>}`;

/**
 * Match results for each directional Polaris `breakpoints` alias.
 */
type BreakpointsMatches = {
  [DirectionAlias in BreakpointsDirectionAlias]: boolean;
};

const breakpointsQueryEntries = getBreakpointsQueryEntries(
  themeDefault.breakpoints,
);

function getMatches(
  defaults?: UseBreakpointsOptions['defaults'],
  /**
   * Used to force defaults on initial client side render so they match SSR
   * values and hence avoid a Hydration error.
   */
  forceDefaults?: boolean,
) {
  const isServer = typeof window === 'undefined' || typeof document === 'undefined';

  if (!isServer && !forceDefaults) {
    return Object.fromEntries(
      breakpointsQueryEntries.map(([directionAlias, query]) => [
        directionAlias,
        window.matchMedia(query).matches,
      ]),
    ) as BreakpointsMatches;
  }

  if (typeof defaults === 'object' && defaults !== null) {
    return Object.fromEntries(
      breakpointsQueryEntries.map(([directionAlias]) => [
        directionAlias,
        defaults[directionAlias] ?? false,
      ]),
    ) as BreakpointsMatches;
  }

  return Object.fromEntries(
    breakpointsQueryEntries.map(([directionAlias]) => [
      directionAlias,
      defaults ?? false,
    ]),
  ) as BreakpointsMatches;
}

export interface UseBreakpointsOptions {
  /**
   * Default values applied during SSR. Accepts a single value to use for each
   * breakpoint alias, or an object for configuring select breakpoints.
   *
   * @default false
   */
  defaults:
    | boolean
    | {
        [DirectionAlias in BreakpointsDirectionAlias]?: boolean;
      };
}

/**
 * Retrieves media query matches for each directional Polaris `breakpoints` alias.
 *
 * @example
 * const {smUp} = useBreakpoints();
 * return smUp && 'Hello world';
 *
 * @example
 * const {mdUp} = useBreakpoints({defaults: {mdUp: true}});
 * mdUp //=> `true` during SSR
 *
 * @example
 * const breakpoints = useBreakpoints({defaults: true});
 * breakpoints //=> All values will be `true` during SSR
 */
export function useBreakpoints(options?: UseBreakpointsOptions) {
  // On SSR, and initial CSR, we force usage of the defaults to avoid a
  // hydration mismatch error.
  // Later, in the effect, we will call this again on the client side without
  // any defaults to trigger a more accurate client side evaluation.
  let breakpoints = $state<BreakpointsMatches>(getMatches(options?.defaults, true));

  const setBreakpoints = (value: BreakpointsMatches) => {
    breakpoints = value;
  };

  // useIsomorphicLayoutEffect - setup
  const mediaQueryLists = breakpointsQueryEntries.map(([_, query]) => browser ? window.matchMedia(query) : null,
  );

  const handler = () => setBreakpoints(getMatches());

  mediaQueryLists.forEach((mql) => {
    if (mql?.addListener) {
      mql?.addListener(handler);
    } else {
      mql?.addEventListener('change', handler);
    }
  });

  // Trigger the breakpoint recalculation at least once client-side to ensure
  // we don't have stale default values from SSR.
  handler();

  // useIsomorphicLayoutEffect - teardown
  onDestroy(() => {
    mediaQueryLists.forEach((mql) => {
      if (mql?.removeListener) {
        mql?.removeListener(handler);
      } else {
        mql?.removeEventListener('change', handler);
      }
    });
  });

  return breakpoints;
}

/**
 * Converts `breakpoints` tokens into directional media query entries.
 *
 * @example
 * const breakpointsQueryEntries = getBreakpointsQueryEntries(breakpoints);
 * breakpointsQueryEntries === [
 *   ['xsUp', '(min-width: ...)'],
 *   ['xsDown', '(max-width: ...)'],
 *   ['xsOnly', '(min-width: ...) and (max-width: ...)'],
 *   ['smUp', '(min-width: ...) and (max-width: ...)'],
 *   ['mdUp', '(min-width: ...) and (max-width: ...)'],
 *   // etc.
 * ]
 */
export function getBreakpointsQueryEntries(breakpoints: BreakpointsTokenGroup) {
  const mediaConditionEntries = Object.entries(getMediaConditions(breakpoints));

  return mediaConditionEntries
    .map(([breakpointsToken, mediaConditions]) =>
      Object.entries(mediaConditions).map(([direction, mediaCondition]) => {
        const breakpointsAlias = breakpointsToken.split('-')[1];

        // e.g. smUp, smDown, smOnly, etc.
        const directionAlias = `${breakpointsAlias}${capitalize(direction)}`;

        return [directionAlias, mediaCondition];
      }),
    )
    .flat() as [BreakpointsDirectionAlias, string][];
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}