<template>
	<MdcDialog ref="mdcDialog">
		<template #default>
			{{ lang('confirm_delete_category', [categoryName]) }}
			<br>
			<small class="text-muted">{{ lang('hint_delete_category') }}</small>
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
export default {
	components: {
		MdcDialog,
		MdcDialogActionButton,
	},
	props: {
		categories: {
			type: Array,
			default: () => [],
		},
		onDeleteCategory: {
			type: Function,
			default: () => {},
		},
	},
	data() {
		return {
			categoryIndex: null,
			categoryName: null,
			isDeleting: false,
		};
	},
	methods: {
		open(index) {
			this.categoryIndex = index;
			this.categoryName = getCategoryName(this.categories[index]);
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
				await this.onDeleteCategory(this.categoryIndex);
				this.$snackbar({
					message: lang('msg_category_deleted', [this.categoryName]),
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
	},
}
</script>
