export interface BaseEventProps {
    event: string;
    capture?: boolean;
    handler(event: Event): void;
    window?: Window | null;
}

export interface EventListenerProps extends BaseEventProps {
    passive?: boolean;
}