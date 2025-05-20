import type { Key } from "$utilities/types.js";

// Type definitions for keypress-listener
export interface NonMutuallyExclusiveProps {
    keyCode: Key;
    handler(event: KeyboardEvent): void;
    keyEvent?: KeyEvent;
    document?: Document;
}

export type KeypressListenerProps = NonMutuallyExclusiveProps &
    (
        | { useCapture?: boolean; options?: undefined }
        | { useCapture?: undefined; options?: AddEventListenerOptions }
    );

export type KeyEvent = 'keydown' | 'keyup';
