import type { HTMLImgAttributes } from 'svelte/elements';
interface SourceSet {
    source: string;
    descriptor?: string;
}

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

export interface ImageProps extends HTMLImgAttributes {
    alt: string;
    source: string;
    crossOrigin?: CrossOrigin;
    sourceSet?: SourceSet[];
    className?: string;
    onLoad?(): void;
    onError?(): void;
    ref?: HTMLImageElement;
}