<template>
	<MdcDialog
		ref="mdcDialog"
		@closed="onDialogClosed"
	>
		<template #default>
			{{ lang('confirm_delete_gear', [gear.name]) }}
			<br>
			<small class="text-muted">{{ lang('hint_delete_gear') }}</small>
		</template>
		<template #actions>
			<MdcDialogActionButton @click.native="onClickCancel">
				{{ lang('action_cancel') }}
			</MdcDialogActionButton>
			<MdcDialogActionButton
				:is-loading="isDeleting"
				@click.native="onClickAccept"
			>
				<div class="text-danger">{{ lang('action_delete') }}</div>
			</MdcDialogActionButton>
		</template>
	</MdcDialog>
</template>

<script>
import MdcDialog from '@components/MdcDialog';
import MdcDialogActionButton from '@components/MdcDialogActionButton';

const initialState = () => {
	return {
		gear: null,
		isDeleting: false,
	};
};

export default {
	components: {
		MdcDialog,
		MdcDialogActionButton,
	},
	props: {
		onDeleteGear: {
			type: Function,
			default: () => {},
		},
	},
	data() {
		return initialState();
	},
	methods: {
		open({ gear }) {
			this.gear = gear;
			this.$refs.mdcDialog.open();
		},
		onClickCancel() {
			this.$refs.mdcDialog.close();
		},
		async onClickAccept() {
			if(this.isDeleting) {
				return;
			}
			try {
				this.isDeleting = true;
				await this.onDeleteGear();
				this.$snackbar({
					message: lang('msg_gear_deleted', [this.gear.name]),
				});
				this.$refs.mdcDialog.close('accept');
			} catch (errorMessage) {
				this.$snackbar({
					message: errorMessage,
				});
			} finally {
				this.isDeleting = false;
			}
		},
		onDialogClosed() {
			_.assign(this.$data, initialState());
		},
	},
}
</script>
