<template>
	<MdcTextField
		ref="textField"
		type="text"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<template v-if="symbol" #prefix>
			{{ symbol }}
		</template>
	</MdcTextField>
</template>

<script>
import MdcTextField from '@components/MdcTextField';
import Cleave from 'cleave.js';
import settingsConfig from '@/settingsConfig';

export default {
	components: {
		MdcTextField,
	},
	props: {
		currency: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			cleave: null,
		};
	},
	computed: {
		symbol() {
			return _.get(settingsConfig, ['currency', this.currency, 'symbol']);
		},
	},
	mounted() {
		this.cleave = new Cleave(this.$refs.textField.$refs.input, {
			numeral: true,
			numeralPositiveOnly: true,
		});
	},
};
</script>
