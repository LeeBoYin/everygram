<template>
	<li class="category-list-item mdc-list-item">
		<!-- no ripple on sortable list item -->
		<span class="category-list-item__handle mdc-list-item__graphic material-icons-outlined" aria-hidden="true">drag_handle</span>
		<span class="mdc-list-item__text d-flex align-items-center">
			<CategoryAvatar class="mr-3" :icon-type="category.iconType" :icon-name="category.iconName" />
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
import CategoryAvatar from '@components/CategoryAvatar';
import MdcIconButton from '@components/MdcIconButton';
export default {
	components: {
		CategoryAvatar,
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
