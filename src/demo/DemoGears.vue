<template>
	<div>
		<div class="container-xl">
			<!-- 空白狀態 -->
			<div class="text-center p-7">
				<p>你的裝備庫是空的</p>
				<MdcFab
					icon="add"
					label="新增裝備"
					class="mdc-fab--extended"
					@click.native="onClickCreateGear"
				>
				</MdcFab>
			</div>
			<div class="mt-7">
				<img src="/static/images/illustration/illu-mountains-gray.png" alt="" class="w-100">
			</div>

			<!-- 預設模式 -->
			<PageToolBar>
				<template #left>
					<div class="text-gray-700">共有 54 個裝備</div>
				</template>
				<template #right>
					<MdcButton class="mdc-button--text">選取</MdcButton>
					<MdcButton class="mdc-button--text">編輯排序</MdcButton>
					<MdcButton class="mdc-button--text">
						檢視密度<i slot="trailing-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">arrow_drop_down</i>
					</MdcButton>

					<!-- 之後有切換檢視模式時再加上這個按鈕 -->
					<!-- <MdcIconButton class="text-primary">
						view_module
						view_list
					</MdcIconButton> -->
				</template>
			</PageToolBar>

			<!-- 選取模式 -->
			<PageToolBar>
				<template #left>
					<div class="font-weight-bolder text-gray-700">已選取 5 個裝備</div>
					<MdcButton class="mdc-button--text">
						<i slot="leading-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">add</i>
						新增到
					</MdcButton>
					<MdcButton class="mdc-button--text">
						<i slot="leading-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">archive</i>
						封存
					</MdcButton>
					<MdcButton class="mdc-button--text">
						<i slot="leading-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">delete</i>
						刪除
					</MdcButton>
				</template>
				<template #right>
					<MdcButton class="mdc-button--text">取消選取</MdcButton>
				</template>
			</PageToolBar>

			<!-- 編輯排序模式 -->
			<PageToolBar>
				<template #left>
					<div class="font-weight-bolder text-gray-700">拖動裝備進行排序</div>
				</template>
				<template #right>
					<MdcButton class="mdc-button--text">完成</MdcButton>
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
			<CategoryGearList
				class="mb-6"
			>
				<template #gear-list-items>
					<GearListItem
						:gear="{
							name: 'Expanded',
							brand: 'Everygram',
							model: 'Everygram',
							weight: 100,
							unitSystem: constant('UNIT_SYSTEM_METRIC')
						}"
						:is-expand="true"
					/>
					<GearListItem
						:gear="{
							name: 'Draggable',
							brand: 'Everygram',
							model: 'Everygram',
							weight: 100,
							unitSystem: constant('UNIT_SYSTEM_METRIC')
						}"
						:mode="constant('GEAR_LIST_MODE_SORT')"
					/>
					<GearListItem
						:gear="{
							name: 'Selectable',
							brand: 'Everygram',
							model: 'Everygram',
							weight: 100,
							unitSystem: constant('UNIT_SYSTEM_METRIC')
						}"
						:mode="constant('GEAR_LIST_MODE_SELECT')"
					/>
				</template>
			</CategoryGearList>
			<div class="mt-5 text-center">
				<img src="/static/images/logo-icon-gray.svg" alt="" width="40">
				<div class="mt-1 text-gray-400 text-sm">沒有更多裝備了</div>
			</div>
		</div>
		<div class="fab--sticky">
			<MdcFab
				icon="add"
				label="新增裝備"
				class="mdc-fab--extended"
				@click.native="onClickCreateGear"
			>
			</MdcFab>
		</div>
		<GearEditorDialog
			ref="gearEditorDialog"
			:categories="settingsConfig.default.categories"
			@to-settings-categories="$router.push({ name: 'DemoSettingsCategories' })"
		/>
	</div>
</template>

<script>
import CategoryGearList from '@components/Gears/CategoryGearList';
import GearListItem from '@components/Gears/GearListItem';
import GearEditorDialog from '@components/Gears/GearEditorDialog';
import MdcButton from '@components/MdcButton';
import MdcFab from '@components/MdcFab';
import PageToolBar from '@components/PageToolBar';
import settingsConfig from '@/settingsConfig';

export default {
	components: {
		CategoryGearList,
		GearListItem,
		GearEditorDialog,
		MdcButton,
		MdcFab,
		PageToolBar,
	},
	data() {
		return {
			categoryDataList: [
				{
					category: {
						uuid: uuid(),
						name: '背包',
						iconType: constant('ICON_TYPE_MATERIAL'),
						iconName: 'backpack',
						color: '#999',
					},
					gearList: [
						{
							photoURL: 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/103585657_5473153589367637_1310014277959382298_o.jpg?_nc_cat=108&_nc_sid=cdbe9c&_nc_ohc=t2WkNZPi8rYAX8UHaWU&_nc_ht=scontent.ftpe7-3.fna&oh=69d035275590f913a351b01348af3562&oe=5F801880',
							name: 'Rawlow Bambi 輕量包awlow Bambi 輕量包awlow Bambi 輕量包awlow Bambi 輕量包',
							brand: 'Rawlow Mountain Works',
							model: 'Bambi 28L',
							weight: 1580,
							unitSystem: constant('UNIT_SYSTEM_METRIC')
						},
						{
							name: 'Rawlow Bambi 輕量包',
							brand: 'Rawlow Mountain Works',
							model: 'Bambi 28L',
							weight: 580,
							unitSystem: constant('UNIT_SYSTEM_METRIC'),
						},
						{
							name: 'Rawlow Bambi 輕量包',
							brand: 'Rawlow Mountain Works',
							model: 'Bambi 28L',
							weight: 580,
							unitSystem: constant('UNIT_SYSTEM_METRIC'),
						},
					],
				},
				{
					category: {
						uuid: uuid(),
						name: '睡眠系統',
						iconType: constant('ICON_TYPE_MATERIAL'),
						iconName: 'airline_seat_individual_suite',
						color: '#CC4545',
					},
					gearList: [
						{
							name: 'Keep On 睡袋',
							brand: 'Keep On',
							model: '945 S 山吹茶',
							weight: 1580,
							unitSystem: constant('UNIT_SYSTEM_METRIC'),
						},
						{
							photoURL: 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/103585657_5473153589367637_1310014277959382298_o.jpg?_nc_cat=108&_nc_sid=cdbe9c&_nc_ohc=t2WkNZPi8rYAX8UHaWU&_nc_ht=scontent.ftpe7-3.fna&oh=69d035275590f913a351b01348af3562&oe=5F801880',
							name: 'Rawlow Bambi 輕量包',
							brand: 'Rawlow Mountain Works',
							model: 'Bambi 28L',
							weight: 580,
							unitSystem: constant('UNIT_SYSTEM_METRIC'),
						},
						{

							name: 'Rawlow Bambi 輕量包',
							brand: 'Rawlow Mountain Works',
							model: 'Bambi 28L',
							weight: 580,
							unitSystem: constant('UNIT_SYSTEM_METRIC'),
						},
					],
				},
				{
					category: {
						uuid: uuid(),
						name: '遮蔽系統',
						iconType: constant('ICON_TYPE_MATERIAL'),
						iconName: 'foundation',
						color: '#EFA33D',
					},
					gearList: [
						{
							name: 'MSR 三人帳',
							brand: 'MSR',
							model: 'Hubba',
							weight: 2180,
							unitSystem: constant('UNIT_SYSTEM_METRIC'),
						},
						{
							photoURL: 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/103585657_5473153589367637_1310014277959382298_o.jpg?_nc_cat=108&_nc_sid=cdbe9c&_nc_ohc=t2WkNZPi8rYAX8UHaWU&_nc_ht=scontent.ftpe7-3.fna&oh=69d035275590f913a351b01348af3562&oe=5F801880',
							name: 'Snow Peak 天幕',
							brand: 'Snow Peak',
							model: 'Penda',
							weight: 580,
							unitSystem: constant('UNIT_SYSTEM_METRIC'),
						},
					],
				},
				{
					category: {
						uuid: uuid(),
						name: '炊事系統',
						iconType: constant('ICON_TYPE_MATERIAL'),
						iconName: 'outdoor_grill',
						color: '#2C67BA',
					},
					gearList: [
						{
							name: 'Soto 爐頭',
							brand: 'Soto',
							model: '310',
							weight: 75,
							unitSystem: constant('UNIT_SYSTEM_METRIC'),
						},
					],
				},
			],
			settingsConfig,
		};
	},
	methods: {
		onClickCreateGear() {
			this.$refs.gearEditorDialog.create();
		},
		onClickCancel() {
			this.$refs.gearEditorDialog.close();
		},
	},
};
</script>
