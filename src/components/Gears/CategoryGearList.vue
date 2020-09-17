<template>
	<div class="category-gear-list mdc-list-group">
		<h3 class="mdc-list-group__subheader d-flex align-items-center">
			<CategoryAvatar v-if="category" :icon-type="category.iconType" :icon-name="category.iconName" :background-color="category.color" />
			<CategoryAvatar v-else :icon-type="constant('ICON_TYPE_MATERIAL')" icon-name="help_outline" />
			<b class="text-gray-800">{{ category ? getCategoryName(category) : lang('category_others') }}</b>
		</h3>
		<Board>
			<MdcList
				ref="gearList"
				:data-category-uuid="category ? category.uuid : null"
				:class="{ 'mdc-list--non-interactive': mode === constant('GEAR_LIST_MODE_SORT') }"
			>
				<slot name="gear-list-items"></slot>
			</MdcList>
		</Board>
	</div>
</template>

<script>
import Sortable from 'sortablejs';
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
		gearList: {
			type: [Object, Array],
			default: () => [],
		},
		mode: {
			type: String,
			default: constant('GEAR_LIST_MODE_DEFAULT'),
		},
	},
	data() {
		return {
			sortable: null,
		};
	},
	watch: {
		mode() {
			this.sortable.option('disabled', this.mode !== constant('GEAR_LIST_MODE_SORT'));
		},
	},
	mounted() {
		const self = this;
		this.sortable = Sortable.create(this.$refs.gearList.$el, {
			group: {
				name: 'gear',
				pull: true,
				put: true,
			},
			sort: true,
			disabled: this.mode !== constant('GEAR_LIST_MODE_SORT'),
			delay: 100,
			delayOnTouchOnly: true,
			animation: 300,
			draggable: '.gear-list-item',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			direction: 'vertical',
			dataIdAttr: 'data-gear-id',
			emptyInsertThreshold: 30,
			onAdd(e) {
				self.onSort({
					index: e.newIndex,
					gearId: e.item.dataset.gearId,
					fromCategoryUuid: e.from.dataset.categoryUuid,
				});
				// remove added sortable item
				const unwatch = self.$watch('gearList', () => {
					e.item.remove();
					unwatch();
				});
			},
			onSort(e) {
				if(e.from.dataset.categoryUuid === e.to.dataset.categoryUuid) {
					self.onSort({
						index: e.newIndex,
						gearId: e.item.dataset.gearId,
						fromCategoryUuid: e.from.dataset.categoryUuid,
					});
				}
			},
		});
	},
	destroyed() {
		this.sortable.destroy();
	},
	methods: {
		onSort({ gearId, index, fromCategoryUuid }) {
			this.$emit('sort', {
				toCategoryUuid: _.get(this.category, 'uuid'),
				fromCategoryUuid,
				index,
				gearId,
			});
		},
	},
}
</script>
