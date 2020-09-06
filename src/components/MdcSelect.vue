<template>
	<div
		:class="{
			'mdc-select--required': required,
			'mdc-select--disabled': disabled,
			'mdc-select--no-label': !label,
			// 'mdc-select--with-leading-icon': _.get(selectedOption, 'iconName'),
		}"
		class="mdc-select mdc-select--filled"
	>
		<div
			class="mdc-select__anchor"
			:aria-required="required"
			:aria-disabled="disabled"
		>
			<span class="mdc-select__ripple"></span>
<!--			<i-->
<!--				v-if="_.get(selectedOption, 'iconName')"-->
<!--				class="mdc-select__icon"-->
<!--				:class="{-->
<!--					'material-icons material-icons-outlined': selectedOption.iconType === 'material',-->
<!--				}"-->
<!--				aria-hidden="true"-->
<!--			>-->
<!--				{{ selectedOption.iconName }}-->
<!--			</i>-->
			<span class="mdc-select__selected-text">{{ _.get(selectedOption, 'text', '') }}</span>
			<span class="mdc-select__dropdown-icon">
				<i class="material-icons-outlined text-gray-600">arrow_drop_down</i>
			</span>
			<span v-if="label" class="mdc-floating-label">{{ label }}</span>
			<span class="mdc-line-ripple"></span>
		</div>

		<div class="mdc-select__menu mdc-menu mdc-menu-surface">
			<ul class="mdc-list">
				<li
					v-for="option in options"
					:key="option.value"
					:data-value="option.value"
					:class="{
						'mdc-list-item--selected': option.value === value,
						'mdc-list-item--disabled': option.disabled,
					}"
					class="mdc-list-item"
				>
					<span class="mdc-list-item__ripple"></span>
					<i
						v-if="option.iconName"
						class="material-icons material-icons-outlined mdc-list-item__graphic"
						:class="{
							'material-icons material-icons-outlined': option.iconType === 'material',
						}" aria-hidden="true">
						{{ option.iconName }}
					</i>
					<span class="mdc-list-item__text">{{ option.text }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { MDCSelect } from '@material/select';

export default {
	props: {
		label: {
			type: String,
			default: null,
		},
		options: {
			type: Array,
			default: () => [],
		},
		value: {
			type: String,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		invalid: {
			type: Boolean,
			default: false,
		},
		required: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			mdcSelect: null,
		};
	},
	computed: {
		selectedOption() {
			return _.find(this.options, ['value', this.value]);
		},
	},
	mounted() {
		this.mdcSelect = new MDCSelect(this.$el);
		this.mdcSelect.listen('MDCSelect:change', () => {
			this.$emit('input', this.mdcSelect.value);
		});
	},
	destroyed() {
		this.mdcSelect.destroy();
	},
};
</script>
