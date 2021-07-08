<template>
	<component
		:is="el"
		:to="to"
		:disabled="isLoading"
		class="mdc-button"
	>
		<div class="mdc-button__ripple"></div>
		<slot name="leading-icon"></slot>
		<span class="mdc-button__label">
			<MdcCircularProgress v-if="isLoading" class="mdc-circular-progress--small" />
			<slot v-else></slot>
		</span>
		<slot name="trailing-icon"></slot>
		<div class="mdc-button__touch"></div>
	</component>
</template>

<script>
import MdcCircularProgress from '@components/MdcCircularProgress';
import mixinRipple from '@/mixins/mixinRipple';
export default {
	mixins: [
		mixinRipple
	],
	components: {
		MdcCircularProgress,
	},
	props: {
		el: {
			type: String,
			default: 'button',
		},
		to: {
			// router link to
			default: null,
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
