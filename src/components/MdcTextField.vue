<template>
	<label
		:class="{
			'mdc-text-field--disabled': disabled,
			'mdc-text-field--no-label': !label,
			'mdc-text-field--with-leading-icon': $slots.leadingIcon,
			'mdc-text-field--with-trailing-icon': $slots.trailingIcon,
		}"
		class="mdc-text-field mdc-text-field--filled"
	>
		<span class="mdc-text-field__ripple"></span>
		<!-- leading icon -->
		<span v-if="$slots.leadingIcon" ref="leadingIcon" class="material-icons-outlined mdc-text-field__icon mdc-text-field__icon--leading">
			<slot name="leadingIcon"></slot>
		</span>
		<!-- prefix text -->
		<span v-if="$slots.prefix" class="mdc-text-field__affix mdc-text-field__affix--prefix">
			<slot name="prefix"></slot>
		</span>
		<!-- input -->
		<input
			ref="input"
			:value="value"
			:type="type"
			:class="{ 'mdc-text-field--label-floating': !!value.length }"
			class="mdc-text-field__input"
			:placeholder="placeholder"
			:disabled="disabled"
			:required="required"
			:name="name"
			:autocomplete="autocomplete"
			@input="$emit('input', $event.target.value)"
			@change="$emit('change', $event.target.value)"
			@keypress="$emit('keypress', $event)"
		>
		<!-- suffix text -->
		<span v-if="$slots.suffix" class="mdc-text-field__affix mdc-text-field__affix--suffix">
			<slot name="suffix"></slot>
		</span>
		<!-- trailing icon -->
		<span v-if="$slots.trailingIcon" ref="trailingIcon" class="material-icons-outlined mdc-text-field__icon mdc-text-field__icon--trailing">
			<slot name="trailingIcon"></slot>
		</span>
		<!-- label -->
		<span
			:class="{ 'mdc-floating-label--float-above': !!value.length }"
			class="mdc-floating-label"
		>
			{{ label }}
		</span>
		<span class="mdc-line-ripple"></span>
	</label>
</template>

<script>
import { MDCTextField } from '@material/textfield';
import { MDCTextFieldIcon } from '@material/textfield/icon';

export default {
	props: {
		autocomplete: {
			type: String,
			default: 'on',
		},
		autofocus: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		invalid: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: null,
		},
		name: {
			type: String,
			default: null,
		},
		placeholder: {
			type: String,
			default: ' ',
		},
		required: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: 'text',
		},
		value: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			mdcTextField: null,
		};
	},
	watch: {
		invalid() {
			this.mdcTextField.valid = !this.invalid;
		},
	},
	mounted() {
		this.mdcTextField = new MDCTextField(this.$el);
		this.mdcTextField.useNativeValidation = false;
		this.mdcTextField.valid = !this.invalid;

		if(this.$refs.leadingIcon) {
			new MDCTextFieldIcon(this.$refs.leadingIcon);
		}
		if(this.$refs.trailingIcon) {
			new MDCTextFieldIcon(this.$refs.trailingIcon);
		}

		if(this.autofocus) {
			this.mdcTextField.focus();
		}
	},
	destroyed() {
		this.mdcTextField.destroy();
	},
	methods: {
		blur() {
			this.$refs.input.blur();
			this.mdcTextField.getDefaultFoundation().deactivateFocus();
		},
		focus() {
			this.mdcTextField.focus();
		},
	},
};
</script>
