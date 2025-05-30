import { browser } from "$app/environment";
import { getMediaConditions, themeDefault, type BreakpointsAlias, type BreakpointsAliasDirection, type BreakpointsTokenGroup } from "@shopify/polaris-tokens";

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

function noop() { }

export function navigationBarCollapsed() {
  return !browser
    ? noWindowMatches
    : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
}

export function stackedContent() {
  return !browser
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

const hookCallbacks = new Set<
  (breakpointAlias: BreakpointsDirectionAlias, matches: boolean) => void
>();

const breakpointsQueryEntries = getBreakpointsQueryEntries(
  themeDefault.breakpoints,
);

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

function getDefaultMatches(defaults?: UseBreakpointsOptions['defaults']) {
  return Object.fromEntries(
    breakpointsQueryEntries.map(([directionAlias]) => [
      directionAlias,
      typeof defaults === 'boolean'
        ? defaults
        : defaults?.[directionAlias] ?? false,
    ]),
  ) as BreakpointsMatches;
}

function getLiveMatches() {
  return Object.fromEntries(
    breakpointsQueryEntries.map(([directionAlias, query]) => [
      directionAlias,
      window.matchMedia(query).matches,
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

export class UseBreakpoints {
  breakpoints = $state<BreakpointsMatches>();
  options?: UseBreakpointsOptions;

  constructor(options?: UseBreakpointsOptions) {
    this.options = options;
    this.breakpoints = getDefaultMatches(options?.defaults);
    this.startTracking();
    this.registerCallbacks();
  }

  registerCallbacks() {
    if (browser) {
      breakpointsQueryEntries.forEach(([breakpointAlias, query]) => {
        const eventListener = (event: { matches: boolean }) => {
          for (const hookCallback of hookCallbacks) {
            hookCallback(breakpointAlias, event.matches);
          }
        };
        const mql = window.matchMedia(query);
        if (mql.addListener) {
          mql.addListener(eventListener);
        } else {
          mql.addEventListener('change', eventListener);
        }
      });
    }
  }

  startTracking() {
    $effect(() => {
      this.breakpoints = getLiveMatches();
      const callback = (
        breakpointAlias: BreakpointsDirectionAlias,
        matches: boolean,
      ) => {
        // @ts-ignore
        this.breakpoints = {
          ...(this.breakpoints ?? {}),
          [breakpointAlias]: matches,
        }
      };

      hookCallbacks.add(callback);
      return () => {
        hookCallbacks.delete(callback);
      }
    })
  }

  getCurrentBreakpoints() {
    return this.breakpoints;
  }
}

export function useBreakpoints(options?: UseBreakpointsOptions) {
  return new UseBreakpoints(options);
}
