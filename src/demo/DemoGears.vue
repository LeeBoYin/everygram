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
			<div class="page-tool-bar">
				<div class="text-gray-700">共有 54 個裝備</div>
				<div class="ml-auto">
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
				</div>
			</div>

			<!-- 選取模式 -->
			<div class="page-tool-bar">
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
				<div class="ml-auto">
					<MdcButton class="mdc-button--text ml-2">取消選取</MdcButton>
				</div>
			</div>

			<!-- 編輯排序模式 -->
			<div class="page-tool-bar">
				<div class="font-weight-bolder text-gray-700">拖動裝備進行排序</div>
				<div class="ml-auto">
					<MdcButton class="mdc-button--text ml-2">完成</MdcButton>
				</div>
			</div>

			<template v-for="(gearList, categoryLabel) in gearLists">
				<h3 :key="'categoryLabel' + categoryLabel" class="mdc-list-group__subheader d-flex align-items-center mb-3">
					<CategoryAvatar class="mr-3" icon-type="material" :icon-name="gearList.categoryIconName" :background-color="gearList.color" />
					<b class="text-gray-800">{{ gearList.categoryLabel}}</b>
				</h3>
				<Board :key="'categoryGears' + categoryLabel" class="mb-6">
					<div class="mdc-list-group">
						<MdcList>
							<li v-for="(gear, id) in gearList.gears" :key="id" class="mdc-list-item gear-list-item">
								<span class="mdc-list-item__ripple"></span>
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
			</template>

			<h3 class="mdc-list-group__subheader d-flex align-items-center mb-3">
				<CategoryAvatar class="mr-3" icon-type="material" icon-name="backpack" />
				<b class="text-gray-800">背包</b>
			</h3>
			<Board class="mb-6">
				<div class="mdc-list-group">
					<MdcList>
						<li class="mdc-list-item gear-list-item fake">
							<span class="mdc-list-item__ripple"></span>
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
							<span class="mdc-list-item__ripple"></span>
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
							<span class="mdc-list-item__ripple"></span>
							<span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">drag_handle</span>
							<div class="mdc-list-item__text flex-grow-1">
								<div class="row align-items-center">
									<div class="col-lg-9">
										<div class="d-flex align-items-start">
											<div class="img-thumbnail gear-list-item__img-thumbnail flex-shrink-0">
												<i class="material-icons-outlined">backpack</i>
											</div>
											<div class="flex-grow-1">
												<h5 class="mt-0 mb-1">Draggable</h5>
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
						<li class="mdc-list-item mdc-list-item--selected gear-list-item">
							<span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">
								<div class="mdc-checkbox mdc-checkbox--selected">
									<input type="checkbox"
										class="mdc-checkbox__native-control"
										id="checkbox-1"
										checked/>
									<div class="mdc-checkbox__background">
									<svg class="mdc-checkbox__checkmark"
										viewBox="0 0 24 24">
										<path class="mdc-checkbox__checkmark-path"
											fill="none"
											d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
									</svg>
									<div class="mdc-checkbox__mixedmark"></div>
									</div>
									<div class="mdc-checkbox__ripple"></div>
								</div>
							</span>
							<div class="mdc-list-item__text flex-grow-1">
								<div class="row align-items-center">
									<div class="col-lg-9">
										<div class="d-flex align-items-start">
											<div class="img-thumbnail gear-list-item__img-thumbnail flex-shrink-0">
												<i class="material-icons-outlined">backpack</i>
											</div>
											<div class="flex-grow-1">
												<h5 class="mt-0 mb-1">Selectable</h5>
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
		<div class="fab--sticky">
			<MdcFab
				icon="add"
				label="新增裝備"
				class="mdc-fab--extended"
				@click.native="onClickCreateGear"
			>
			</MdcFab>
		</div>
		<MdcDialog
			ref="gearEditorDialog"
			title="新增裝備"
		>
			<template #default>
				<div class="row">
					<div class="col-6 col-sm-3 mx-auto">
						<div class="mb-3">
							<div class="img-thumbnail w-100 embed-responsive embed-responsive-1by1">
								<i class="material-icons-outlined">photo_camera</i>
							</div>
						</div>
					</div>
					<div class="col-sm-9">
						<div class="mb-3">
							<MdcTextField
								type="text"
								autocomplete="off"
								label="名稱"
								:required="true"
							/>
						</div>
						<div class="mb-3">
							<div class="mdc-select mdc-select--filled mdc-select-width">
								<div class="mdc-select__anchor mdc-select-width">
									<span class="mdc-select__ripple"></span>
									<span class="mdc-select__selected-text"></span>
									<span class="mdc-select__dropdown-icon">
									<i class="material-icons-outlined text-gray-600">arrow_drop_down</i>
									</span>
									<span class="mdc-floating-label">類別</span>
									<span class="mdc-line-ripple"></span>
								</div>

								<div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
									<ul class="mdc-list">
										<li class="mdc-list-item" data-value="backpack">
											<span class="mdc-list-item__ripple"></span>
											<CategoryAvatar class="mr-3" icon-type="material" icon-name="backpack" background-color="#CC4545" />
											<span class="mdc-list-item__text">
												背包
											</span>
										</li>
										<li class="mdc-list-item" data-value="sleeping">
											<span class="mdc-list-item__ripple"></span>
											<CategoryAvatar class="mr-3" icon-type="material" icon-name="hotel" background-color="#B68383" />
											<span class="mdc-list-item__text">
												睡眠系統
											</span>
										</li>
										<li class="mdc-list-item" data-value="shelter">
											<span class="mdc-list-item__ripple"></span>
											<CategoryAvatar class="mr-3" icon-type="material" icon-name="foundation" background-color="#E1BA51" />
											<span class="mdc-list-item__text">
												遮蔽系統
											</span>
										</li>
										<li class="mdc-list-item" data-value="cook">
											<span class="mdc-list-item__ripple"></span>
											<CategoryAvatar class="mr-3" icon-type="material" icon-name="outdoor_grill" background-color="#8BB683" />
											<span class="mdc-list-item__text">
												炊事系統
											</span>
										</li>
									</ul>
									<div class="mdc-menu__footer">
										<div class="text-right">
											<MdcButton el="router-link" class="mdc-button--text" :to="{ name: 'DemoSettingsCategories' }">
												裝備類別設定
												<template #trailing-icon>
													<i class="material-icons-outlined">keyboard_arrow_right</i>
												</template>
											</MdcButton>
										</div>
									</div>
								</div>
								</div>
						</div>
						<div class="mb-3">
							<MdcTextField
								type="text"
								autocomplete="off"
								label="品牌"
							/>
						</div>
						<div class="row form-row">
							<div class="col-md-6">
								<div class="mb-3">
									<MdcTextField
										type="text"
										autocomplete="off"
										label="型號"
									/>
								</div>
							</div>
							<div class="col-md-6">
								<div class="mb-3">
									<MdcTextField
										type="text"
										autocomplete="off"
										label="尺寸"
									/>
								</div>
							</div>
						</div>
						<div class="row form-row">
							<div class="col-md-6">
								<div class="mb-3">
									<MdcTextField
										type="text"
										autocomplete="off"
										label="重量"
									/>
								</div>
							</div>
							<div class="col-md-6">
								<div class="mb-3">
									<MdcTextField
										type="number"
										autocomplete="off"
										label="數量"
										value="1"
										:required="true"
									/>
								</div>
							</div>
						</div>
						<div>
							<MdcButton class="mdc-button--text">
								<i slot="leading-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">add</i>
								製造日期
							</MdcButton>
						</div>
						<div>
							<MdcButton class="mdc-button--text">
								<i slot="leading-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">add</i>
								購買資訊
							</MdcButton>
						</div>
						<div>
							<MdcButton class="mdc-button--text">
								<i slot="leading-icon" class="material-icons-outlined mdc-button__icon" aria-hidden="true">add</i>
								備註
							</MdcButton>
						</div>
					</div>
				</div>
			</template>
			<template #actions>
				<MdcButton class="mdc-button--text" @click.native="onClickCancel">
					{{ lang('action_cancel') }}
				</MdcButton>
				<MdcButton class="mdc-button--outlined ml-2">
					新增下一個
				</MdcButton>
				<MdcButton class="mdc-button--raised ml-2">
					新增
				</MdcButton>
			</template>
		</MdcDialog>
	</div>
</template>

<script>
import Board from '@components/Board';
import CategoryAvatar from '@components/CategoryAvatar';
import MdcButton from '@components/MdcButton';
import MdcDialog from '@components/MdcDialog';
import MdcDialogActionButton from '@components/MdcDialogActionButton';
import MdcFab from '@components/MdcFab';
import MdcIconButton from '@components/MdcIconButton';
import MdcList from '@components/MdcList';
import MdcListItem from '@components/MdcListItem';
import MdcTextField from '@components/MdcTextField';
import {MDCCheckbox} from '@material/checkbox';
import {MDCSelect} from '@material/select';

export default {
	components: {
		Board,
		CategoryAvatar,
		MdcButton,
		MdcDialog,
		MdcDialogActionButton,
		MdcFab,
		MdcIconButton,
		MdcList,
		MdcListItem,
		MDCSelect,
		MdcTextField,
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
							imgUrl: "https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/103585657_5473153589367637_1310014277959382298_o.jpg?_nc_cat=108&_nc_sid=cdbe9c&_nc_ohc=t2WkNZPi8rYAX8UHaWU&_nc_ht=scontent.ftpe7-3.fna&oh=69d035275590f913a351b01348af3562&oe=5F801880",
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
							imgUrl: "https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/103585657_5473153589367637_1310014277959382298_o.jpg?_nc_cat=108&_nc_sid=cdbe9c&_nc_ohc=t2WkNZPi8rYAX8UHaWU&_nc_ht=scontent.ftpe7-3.fna&oh=69d035275590f913a351b01348af3562&oe=5F801880",
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
							imgUrl: "https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/103585657_5473153589367637_1310014277959382298_o.jpg?_nc_cat=108&_nc_sid=cdbe9c&_nc_ohc=t2WkNZPi8rYAX8UHaWU&_nc_ht=scontent.ftpe7-3.fna&oh=69d035275590f913a351b01348af3562&oe=5F801880",
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
			]
		};
	},
	mounted() {
		const select = new MDCSelect(document.querySelector('.mdc-select'));

		select.listen('MDCSelect:change', () => {
		// alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
		});

		const checkbox = new MDCCheckbox(document.querySelector('.mdc-checkbox'));
	},
	methods: {
		onClickCreateGear() {
			this.$refs.gearEditorDialog.open();
		},
		onClickCancel() {
			this.$refs.gearEditorDialog.close();
		},
	},
};
</script>
