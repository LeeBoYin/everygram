<template>
	<i :class="iconClass" class="category-avatar__icon"><template v-if="iconType === 'material'">{{ iconName }}</template></i>
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
				case 'material':
				default:
					return 'material-icons-outlined';
			}
		},
	},
};
</script>
