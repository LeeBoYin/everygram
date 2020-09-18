<template>
	<div class="mdc-menu mdc-menu-surface">
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
							'material-icons material-icons-outlined': option.iconType === constant('ICON_TYPE_MATERIAL'),
						}" aria-hidden="true">
					{{ option.iconName }}
				</i>
				<span class="mdc-list-item__text">{{ option.text }}</span>
			</li>
		</ul>
		<div v-if="$slots.footer" class="mdc-menu__footer">
			<slot name="footer" />
		</div>
	</div>
</template>

<script>
import { MDCMenu } from '@material/menu';
export default {
	props: {
		options: {
			type: Array,
			default: () => [],
		},
		value: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			mdcMenu: null,
		};
	},
	mounted() {
		this.mdcMenu = new MDCMenu(this.$el);
	},
	destroyed() {
		this.mdcMenu.destroy();
	},
}
</script>
