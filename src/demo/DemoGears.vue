<template>
	<div>
		<div class="container-xl">
			<div class="page-tool-bar">
				<div class="mr-auto">共有 54 個裝備</div>
				<MdcButton>選取</MdcButton>
				<MdcButton>
					<i class="material-icons-outlined mdc-button__icon" aria-hidden="true">view_module</i>
				</MdcButton>
				<MdcButton>
					<i class="material-icons-outlined mdc-button__icon" aria-hidden="true">view_list</i>
				</MdcButton>
			</div>
			<template v-for="(gearList, categoryLabel) in gearLists">
				<h3 :key="'categoryLabel' + categoryLabel" class="mdc-list-group__subheader d-flex align-items-center mt-4 mb-2">
					<i class="material-icons-outlined text-xl mr-2">{{ gearList.categoryIconName }}</i>
					<span>{{ gearList.categoryLabel}}</span>
				</h3>
				<Board v-if="gearList.gears" :key="'categoryGears' + categoryLabel">
					<div class="mdc-list-group">
						<MdcList>
							<li v-for="(gear, id) in gearList.gears" :key="id" class="mdc-list-item gear-list-item">
								<span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">drag_handle</span>
								<div class="mdc-list-item__text flex-grow-1">
									<div class="row align-items-center">
										<div class="col-xl-8">
											<div class="d-flex align-items-start">
												<div class="rounded img-thumbnail flex-shrink-0">
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
										<div class="col-xl-2 d-none d-xl-block text-right text-gray-600">
											{{ gear.weight }}
										</div>
										<div class="col-xl-2 d-none d-xl-block text-right text-gray-600">
											{{ gear.age }}
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
				<div v-else :key="'empty' + categoryLabel" style="display:flex; align-items:center; justify-content:center;border-radius: 6px; border: 1px solid #ddd; color: rgba(0,0,0,0.6);padding: 24px;">
					+
				</div>
			</template>
			<div class="mt-5 text-center">
				<img src="/static/images/logo-icon-gray.svg" alt="" width="40">
				<div class="mt-1 text-gray-500 text-sm">沒有更多裝備了</div>
			</div>
		</div>
		<div class="fab--sticky">
			<MdcFab
				icon="add"
				label="新增裝備"
				class="mdc-fab--extended">
			</MdcFab>
		</div>
	</div>
</template>

<script>
import Board from '@components/Board';
import MdcButton from '@components/MdcButton';
import MdcFab from '@components/MdcFab';
import MdcIconButton from '@components/MdcIconButton';
import MdcList from '@components/MdcList';
import MdcListItem from '@components/MdcListItem';

export default {
	components: {
		Board,
		MdcButton,
		MdcFab,
		MdcIconButton,
		MdcList,
		MdcListItem,

	},
	data() {
		return {
			gearLists: [
				{
					categoryLabel: "背包",
					categoryIconName: "backpack",
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
				},
				{
					categoryLabel: "炊事系統",
					categoryIconName: "outdoor_grill",
				}
			]
		};
	}
};
</script>
