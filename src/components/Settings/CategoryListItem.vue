<template>
	<li class="category-list-item mdc-list-item">
		<span class="category-list-item__handle mdc-list-item__graphic material-icons-outlined" aria-hidden="true">drag_handle</span>
		<span class="mdc-list-item__text d-flex align-items-center">
			<div class="category-avatar mr-3" style="background-color: rgb(153, 153, 153);">
				<CategoryIcon :icon-type="category.iconType" :icon-name="category.iconName" />
			</div>
			<span>
				{{ getCategoryName(category) }}
			</span>
		</span>
		<span class="mdc-list-item__meta text-nowrap">
			<MdcIconButton @click.native="$emit('click:edit')">edit</MdcIconButton>
			<MdcIconButton @click.native="$emit('click:delete')">delete</MdcIconButton>
		</span>
	</li>
</template>

<script>
import CategoryIcon from '@components/CategoryIcon';
import MdcIconButton from '@components/MdcIconButton';
export default {
	components: {
		CategoryIcon,
		MdcIconButton,
	},
	props: {
		category: {
			type: Object,
			required: true,
		},
	},
};
</script>
