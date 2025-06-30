<script lang="ts">
	import { FEATURES_CONTEXT_KEY, type FeaturesConfig } from '$lib/components/app-provider/types.js';
	import { useContext } from '$utilities/contexts.js';
	import type { DualValue } from '../../types.js';
	import type { DualThumbProps, State } from './types.js';

	let { state, ...props }: DualThumbProps & { state: State } = $props();
	const contextTypeProvider = useContext<FeaturesConfig>(FEATURES_CONTEXT_KEY);
	const contextType = $derived(contextTypeProvider?.() ?? {});
	let { min, step, max, value, onChange, id } = $derived(props);
	const { prevValue } = $derived(state);

	// eslint-disable-next-line id-length
	function isTupleEqual(a?: DualValue, b?: DualValue) {
		if (a == null || b == null) {
			return false;
		}

		return a[0] === b[0] && a[1] === b[1];
	}
</script>
