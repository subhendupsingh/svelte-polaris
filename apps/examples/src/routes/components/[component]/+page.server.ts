import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, url }) => {
    const component = params.component;
    const type = url.searchParams.get("type") || "base";
    
    return {
        component,
        type
    }
};