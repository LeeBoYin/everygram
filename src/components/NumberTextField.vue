<template>
	<MdcTextField
		ref="textField"
		type="number"
		:inputmode="inputmode"
		v-bind="$attrs"
		v-on="$listeners"
	>
	</MdcTextField>
</template>

<script>
import MdcTextField from '@components/MdcTextField';
import Cleave from 'cleave.js';

export default {
	components: {
		MdcTextField,
	},
	props: {
		inputmode: {
			type: String,
			default: 'numeric', // or decimal. what about negative numbers(?)
		},
		decimalScale: {
			type: Number,
			default: 2,
		},
	},
	data() {
		return {
			cleave: null,
		};
	},
	mounted() {
		this.cleave = new Cleave(this.$refs.textField.$refs.input, {
			numeral: true,
			numeralThousandsGroupStyle: 'none',
			numeralDecimalScale: this.inputmode === 'decimal' ? this.decimalScale : 0,
			numericOnly: true,
		});
	},
};
</script>
