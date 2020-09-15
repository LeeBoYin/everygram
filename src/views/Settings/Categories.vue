<template>
	<FullLayout>
		<template #header>
			<MdcTopAppBar
				:title="lang('title_settings_categories')"
				navigation-icon="arrow_back_ios"
				@click:navigation="$router.push({ name: 'Settings' })"
			/>
		</template>
		<div class="container-lg">
			<div class="row">
				<div class="col-lg-6 mx-auto">
					<div class="d-none d-lg-block">
						<MdcButton el="router-link" class="mdc-button--text" :to="{ name: 'Settings' }">
							<i slot="leading-icon" class="material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
							{{ lang('action_back') }}
						</MdcButton>
						<h2 class="mt-2 px-3">{{ lang('title_settings_categories') }}</h2>
					</div>
					<Board>
						<MdcList ref="categoryList" class="mdc-list--non-interactive">
							<CategoryListItem
								v-for="(category, index) in memberSettings.categories"
								:key="category.uuid"
								:category="category"
								:data-id="index"
								class="sortable-draggable"
								@click:edit="onClickEditCategory(index)"
								@click:delete="onClickDeleteCategory(index)"
							/>
						</MdcList>
					</Board>
				</div>
			</div>
		</div>
		<div class="fab--sticky">
			<MdcFab
				icon="add"
				:label="lang('action_create_category')"
				class="mdc-fab--extended"
				@click.native="onClickCreateCategory">
			</MdcFab>
		</div>
		<CategoryEditorDialog
			ref="categoryEditorDialog"
			:categories="memberSettings.categories"
			:on-create-category="onCreateCategory"
			:on-update-category="onUpdateCategory"
		/>
		<CategoryDeleteDialog
			ref="categoryDeleteDialog"
			:categories="memberSettings.categories"
			:on-delete-category="onDeleteCategory"
		/>
	</FullLayout>
</template>

<script>
import Sortable from 'sortablejs';
import Board from '@components/Board';
import CategoryDeleteDialog from '@components/Settings/CategoryDeleteDialog';
import CategoryEditorDialog from '@components/Settings/CategoryEditorDialog';
import CategoryListItem from '@components/Settings/CategoryListItem';
import FullLayout from '@components/FullLayout';
import MdcButton from '@components/MdcButton';
import MdcFab from '@components/MdcFab';
import MdcList from '@components/MdcList';
import MdcTopAppBar from '@components/MdcTopAppBar';
export default {
	components: {
		Board,
		CategoryDeleteDialog,
		CategoryEditorDialog,
		CategoryListItem,
		FullLayout,
		MdcButton,
		MdcFab,
		MdcList,
		MdcTopAppBar,
	},
	computed: {
		...mapGetters('member', [
			'memberSettings',
		]),
	},
	mounted() {
		const self = this;
		Sortable.create(this.$refs.categoryList.$el, {
			sort: true,
			delay: 100,
			delayOnTouchOnly: true,
			animation: 300,
			draggable: ".sortable-draggable",
			ghostClass: "sortable-ghost",
			chosenClass: "sortable-chosen",
			dragClass: "sortable-drag",
			direction: 'vertical',
			onSort() {
				self.onSortCategories(this.toArray());
			},
		});
	},
	methods: {
		onClickCreateCategory() {
			this.$refs.categoryEditorDialog.create();
		},
		onClickEditCategory(index) {
			this.$refs.categoryEditorDialog.edit(index);
		},
		onClickDeleteCategory(index) {
			this.$refs.categoryDeleteDialog.open(index);
		},
		async onSortCategories(indexArray) {
			const sortedCategories = _.map(indexArray, index => {
				return this.memberSettings.categories[index];
			});
			await this.updateMember({
				categories: sortedCategories,
			});
		},
		async onCreateCategory(newCategory) {
			await this.updateMember({
				categories: firebase.firestore.FieldValue.arrayUnion(newCategory),
			});
		},
		async onUpdateCategory(index, newCategory) {
			const newCategories = [...this.memberSettings.categories];
			newCategories[index] = newCategory;
			await this.updateMember({
				categories: newCategories,
			});
		},
		async onDeleteCategory(index) {
			await this.updateMember({
				categories: firebase.firestore.FieldValue.arrayRemove(this.memberSettings.categories[index]),
			});
		},
		...mapActions('member', [
			'updateMember',
		]),
	},
}
</script>
