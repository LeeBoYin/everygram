<template>
	<div class="category-gear-list mdc-list-group">
		<h3 :key="'categoryLabel' + category.uuid" class="mdc-list-group__subheader d-flex align-items-center">
			<div class="category-avatar mr-2" :style="{ 'background-color': category.color }">
				<i class="category-avatar__icon material-icons-outlined">{{ category.iconName }}</i>
			</div>
			<b class="text-gray-800">{{ getCategoryName(category) }}</b>
		</h3>
		<Board>
			<MdcList>
				<slot name="gear-list-items"></slot>
			</MdcList>
		</Board>
	</div>
</template>

<script>
import Board from '@components/Board';
import MdcList from '@components/MdcList';
export default {
	components: {
		Board,
		MdcList,
	},
	props: {
		category: {
			type: Object,
			default: null,
		},
	},
}
</script>
