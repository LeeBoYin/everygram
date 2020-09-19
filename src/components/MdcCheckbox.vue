<template>
	<div class="mdc-checkbox">
		<input
			ref="checkbox"
			type="checkbox"
			class="mdc-checkbox__native-control"
			:disabled="disabled"
			@change="onChange"
		/>
		<div class="mdc-checkbox__background">
			<svg
				class="mdc-checkbox__checkmark"
				viewBox="0 0 24 24"
			>
				<path
					class="mdc-checkbox__checkmark-path"
					fill="none"
					d="M1.73,12.91 8.1,19.28 22.79,4.59"
				/>
			</svg>
			<div class="mdc-checkbox__mixedmark"></div>
		</div>
		<div class="mdc-checkbox__ripple"></div>
	</div>
</template>

<script>
import { MDCCheckbox } from '@material/checkbox';
import mixinRipple from '@/mixins/mixinRipple';
export default {
	mixins: [
		mixinRipple
	],
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		indeterminate: {
			type: Boolean,
			default: false,
		},
		value: {
			type: Boolean,
			default: null,
		},
	},
	data() {
		return {
			mdcCheckBox: null,
		};
	},
	watch: {
		disabled() {
			this.mdcCheckBox.disabled = this.disabled;
		},
		indeterminate() {
			this.mdcCheckBox.indeterminate = this.indeterminate;
		},
		value() {
			this.mdcCheckBox.checked = this.value;
		},
	},
	mounted() {
		this.mdcCheckBox = new MDCCheckbox(this.$el);
		this.mdcCheckBox.indeterminate = this.indeterminate;
		this.mdcCheckBox.disabled = this.disabled;
		this.ripple.unbounded = true;
	},
	methods: {
		onChange() {
			this.$emit('input', this.$refs.checkbox.checked);
		},
	},
};
</script>
