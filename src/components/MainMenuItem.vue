<template>
	<RouterLink
		:to="{ name: page.name }"
		:class="{ 'mdc-list-item--activated': page.name === currentPageName }"
		class="mdc-list-item"
		:aria-current="page.name === currentPageName ? 'page' : null"
		:tabindex="page.name === currentPageName ? 0 : -1"
	>
		<span class="mdc-list-item__ripple"></span>
		<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">
			{{ page.icon }}
		</i>
		<span class="mdc-list-item__text">
			{{ page.text }}
		</span>
	</RouterLink>
</template>

<script>
import mixinRipple from '@/mixins/mixinRipple';
export default {
	mixins: [
		mixinRipple
	],
	props: {
		page: {
			type: Object,
			required: true,
		},
		currentPageName: {
			type: String,
			default: null,
		},
	},
}
</script>
