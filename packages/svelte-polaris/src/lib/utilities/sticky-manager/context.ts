import { setContext } from "svelte";
import type {StickyManager} from './sticky-manager.js';

export const STICKY_MANAGER_CONTEXT_KEY = Symbol('StickyManagerContext');

//export const StickyManagerContext = setContext<StickyManager | undefined>(STICKY_MANAGER_CONTEXT_KEY, undefined);