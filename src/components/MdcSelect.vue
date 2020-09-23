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
<!--					'material-icons material-icons-outlined': selectedOption.iconType === constant('ICON_TYPE_MATERIAL'),-->
<!--				}"-->
<!--				aria-hidden="true"-->
<!--			>-->
<!--				{{ selectedOption.iconName }}-->
<!--			</i>-->
			<span class="mdc-select__selected-text">
				{{ _.get(selectedOption, 'text', '') }}
			</span>
			<span class="mdc-select__dropdown-icon">
				<i class="material-icons-outlined text-gray-600">arrow_drop_down</i>
			</span>
			<span v-if="label" class="mdc-floating-label">{{ label }}</span>
			<span class="mdc-line-ripple"></span>
		</div>
		<MdcMenu
			class="mdc-select__menu"
			:options="options"
			:style="{ 'min-width': menuMinWidth }"
		>
			<template v-slot:menu-item="{ option }">
				<slot name="option" :option="option"></slot>
			</template>
			<template #footer>
				<slot name="menu-footer" />
			</template>
		</MdcMenu>
	</div>
</template>

<script>
import { MDCSelect } from '@material/select';
import MdcMenu from '@components/MdcMenu';
export default {
	components: {
		MdcMenu,
	},
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
			menuMinWidth: null,
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

		// set menu as wide as select dynamically
		this.menuMinWidth = `${ this.$el.clientWidth }px`;
	},
	destroyed() {
		this.mdcSelect.destroy();
	},
};
</script>
