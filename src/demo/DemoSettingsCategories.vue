<template>
	<FullLayout>
		<template #header>
			<MdcTopAppBar
				:title="'裝備類別設定'"
				navigation-icon="arrow_back_ios"
				@click:navigation="$router.push({ name: 'DemoSettings' })"
			/>
		</template>
		<div class="container-lg">
			<div class="row">
				<div class="col-lg-6 mx-auto">
					<div class="d-none d-lg-block">
						<MdcButton el="router-link" class="mdc-button--text" :to="{ name: 'DemoSettings' }">
							<i slot="leading-icon" class="material-icons material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
							返回
						</MdcButton>
						<h2 class="mt-2 px-3">裝備類別設定</h2>
					</div>
					<Board>
						<MdcList ref="categoryList" class="mdc-list--non-interactive">
							<CategoryListItem
								v-for="(category, index) in memberSettings.categories"
								:key="index"
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
				label="新增類別"
				class="mdc-fab--extended"
				@click.native="onClickCreateCategory">
			</MdcFab>
		</div>
		<CategoryEditorDialog
			ref="categoryEditorDialog"
		/>
		<CategoryDeleteDialog
			ref="categoryDeleteDialog"
		/>
	</FullLayout>
</template>

<script>
import settingsConfig from '@/settingsConfig';
import Board from '@components/Board';
import FullLayout from '@components/FullLayout';
import CategoryDeleteDialog from '@components/Settings/CategoryDeleteDialog';
import CategoryEditorDialog from '@components/Settings/CategoryEditorDialog';
import CategoryListItem from '@components/Settings/CategoryListItem';
import MdcButton from '@components/MdcButton';
import MdcFab from '@components/MdcFab';
import MdcList from '@components/MdcList';
import MdcTopAppBar from '@components/MdcTopAppBar';
import Sortable from 'sortablejs';

export default {
	components: {
		Board,
		FullLayout,
		CategoryDeleteDialog,
		CategoryEditorDialog,
		CategoryListItem,
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
	},
};
</script>
