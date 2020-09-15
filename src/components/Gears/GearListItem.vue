<template>
	<li class="mdc-list-item gear-list-item">
		<!-- 編輯排序模式才出現 -->
		<!-- <span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">drag_handle</span> -->
		<span class="mdc-list-item__ripple"></span>
		<div class="mdc-list-item__text flex-grow-1">
			<div class="row align-items-center">
				<div class="col-lg-9">
					<div class="d-flex align-items-start">
						<div class="img-thumbnail gear-list-item__img-thumbnail flex-shrink-0">
							<img v-if="gear.photoURL" :src="gear.photoURL">
							<i v-else-if="category" class="material-icons-outlined">{{ category.iconName }}</i>
						</div>
						<div>
							<h5 class="mt-0 mb-1">{{ gear.name }}</h5>
							<div v-if="gear.brand" class="text-gray-600">{{ gear.brand }}</div>
							<div v-if="gear.model" class="text-gray-600">{{ gear.model }}</div>
						</div>
					</div>
				</div>
				<div class="col-lg-3 d-none d-lg-block text-right text-gray-600">
					<template v-if="gear.weight">
						{{ gear.weight }}{{ gear.unitSystem === constant('UNIT_SYSTEM_METRIC') ? lang('weight_unit_gram') : lang('weight_unit_ounce') }}
					</template>
				</div>
			</div>
		</div>
		<span class="mdc-list-item__meta text-nowrap">
			<MdcIconButton>more_vert</MdcIconButton>
		</span>
	</li>
</template>

<script>
import MdcIconButton from '@components/MdcIconButton';
export default {
	components: {
		MdcIconButton,
	},
	props: {
		gear: {
			type: Object,
			required: true,
		},
		category: {
			type: Object,
			default: null,
		},
	},
}
</script>
