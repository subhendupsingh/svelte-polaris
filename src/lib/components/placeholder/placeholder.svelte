<script lang="ts">
	import { applyStyles } from '$utilities/css.js';

	let { height = 'auto', width = 'auto', showBorder = false } = $props();
</script>

<div
	style={applyStyles({
		background: 'var(--p-color-text-info)',
		height: height,
		width: width,
		borderInlineStart: showBorder ? '1px dashed var(--p-color-bg-surface-success)' : 'none'
	})}
></div>
