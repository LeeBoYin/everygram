<template>
	<header class="mdc-top-app-bar mdc-top-app-bar--fixed">
		<div class="mdc-top-app-bar__row">
			<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
				<button
					v-if="navigationIcon"
					class="material-icons-outlined mdc-top-app-bar__navigation-icon mdc-icon-button"
					@click="$emit('click:navigation')"
				>{{ navigationIcon }}</button>
				<span v-if="title" class="mdc-top-app-bar__title">{{ title }}</span>
			</section>
			<section v-if="actionItems" class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
				<button
					v-for="actionItem in actionItems"
					:key="actionItem.icon"
					class="material-icons-outlined mdc-top-app-bar__action-item mdc-icon-button"
					:aria-label="actionItem.name"
					@click="$emit(`click:${ actionItem.name }`)"
				>{{ actionItem.icon }}</button>
			</section>
		</div>
	</header>
</template>

<script>
import { MDCTopAppBar } from '@material/top-app-bar';
export default {
	props: {
		title: {
			type: String,
			default: null,
		},
		navigationIcon: {
			type: String,
			default: null,
		},
		actionItems: {
			type: Array,
			default: null,
		},
	},
	data() {
		return {
			mdcTopAppBar: null,
		};
	},
	mounted() {
		this.mdcTopAppBar = new MDCTopAppBar(this.$el);
	},
	destroyed() {
		this.mdcTopAppBar.destroy();
	},
};
</script>
