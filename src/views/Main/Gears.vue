<template>
	<div class="gears">
		<div class="container-xl">
			<EmptyState
				:text="lang('info_gears_empty')"
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
			<PageToolBar>
				<template #left>
					<div class="text-gray-700">{{ lang('info_gear_total_num', [_.size(gearListData.gearData)]) }}</div>
				</template>
				<template #right>
					<MdcButton class="mdc-button--text ml-2">{{ lang('action_select') }}</MdcButton>
					<MdcButton class="mdc-button--text ml-2">{{ lang('action_sort') }}</MdcButton>
				</template>
			</PageToolBar>
			<CategoryGearList
				v-for="categoryData in categoryDataList"
				:key="categoryData.category.uuid"
				:category="categoryData.category"
				class="mb-6"
			>
				<template #gear-list-items>
					<GearListItem
						v-for="(gear, gearId) in categoryData.gearList"
						:key="gearId"
						:gear="gear"
						:category="categoryData.category"
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
		MdcButton,
		MdcFab,
		PageToolBar,
	},
	data() {
		return {};
	},
	computed: {
		categoryDataList() {
			const categoryDataList = [];
			_.forEach(this.memberSettings.categories, category => {
				const gearIdList = _.get(this.gearListData, ['order', category.uuid], []);
				if(!gearIdList.length) {
					return;
				}
				const gearList = _.mapValues(_.keyBy(gearIdList), gearId => _.get(this.gearListData, ['gearData', gearId]));
				categoryDataList.push({
					category,
					gearList,
				});
			});
			return categoryDataList;
		},
		otherGearList() {
			const gearIdList = _.get(this.gearListData, ['order', constant('CATEGORY_OTHERS')], []);
			return _.mapValues(_.keyBy(gearIdList), gearId => _.get(this.gearListData, ['gearData', gearId]));
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
	async beforeRouteEnter(to, from, next) {
		if(!_.get(store, ['state', 'gearList'])) {
			store.registerModule('gearList', gearListStore);
			await store.dispatch('gearList/init', {
				path: `member/${ store.getters['user/user'].uid }/gearList/main`,
			});
		}
		next();
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
		onUpdateGear(gearData) {
console.log(gearData);
			//
		},
		...mapActions('gear', [
			'createGear',
			'getGear',
		]),
		...mapActions('gearList', [
			'appendGearToGearList',
			'init',
		]),
	},
};
</script>
