<template>
	<div class="category-gear-list mdc-list-group">
		<h3 class="mdc-list-group__subheader d-flex align-items-center">
			<CategoryAvatar v-if="category" :icon-type="category.iconType" :icon-name="category.iconName" :background-color="category.color" />
			<CategoryAvatar v-else :icon-type="constant('ICON_TYPE_MATERIAL')" icon-name="help_outline" />
			<b class="text-gray-800">{{ category ? getCategoryName(category) : lang('category_others') }}</b>
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
import CategoryAvatar from '@components/CategoryAvatar';
import MdcList from '@components/MdcList';
export default {
	components: {
		Board,
		CategoryAvatar,
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
