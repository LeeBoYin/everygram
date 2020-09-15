<template>
	<li class="mdc-list-item">
		<span class="mdc-list-item__ripple"></span>
		<span v-if="$slots.text" class="mdc-list-item__text">
			<slot name="text"></slot>
		</span>
		<span v-if="$slots.icon" class="mdc-list-item__meta material-icons material-icons-outlined" aria-hidden="true">
			<slot name="icon"></slot>
		</span>
		<slot></slot>
	</li>
</template>

<script>
import { MDCRipple } from '@material/ripple/index';
export default {
	data() {
		return {
			mdcListItem: null,
		};
	},
	mounted() {
		this.mdcListItem = new MDCRipple(this.$el);
	},
	destroyed() {
		this.mdcListItem.destroy();
	},
};
</script>
