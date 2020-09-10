<template>
	<div>
		<div class="container-xl">
			<!-- 預設模式 -->
			<PageToolBar>
				<template #left>
					<div class="text-gray-700">共有 54 個裝備</div>
				</template>
				<template #right>
					<MdcButton class="mdc-button--text ml-2">選取</MdcButton>
					<MdcButton class="mdc-button--text ml-2">編輯排序</MdcButton>
					<MdcButton class="mdc-button--text ml-2">
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
					<MdcButton class="mdc-button--text ml-2">
						<i slot="leading-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">add</i>
						新增到
					</MdcButton>
					<MdcButton class="mdc-button--text ml-2">
						<i slot="leading-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">archive</i>
						封存
					</MdcButton>
					<MdcButton class="mdc-button--text ml-2">
						<i slot="leading-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">delete</i>
						刪除
					</MdcButton>
				</template>
				<template #right>
					<MdcButton class="mdc-button--text ml-2">取消選取</MdcButton>
				</template>
			</PageToolBar>

			<!-- 編輯排序模式 -->
			<PageToolBar>
				<template #left>
					<div class="font-weight-bolder text-gray-700">拖動裝備進行排序</div>
				</template>
				<template #right>
					<MdcButton class="mdc-button--text ml-2">完成</MdcButton>
				</template>
			</PageToolBar>
<div class="category-list">
			<div v-for="(gearList, categoryLabel) in gearLists" :key="categoryLabel">
				<h3 :key="'categoryLabel' + categoryLabel" class="mdc-list-group__subheader d-flex align-items-center mb-3">
					<div class="category-avatar mr-2" :style="{ 'background-color': gearList.color }">
						<i class="category-avatar__icon material-icons-outlined">{{ gearList.categoryIconName }}</i>
					</div>
					<b class="text-gray-800">{{ gearList.categoryLabel}}</b>
				</h3>
				<Board :key="'categoryGears' + categoryLabel" class="mb-6">
					<div class="mdc-list-group">
						<MdcList>
							<li v-for="(gear, id) in gearList.gears" :key="id" class="mdc-list-item gear-list-item">
								<!-- 編輯排序模式才出現 -->
								<!-- <span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">drag_handle</span> -->
								<div class="mdc-list-item__text flex-grow-1">
									<div class="row align-items-center">
										<div class="col-lg-9">
											<div class="d-flex align-items-start">
												<div class="img-thumbnail gear-list-item__img-thumbnail flex-shrink-0">
													<img v-if="gear.imgUrl" :src="gear.imgUrl" alt="...">
													<i v-else class="material-icons-outlined">{{ gearList.categoryIconName }}</i>
												</div>
												<div>
													<h5 class="mt-0 mb-1">{{ gear.title }}</h5>
													<div class="text-gray-600">{{ gear.brand }}</div>
													<div class="text-gray-600">{{ gear.model }}</div>
												</div>
											</div>
										</div>
										<div class="col-lg-3 d-none d-lg-block text-right text-gray-600">
											{{ gear.weight }}
										</div>
									</div>
								</div>
								<span class="mdc-list-item__meta text-nowrap">
									<MdcIconButton>more_vert</MdcIconButton>
								</span>
							</li>
						</MdcList>
					</div>
				</Board>
			</div>

			<h3 class="mdc-list-group__subheader d-flex align-items-center mb-3">
				<div class="category-avatar mr-2">
					<i class="category-avatar__icon material-icons-outlined">backpack</i>
				</div>
				<b class="text-gray-800">背包</b>
			</h3>
			<Board class="mb-6">
				<div class="mdc-list-group">
					<MdcList>
						<li class="mdc-list-item gear-list-item fake">
							<div class="mdc-list-item__text flex-grow-1">
								<div class="row align-items-center">
									<div class="col-lg-9">
										<div class="d-flex align-items-start">
											<div class="img-thumbnail gear-list-item__img-thumbnail flex-shrink-0 shimmer shimmer-1"></div>
											<div class="flex-grow-1">
												<h5 class="mt-0 mb-1 shimmer shimmer-2"></h5>
												<div class="text-gray-600 shimmer shimmer-3"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li class="mdc-list-item gear-list-item gear-list-item--expand">
							<!-- <span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">drag_handle</span> -->
							<div class="mdc-list-item__text flex-grow-1">
								<div class="row align-items-center">
									<div class="col-lg-9">
										<div class="d-flex align-items-start">
											<div class="img-thumbnail gear-list-item__img-thumbnail flex-shrink-0">
												<i class="material-icons-outlined">backpack</i>
											</div>
											<div class="flex-grow-1">
												<h5 class="mt-0 mb-1">Item expanded demo</h5>
												<div class="text-gray-600">Everygram</div>
												<div class="text-gray-600">Everygram</div>
											</div>
										</div>
									</div>
									<div class="col-lg-3 d-none d-lg-block text-right text-gray-600">
										100g
									</div>
								</div>
							</div>
							<span class="mdc-list-item__meta text-nowrap">
								<MdcIconButton>more_vert</MdcIconButton>
							</span>
						</li>
						<li class="mdc-list-item gear-list-item">
							<!-- <span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">drag_handle</span> -->
							<div class="mdc-list-item__text flex-grow-1">
								<div class="row align-items-center">
									<div class="col-lg-9">
										<div class="d-flex align-items-start">
											<div class="img-thumbnail gear-list-item__img-thumbnail flex-shrink-0">
												<i class="material-icons-outlined">backpack</i>
											</div>
											<div class="flex-grow-1">
												<h5 class="mt-0 mb-1">Item demo</h5>
												<div class="text-gray-600">Everygram</div>
												<div class="text-gray-600">Everygram</div>
											</div>
										</div>
									</div>
									<div class="col-lg-3 d-none d-lg-block text-right text-gray-600">
										100g
									</div>
								</div>
							</div>
							<span class="mdc-list-item__meta text-nowrap">
								<MdcIconButton>more_vert</MdcIconButton>
							</span>
						</li>
					</MdcList>
				</div>
			</Board>

			<div class="mt-5 text-center">
				<img src="/static/images/logo-icon-gray.svg" alt="" width="40">
				<div class="mt-1 text-gray-400 text-sm">沒有更多裝備了</div>
			</div>
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
		/>
	</div>
</template>

<script>
import Board from '@components/Board';
import GearEditorDialog from '@components/Gears/GearEditorDialog';
import MdcButton from '@components/MdcButton';
import MdcFab from '@components/MdcFab';
import MdcIconButton from '@components/MdcIconButton';
import MdcList from '@components/MdcList';
import PageToolBar from '@components/PageToolBar';
import settingsConfig from '@/settingsConfig';

export default {
	components: {
		Board,
		GearEditorDialog,
		MdcButton,
		MdcFab,
		MdcIconButton,
		MdcList,
		PageToolBar,
	},
	data() {
		return {
			gearLists: [
				{
					categoryLabel: "背包",
					categoryIconName: "backpack",
					color: "#999",
					gears: [
						{
							id: "1",
							imgUrl: "https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/103585657_5473153589367637_1310014277959382298_o.jpg?_nc_cat=108&_nc_sid=cdbe9c&_nc_ohc=DwcLJEHGKJEAX9yqBMz&_nc_ht=scontent.ftpe7-3.fna&oh=f80e97d925bc7322f2d57fd72c5be69d&oe=5F549700",
							title: "Rawlow Bambi 輕量包awlow Bambi 輕量包awlow Bambi 輕量包awlow Bambi 輕量包",
							brand: "Rawlow Mountain Works",
							model: "Bambi 28L",
							category: "背包背包背包背包背包背包背包背包",
							weight: "1,580g",
							age: " 1 歲 2 個月",
						},
						{
							id: "2",
							title: "Rawlow Bambi 輕量包",
							brand: "Rawlow Mountain Works",
							model: "Bambi 28L",
							category: "背包",
							weight: "580g",
							age: " 2 個月",
						},
						{
							id: "3",
							title: "Rawlow Bambi 輕量包",
							brand: "Rawlow Mountain Works",
							model: "Bambi 28L",
							category: "背包",
							weight: "580g",
							age: "－",
						},
					]
				},
				{
					categoryLabel: "睡眠系統",
					categoryIconName: "airline_seat_individual_suite",
					color: "#CC4545",
					gears: [
						{
							id: "4",
							title: "Keep On 睡袋",
							brand: "Keep On",
							model: "945 S 山吹茶",
							weight: "1,580g",
							age: " 1 歲 2 個月",
						},
						{
							id: "5",
							imgUrl: "https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/103585657_5473153589367637_1310014277959382298_o.jpg?_nc_cat=108&_nc_sid=cdbe9c&_nc_ohc=DwcLJEHGKJEAX9yqBMz&_nc_ht=scontent.ftpe7-3.fna&oh=f80e97d925bc7322f2d57fd72c5be69d&oe=5F549700",
							title: "Rawlow Bambi 輕量包",
							brand: "Rawlow Mountain Works",
							model: "Bambi 28L",
							weight: "580g",
							age: " 2 個月",
						},
						{
							id: "6",

							title: "Rawlow Bambi 輕量包",
							brand: "Rawlow Mountain Works",
							model: "Bambi 28L",
							weight: "580g",
							age: " 2 個月",
						},
					]
				},
				{
					categoryLabel: "遮蔽系統",
					categoryIconName: "foundation",
					color: "#EFA33D",
					gears: [
						{
							id: "7",
							title: "MSR 三人帳",
							brand: "MSR",
							model: "Hubba",
							weight: "2,180g",
							age: " 2 歲 2 個月",
						},
						{
							id: "8",
							imgUrl: "https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/103585657_5473153589367637_1310014277959382298_o.jpg?_nc_cat=108&_nc_sid=cdbe9c&_nc_ohc=DwcLJEHGKJEAX9yqBMz&_nc_ht=scontent.ftpe7-3.fna&oh=f80e97d925bc7322f2d57fd72c5be69d&oe=5F549700",
							title: "Snow Peak 天幕",
							brand: "Snow Peak",
							model: "Penda",
							weight: "580g",
							age: " 10 個月",
						},
					]
				},
				{
					categoryLabel: "炊事系統",
					categoryIconName: "outdoor_grill",
					color: "#2C67BA",
					gears: [
						{
							id: "9",
							title: "Soto 爐頭",
							brand: "Soto",
							model: "310",
							weight: "75g",
							age: " 3 歲 2 個月",
						},
					]
				}
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
