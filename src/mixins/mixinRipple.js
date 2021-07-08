import { MDCRipple } from '@material/ripple/index';
export default {
	data() {
		return {
			ripple: null,
		};
	},
	mounted() {
		this.ripple = new MDCRipple(this.$el);
	},
	destroyed() {
		this.ripple.destroy();
	},
};
