<template>
	<li
		:class="{
			'mdc-list-item--selected': isSelected,
			'gear-list-item--expand': isExpand,
		}"
		class="mdc-list-item gear-list-item"
		@click="onClick"
	>
		<span class="mdc-list-item__ripple"></span>
		<!-- 排序模式 -->
		<span v-if="mode === constant('GEAR_LIST_MODE_SORT')" class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">drag_handle</span>
		<!-- 選取模式 -->
		<span v-if="mode === constant('GEAR_LIST_MODE_SELECT')" class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">
			<MdcCheckbox v-model="isSelected" />
		</span>
		<div class="mdc-list-item__text flex-grow-1">
			<div class="row align-items-center">
				<div class="col-lg-9">
					<div class="d-flex align-items-start">
						<div class="img-thumbnail gear-list-item__img-thumbnail flex-shrink-0">
							<img v-if="gear.photoURL" :src="gear.photoURL">
							<i v-else-if="category && category.iconType === constant('ICON_TYPE_MATERIAL')" class="material-icons-outlined">{{ category.iconName }}</i>
							<i v-else class="material-icons-outlined">help_outline</i>
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
		<span v-if="mode === constant('GEAR_LIST_MODE_DEFAULT')" class="mdc-list-item__meta text-nowrap">
			<MdcIconButton>more_vert</MdcIconButton>
		</span>
	</li>
</template>

<script>
import MdcCheckbox from '@components/MdcCheckbox';
import MdcIconButton from '@components/MdcIconButton';
import mixinRipple from '@/mixins/mixinRipple';
export default {
	mixins: [
		mixinRipple
	],
	components: {
		MdcCheckbox,
		MdcIconButton,
	},
	props: {
		mode: {
			type: String,
			default: constant('GEAR_LIST_MODE_DEFAULT'),
		},
		isExpand: {
			type: Boolean,
			default: false,
		},
		gear: {
			type: Object,
			required: true,
		},
		category: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			isSelected: false,
		};
	},
	watch: {
		mode() {
			if(this.mode === constant('GEAR_LIST_MODE_SELECT')) {
				this.isSelected = false;
			}
		},
		isSelected() {
			if(this.isSelected) {
				this.$emit('checked');
			} else {
				this.$emit('unchecked');
			}
		},
	},
	methods: {
		onClick() {
			if(this.mode === constant('GEAR_LIST_MODE_SELECT')) {
				this.isSelected = !this.isSelected;
			}
		},
	},
}
</script>
