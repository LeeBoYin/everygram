<template>
	<div class="mdc-menu mdc-menu-surface">
		<ul class="mdc-list">
			<slot
				name="menu-item"
				v-for="(option, index) in options"
				:option="option"
			>
				<!-- slot default menu-item -->
				<MdcMenuItem
					:key="option.value || index"
					:data-value="option.value"
					:option="option"
				/>
			</slot>
		</ul>
		<div v-if="$slots.footer" class="mdc-menu__footer">
			<slot name="footer" />
		</div>
	</div>
</template>

<script>
import { MDCMenu } from '@material/menu';
import MdcMenuItem from '@components/MdcMenuItem';
export default {
	components: {
		MdcMenuItem,
	},
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
		this.mdcMenu.setFixedPosition(true);
	},
	destroyed() {
		this.mdcMenu.destroy();
	},
	methods: {
		open() {
			this.mdcMenu.open = true;
		},
	},
}
</script>
