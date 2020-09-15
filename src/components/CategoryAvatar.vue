<template>
	<div class="category-avatar" :style="{ 'background-color' : backgroundColor }">
		<CategoryIcon class="category-avatar__icon" v-bind="$attrs" />
	</div>
</template>

<script>
import CategoryIcon from '@components/CategoryIcon';
export default {
	components: {
		CategoryIcon,
	},
	props: {
		backgroundColor: {
			type: String,
			default: null,
		}
	},
};
</script>
