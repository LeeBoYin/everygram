<template>
	<i :class="iconClass"><template v-if="iconType === constant('ICON_TYPE_MATERIAL')">{{ iconName }}</template></i>
</template>

<script>
export default {
	props: {
		iconType: {
			type: String,
			required: true,
		},
		iconName: {
			type: String,
			default: null,
		},
	},
	computed: {
		iconClass() {
			switch (this.iconType) {
				case constant('ICON_TYPE_MATERIAL'):
				default:
					return 'material-icons-outlined';
			}
		},
	},
};
</script>
