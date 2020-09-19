<template>
	<li
		:class="{
			'mdc-list-item--selected': selected,
			'mdc-list-item--disabled': option.disabled,
		}"
		class="mdc-list-item"
	>
		<span class="mdc-list-item__ripple"></span>
		<i
			v-if="option.iconName"
			class="material-icons material-icons-outlined mdc-list-item__graphic"
			:class="{
							'material-icons material-icons-outlined': option.iconType === constant('ICON_TYPE_MATERIAL'),
						}" aria-hidden="true">
			{{ option.iconName }}
		</i>
		<span class="mdc-list-item__text">{{ option.text }}</span>
	</li>
</template>

<script>
import mixinRipple from '@/mixins/mixinRipple';
export default {
	mixins: [
		mixinRipple
	],
	props: {
		option: {
			type: Object,
			required: true,
		},
		selected: {
			type: Boolean,
			default: false,
		},
	},
}
</script>
