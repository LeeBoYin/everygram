<template>
	<button class="mdc-fab">
		<div class="mdc-fab__ripple"></div>
		<span v-if="icon" class="material-icons-outlined mdc-fab__icon">{{ icon }}</span>
		<span v-if="label" class="mdc-fab__label">{{ label }}</span>
	</button>
</template>

<script>

import mixinRipple from '@/mixins/mixinRipple';
export default {
	mixins: [
		mixinRipple
	],
	props: {
		icon: {
			type: String,
			default: null,
		},
		label: {
			type: String,
			default: null,
		},
	},
};
</script>
