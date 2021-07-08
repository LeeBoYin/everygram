<template>
	<MdcTextField
		ref="textField"
		type="date"
		v-bind="$attrs"
		v-on="$listeners"
	/>
</template>

<script>
import MdcTextField from '@components/MdcTextField';
import Cleave from 'cleave.js';
import moment from 'moment';

export default {
	components: {
		MdcTextField,
	},
	props: {
		dateFormat: {
			type: String,
			required: true,
		},
		minDate: {
			type: String,
			default: null,
		},
		maxDate: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			cleave: null,
		};
	},
	mounted() {
		const datePattern = {
			"YYYY/MM/DD": ['Y', 'm', 'd'],
			"DD/MM/YYYY": ['d', 'm', 'Y'],
			"YYYY/MM": ['Y', 'm'],
			"MM/YYYY": ['m', 'Y'],
		}[this.dateFormat];
		if(!datePattern) {
			console.error('invalid date format');
			return;
		}
		const minMaxFormat = this.dateFormat.split('/').join('-');
		this.cleave = new Cleave(this.$refs.textField.$refs.input, {
			date: true,
			datePattern: datePattern,
			dateMin: this.minDate ? moment(this.minDate, this.dateFormat).format(minMaxFormat) : null,
			dateMax: this.maxDate ? moment(this.maxDate, this.dateFormat).format(minMaxFormat) : null,
		});
	},
};
</script>
