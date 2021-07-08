<template>
	<component
		:is="el"
		:to="to"
		class="mdc-icon-button material-icons-outlined"
	>
		<slot></slot>
	</component>
</template>

<script>
import mixinRipple from '@/mixins/mixinRipple';
export default {
	mixins: [
		mixinRipple
	],
	props: {
		el: {
			type: String,
			default: 'button',
		},
		to: {
			// router link to
			default: null,
		},
	},
	mounted() {
		this.ripple.unbounded = true;
	},
};
</script>
