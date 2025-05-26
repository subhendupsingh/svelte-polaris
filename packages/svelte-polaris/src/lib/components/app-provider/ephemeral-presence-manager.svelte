<script lang="ts">
	import { setContext } from 'svelte';
	import type { EphemeralPresenceKey, EphemeralPresenceManagerContextType } from './types.js';
	import { EPHEMERAL_PRESENCE_MANAGER_CONTEXT_KEY } from './types.js';
	import type { Snippet } from 'svelte';

	interface EphemeralPresenceManagerProps {
		children?: Snippet;
	}

	let { children }: EphemeralPresenceManagerProps = $props();

	type PresenceList = {
		[key in EphemeralPresenceKey]: boolean;
	};

	type PresenceCounter = {
		[key in EphemeralPresenceKey]: number;
	};

	const defaultState = {
		tooltip: 0,
		hovercard: 0
	};

	let presenceCounter = $state<PresenceCounter>(defaultState);

	const addPresence: EphemeralPresenceManagerContextType['addPresence'] = (key) => {
		presenceCounter = {
			...presenceCounter,
			[key]: presenceCounter[key] + 1
		};
	};

	const removePresence: EphemeralPresenceManagerContextType['removePresence'] = (key) => {
		presenceCounter = {
			...presenceCounter,
			[key]: presenceCounter[key] - 1
		};
	};

	const value = $derived.by(() => {
		const presenceList = Object.keys(presenceCounter).reduce((previousValue, currentValue) => {
			const [key, value] = currentValue;
			return {
				...previousValue,
				[key]: Number(value) >= 1
			};
		}, {} as PresenceList);

		return {
			presenceList,
			presenceCounter,
			addPresence,
			removePresence
		};
	});

	setContext(
		EPHEMERAL_PRESENCE_MANAGER_CONTEXT_KEY,
		() => value
	);

	$effect(() => {
		//console.log('Setting ephemeral presence manager context', value);
		setContext(
			EPHEMERAL_PRESENCE_MANAGER_CONTEXT_KEY,
			() => value
		);
	});
</script>

{@render children?.()}
