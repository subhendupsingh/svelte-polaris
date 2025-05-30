import {isElementInViewport} from './is-element-in-viewport.js';

type Filter = (element: Element) => void;
export type MouseUpBlurHandler = (
  event: Event,
) => void;

const FOCUSABLE_SELECTOR =
  'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]';
const KEYBOARD_FOCUSABLE_SELECTORS =
  'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]:not([tabindex="-1"])';
const MENUITEM_FOCUSABLE_SELECTORS =
  'a[role="menuitem"],frame[role="menuitem"],iframe[role="menuitem"],input[role="menuitem"]:not([type=hidden]):not(:disabled),select[role="menuitem"]:not(:disabled),textarea[role="menuitem"]:not(:disabled),button[role="menuitem"]:not(:disabled),*[tabindex]:not([tabindex="-1"])';
export const handleMouseUpByBlurring: MouseUpBlurHandler = ({currentTarget}) => {
  if (currentTarget instanceof HTMLElement) {
    currentTarget?.blur();
  }
};

export function nextFocusableNode(
  node: HTMLElement,
  filter?: Filter,
): HTMLElement | Element | null {
  const allFocusableElements = [
    ...document.querySelectorAll(FOCUSABLE_SELECTOR),
  ];
  const sliceLocation = allFocusableElements.indexOf(node) + 1;
  const focusableElementsAfterNode = allFocusableElements.slice(sliceLocation);

  for (const focusableElement of focusableElementsAfterNode) {
    if (
      isElementInViewport(focusableElement) &&
      (!filter || (filter && filter(focusableElement)))
    ) {
      return focusableElement;
    }
  }

  return null;
}

export function findFirstFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
): HTMLElement | null {
  if (!onlyDescendants && matches(element, FOCUSABLE_SELECTOR)) {
    return element;
  }

  return element.querySelector(FOCUSABLE_SELECTOR);
}

// Popover needs to be able to find its activator even if it is disabled, which FOCUSABLE_SELECTOR doesn't support.
export function findFirstFocusableNodeIncludingDisabled(
  element: HTMLElement,
): HTMLElement | null {
  const focusableSelector = `a,button,frame,iframe,input:not([type=hidden]),select,textarea,*[tabindex]`;

  if (matches(element, focusableSelector)) {
    return element;
  }

  return element.querySelector(focusableSelector);
}

export function focusFirstFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
) {
  findFirstFocusableNode(element, onlyDescendants)?.focus();
}

export function focusNextFocusableNode(node: HTMLElement, filter?: Filter) {
  const nextFocusable = nextFocusableNode(node, filter);
  if (nextFocusable && nextFocusable instanceof HTMLElement) {
    nextFocusable.focus();
    return true;
  }

  return false;
}

export function findFirstKeyboardFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
): HTMLElement | null {
  if (!onlyDescendants && matches(element, KEYBOARD_FOCUSABLE_SELECTORS)) {
    return element;
  }
  return element.querySelector(KEYBOARD_FOCUSABLE_SELECTORS);
}

export function focusFirstKeyboardFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
) {
  const firstFocusable = findFirstKeyboardFocusableNode(
    element,
    onlyDescendants,
  );
  if (firstFocusable) {
    firstFocusable.focus();
    return true;
  }

  return false;
}

export function findLastKeyboardFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
) {
  if (!onlyDescendants && matches(element, KEYBOARD_FOCUSABLE_SELECTORS)) {
    return element;
  }
  const allFocusable = element.querySelectorAll(KEYBOARD_FOCUSABLE_SELECTORS);
  return allFocusable[allFocusable.length - 1] as HTMLElement | null;
}

export function focusLastKeyboardFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
) {
  const lastFocusable = findLastKeyboardFocusableNode(element, onlyDescendants);
  if (lastFocusable) {
    lastFocusable.focus();
    return true;
  }

  return false;
}

export function wrapFocusPreviousFocusableMenuItem(
  parentElement: HTMLElement,
  currentFocusedElement: HTMLElement,
) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  const currentItemIdx = getCurrentFocusedElementIndex(
    allFocusableChildren,
    currentFocusedElement,
  );
  if (currentItemIdx === -1) {
    allFocusableChildren[0].focus();
  } else {
    allFocusableChildren[
      (currentItemIdx - 1 + allFocusableChildren.length) %
        allFocusableChildren.length
    ].focus();
  }
}

export function wrapFocusNextFocusableMenuItem(
  parentElement: HTMLElement,
  currentFocusedElement: HTMLElement,
) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  const currentItemIdx = getCurrentFocusedElementIndex(
    allFocusableChildren,
    currentFocusedElement,
  );
  if (currentItemIdx === -1) {
    allFocusableChildren[0].focus();
  } else {
    allFocusableChildren[
      (currentItemIdx + 1) % allFocusableChildren.length
    ].focus();
  }
}

function getMenuFocusableDescendants(
  element: HTMLElement,
): NodeListOf<HTMLElement> {
  return element.querySelectorAll(
    MENUITEM_FOCUSABLE_SELECTORS,
  ) as NodeListOf<HTMLElement>;
}

function getCurrentFocusedElementIndex(
  allFocusableChildren: NodeListOf<HTMLElement>,
  currentFocusedElement: HTMLElement,
): number {
  let currentItemIdx = 0;

  for (const focusableChild of allFocusableChildren) {
    if (focusableChild === currentFocusedElement) {
      break;
    }
    currentItemIdx++;
  }
  return currentItemIdx === allFocusableChildren.length ? -1 : currentItemIdx;
}

function matches(node: HTMLElement, selector: string) {
  if (node.matches) {
    return node.matches(selector);
  }

  const matches = (node.ownerDocument || document).querySelectorAll(selector);
  let i = matches.length;
  while (--i >= 0 && matches.item(i) !== node) return i > -1;
}