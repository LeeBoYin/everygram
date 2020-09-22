<template>
	<label class="circle-radio">
		<input
			type="radio"
			:name="name"
			:value="radioValue"
			v-model="modelValue"
		>
		<div class="circle-radio__circle" :style="{ 'background-color': backgroundColor }">
			<slot name="icon"></slot>
			<!-- Checked 才有打勾 -->
		</div>
	</label>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true,
		},
		value: {
			type: [String, Number],
			default: null,
		},
		radioValue: {
			type: [String, Number],
			required: true,
		},
		backgroundColor: {
			type: String,
			default: null,
		},
	},
	computed: {
		modelValue: {
			get() {
				return this.value;
			},
			set() {
				// Communicate the change to parent component so that selectedValue can be updated
				this.$emit('input', this.radioValue)
			}
		}
	},
}
</script>
