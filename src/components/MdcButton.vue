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
import { MDCRipple } from '@material/ripple/index';
import MdcCircularProgress from '@components/MdcCircularProgress';
export default {
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
	data() {
		return {
			mdcButton: null,
		};
	},
	mounted() {
		this.mdcButton = new MDCRipple(this.$el);
	},
	destroyed() {
		this.mdcButton.destroy();
	},
};
</script>
