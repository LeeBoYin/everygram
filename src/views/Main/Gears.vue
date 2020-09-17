<template>
	<div class="gears">
		<div class="container-xl">
			<GearListLoading v-if="!isInitialized" />
			<EmptyState
				v-else-if="isEmpty"
				:text="lang('info_gears_empty')"
				image-url="/static/images/illustration/illu-mountains-gray.png"
			>
				<template slot="cta">
					<MdcFab
						icon="add"
						:label="lang('action_create_gear')"
						class="mdc-fab--extended"
						@click.native="onClickCreateGear"
					>
					</MdcFab>
				</template>
			</EmptyState>
			<template v-else>
				<!-- 預設模式 -->
				<PageToolBar v-if="mode === constant('GEAR_LIST_MODE_DEFAULT')">
					<template #left>
						<div class="text-gray-700">{{ lang('info_gear_total_num', [_.size(gearListData.gearData)]) }}</div>
					</template>
					<template #right>
						<MdcButton
							class="mdc-button--text"
							@click.native="changeMode(constant('GEAR_LIST_MODE_SELECT'))"
						>
							{{ lang('action_select') }}
						</MdcButton>
						<MdcButton
							class="mdc-button--text"
							@click.native="changeMode(constant('GEAR_LIST_MODE_SORT'))"
						>
							{{ lang('action_sort') }}
						</MdcButton>
					</template>
				</PageToolBar>
				<!-- 選取模式 -->
				<PageToolBar v-else-if="mode === constant('GEAR_LIST_MODE_SELECT')">
					<template #left>
						<div class="font-weight-bolder text-gray-700">
							{{ lang('info_gear_selected_num', [selectedGearIdList.length]) }}
						</div>
						<MdcButton class="mdc-button--text">
							<i slot="leading-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">add</i>
							{{ lang('action_add_to') }}
						</MdcButton>
						<MdcButton class="mdc-button--text">
							<i slot="leading-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">archive</i>
							{{ lang('action_archive') }}
						</MdcButton>
						<MdcButton class="mdc-button--text">
							<i slot="leading-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">delete</i>
							{{ lang('action_delete') }}
						</MdcButton>
					</template>
					<template #right>
						<MdcButton
							class="mdc-button--text"
							@click.native="changeMode(constant('GEAR_LIST_MODE_DEFAULT'))"
						>
							{{ lang('action_cancel_select') }}
						</MdcButton>
					</template>
				</PageToolBar>
				<!-- 編輯排序模式 -->
				<PageToolBar v-else-if="mode === constant('GEAR_LIST_MODE_SORT')">
					<template #left>
						<div class="font-weight-bolder text-gray-700">
							{{ lang('hint_sort_gears') }}
						</div>
					</template>
					<template #right>
						<MdcButton
							class="mdc-button--text"
							@click.native="changeMode(constant('GEAR_LIST_MODE_DEFAULT'))"
						>
							{{ lang('action_complete') }}
						</MdcButton>
					</template>
				</PageToolBar>
				<CategoryGearList
					v-for="categoryData in categoryDataList"
					:key="_.get(categoryData, 'category.uuid', constant('CATEGORY_OTHERS'))"
					:category="categoryData.category"
					:gear-list="categoryData.gearList"
					:mode="mode"
					class="mb-6"
					@sort="onSortGear"
				>
					<template #gear-list-items>
						<GearListItem
							v-for="(gear, gearId) in categoryData.gearList"
							:key="gearId"
							:data-gear-id="gearId"
							:gear="gear"
							:category="categoryData.category"
							:mode="mode"
							@checked="selectedGearIdList = _.concat(selectedGearIdList, gearId)"
							@unchecked="selectedGearIdList = _.without(selectedGearIdList, gearId)"
						/>
					</template>
				</CategoryGearList>
				<div class="fab--sticky">
					<MdcFab
						icon="add"
						:label="lang('action_create_gear')"
						class="mdc-fab--extended"
						@click.native="onClickCreateGear"
					>
					</MdcFab>
				</div>
			</template>
			<GearEditorDialog
				ref="gearEditorDialog"
				:on-create-gear="onCreateGear"
				:on-update-gear="onUpdateGear"
			/>
		</div>
	</div>
</template>

<script>
import gearListStore from '@store/gearList';
import CategoryGearList from '@components/Gears/CategoryGearList';
import EmptyState from '@components/EmptyState';
import GearEditorDialog from '@components/Gears/GearEditorDialog';
import GearListItem from '@components/Gears/GearListItem';
import GearListLoading from '@components/Gears/GearListLoading';
import MdcButton from '@components/MdcButton';
import MdcFab from '@components/MdcFab';
import PageToolBar from '@components/PageToolBar';
import store from '@/store';
export default {
	components: {
		CategoryGearList,
		EmptyState,
		GearEditorDialog,
		GearListItem,
		GearListLoading,
		MdcButton,
		MdcFab,
		PageToolBar,
	},
	data() {
		return {
			isInitialized: false,
			mode: constant('GEAR_LIST_MODE_DEFAULT'),
			selectedGearIdList: [],
		};
	},
	computed: {
		categoryDataList() {
			const categoryDataList = [];
			_.forEach(this.memberSettings.categories, category => {
				const gearIdList = _.get(this.gearListData, ['order', category.uuid], []);
				if(this.mode !== constant('GEAR_LIST_MODE_SORT') && !gearIdList.length) {
					return;
				}
				const gearList = _.mapValues(_.keyBy(gearIdList), gearId => _.get(this.gearListData, ['gearData', gearId]));
				categoryDataList.push({
					category,
					gearList,
				});
			});

			if(!_.isEmpty(this.otherGearList)) {
				categoryDataList.push({
					category: null,
					gearList: this.otherGearList,
				});
			}
			return categoryDataList;
		},
		otherGearList() {
			const gearIdList = _.get(this.gearListData, ['order', constant('CATEGORY_OTHERS')], []);
			return _.mapValues(_.keyBy(gearIdList), gearId => _.get(this.gearListData, ['gearData', gearId]));
		},
		isEmpty() {
			return _.isEmpty(this.categoryDataList) && _.isEmpty(this.otherGearList);
		},
		...mapGetters('user', [
			'user',
		]),
		...mapGetters('member', [
			'memberSettings',
		]),
		...mapGetters('gearList', [
			'gearListData'
		]),
	},
	async created() {
		if(!_.get(store, ['state', 'gearList'])) {
			store.registerModule('gearList', gearListStore);
			await store.dispatch('gearList/init', {
				path: `member/${ store.getters['user/user'].uid }/gearList/main`,
			});
		}
		this.isInitialized = true;
	},
	destroyed() {
		store.unregisterModule('gearList');
	},
	methods: {
		onClickCreateGear() {
			this.$refs.gearEditorDialog.create();
		},
		async onCreateGear({ gearData, categoryUuid }) {
console.log(gearData);
			// create gear
			const gearId = await this.createGear({
				gearData,
			});
			// insert gear into main gear list
			await this.appendGearToGearList({
				gearId,
				categoryUuid,
			});
		},
		onUpdateGear({ gearData }) {
console.log(gearData);
			//
		},
		async onSortGear({ gearId, fromCategoryUuid, toCategoryUuid, index }) {
			await this.sortGear({
				gearId,
				fromCategoryUuid,
				toCategoryUuid,
				index,
			});
		},
		changeMode(mode) {
			switch (mode) {
				case constant('GEAR_LIST_MODE_DEFAULT'):
					this.selectedGearIdList = [];
					this.mode = constant('GEAR_LIST_MODE_DEFAULT');
					break;
				case constant('GEAR_LIST_MODE_SORT'):
					this.mode = constant('GEAR_LIST_MODE_SORT');
					break;
				case constant('GEAR_LIST_MODE_SELECT'):
					this.mode = constant('GEAR_LIST_MODE_SELECT');
					break;
			}
		},
		...mapActions('gear', [
			'createGear',
			'getGear',
		]),
		...mapActions('gearList', [
			'appendGearToGearList',
			'sortGear',
			'init',
		]),
	},
};
</script>
