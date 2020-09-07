<template>
	<div class="gears">
		<div class="container-xl">
			<PageToolBar>
				<template #left>
					<div class="text-gray-700">{{ lang('info_gear_total_num', [_.size(gearListData.gearData)]) }}</div>
				</template>
				<template #right>
					<MdcButton class="mdc-button--text ml-2">{{ lang('action_select') }}</MdcButton>
					<MdcButton class="mdc-button--text ml-2">{{ lang('action_sort') }}</MdcButton>
				</template>
			</PageToolBar>
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
import GearEditorDialog from '@components/Gears/GearEditorDialog';
import MdcButton from '@components/MdcButton';
import MdcFab from '@components/MdcFab';
import PageToolBar from '@components/PageToolBar';
import store from '@/store';
export default {
	components: {
		GearEditorDialog,
		MdcButton,
		MdcFab,
		PageToolBar,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('user', [
			'user',
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
		onCreateGear() {

		},
		onUpdateGear() {

		},
		...mapActions('gear', [
			'createGear',
		]),
		...mapActions('gearList', [
			'init'
		]),
	},
};
</script>
