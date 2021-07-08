<template>
	<MdcTextField
		ref="textField"
		inputmode="decimal"
		class="mdc-text-field--text-right"
		:min="0"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<template v-if="unit" #suffix>
			{{ unit }}
		</template>
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
		unitSystem: {
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
		unit() {
			switch (this.unitSystem) {
				case constant('UNIT_SYSTEM_METRIC'):
					return 'g';
				case constant('UNIT_SYSTEM_IMPERIAL'):
					return 'oz';
			}
			return null;
		},
	},
	mounted() {
		this.cleave = new Cleave(this.$refs.textField.$refs.input, {
			numeral: true,
			numeralPositiveOnly: true,
			numeralThousandsGroupStyle: 'none',
			numericOnly: true,
		});
	},
};
</script>
