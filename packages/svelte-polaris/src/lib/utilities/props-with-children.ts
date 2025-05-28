import type { Snippet } from "svelte";

export type PropsWithChildren<P = unknown> = P & { children?: Snippet | undefined };