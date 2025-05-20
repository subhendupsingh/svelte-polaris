import { getContext } from 'svelte';
import { MEDIA_QUERY_CONTEXT_KEY, type MediaQueryState } from '../components/app-provider/types.js';

export function useMediaQuery(): MediaQueryState {
    const mediaQuery = getContext<MediaQueryState | undefined>(MEDIA_QUERY_CONTEXT_KEY);

    if (!mediaQuery) {
        throw new Error(
            'No mediaQuery context was provided. Your application must be wrapped in a <MediaQueryProvider> component. See Svelte documentation for context API usage.'
        );
    }

    return mediaQuery;
}