<template>
	<MdcDialog
		ref="mdcDialog"
		:title="isEditing ? lang('title_edit_gear') : lang('title_create_gear')"
		@closed="onDialogClosed"
	>
		<template #default>
			<ValidationObserver ref="validationObserver" v-slot="{ pristine }">
				<div class="row mt-4">
					<div class="col-6 col-sm-3 mx-auto">
						<div class="mb-3">
							<div class="img-thumbnail w-100 embed-responsive embed-responsive-1by1">
								<i class="material-icons-outlined">photo_camera</i>
							</div>
						</div>
					</div>
					<div class="col-sm-9">
						<div class="mb-3">
							<ValidationProvider :name="lang('label_gear_name')" rules="required" v-slot="{ failed, errors }">
								<MdcTextField
									type="text"
									v-model.trim="gearName"
									name="gear-name"
									autocomplete="off"
									:label="lang('label_gear_name')"
									:required="true"
									:invalid="failed"
								/>
								<TextFieldErrorMessage :message="errors[0]" />
							</ValidationProvider>
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
										<li class="mdc-list-item" data-value="grains">
											<span class="mdc-list-item__ripple"></span>
											<span class="mdc-list-item__text">Bread, Cereal, Rice, and Pasta</span>
										</li>
										<li class="mdc-list-item" data-value="vegetables">
											<span class="mdc-list-item__ripple"></span>
											<span class="mdc-list-item__text">Vegetables</span>
										</li>
										<li class="mdc-list-item" data-value="fruit">
											<span class="mdc-list-item__ripple"></span>
											<span class="mdc-list-item__text">Fruit</span>
										</li>
									</ul>
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
						<div class="mb-3">
							<MdcTextField
								type="text"
								autocomplete="off"
								label="製造日期"
							/>
						</div>
					</div>
				</div>
				<AlertInline v-if="pristine && errorMessage" class="text-danger mt-3">
					{{ errorMessage }}
				</AlertInline>
			</ValidationObserver>
		</template>
		<template #actions>
			<MdcDialogActionButton @click.native="onClickCancel">
				{{ lang('action_cancel') }}
			</MdcDialogActionButton>
			<MdcDialogActionButton
				:is-loading="isSaving"
				@click.native="onClickAccept"
			>
				{{ isEditing ? lang('action_save') : lang('action_create') }}
			</MdcDialogActionButton>
		</template>
	</MdcDialog>
</template>

<script>
import mixinForm from '@mixins/mixinForm';
import MdcDialog from '@components/MdcDialog';
import MdcDialogActionButton from '@components/MdcDialogActionButton';
import MdcTextField from '@components/MdcTextField';
import TextFieldErrorMessage from '@components/TextFieldErrorMessage';
export default {
	mixins: [
		mixinForm,
	],
	components: {
		MdcDialog,
		MdcDialogActionButton,
		MdcTextField,
		TextFieldErrorMessage,
	},
	props: {
		onCreateGear: {
			type: Function,
			default: () => {},
		},
		onUpdateGear: {
			type: Function,
			default: () => {},
		},
	},
	data() {
		return {
			gearName: '',
			isEditing: false,
			isSaving: false,
		};
	},
	computed: {
		newGear() {
			return {};
		},
		...mapGetters('member', [
			'memberSettings',
		]),
	},
	methods: {
		create() {
			this.$refs.mdcDialog.open();
		},
		edit(gearId) {
			// this.gear = gear;
			this.isEditing = true;
			this.$refs.mdcDialog.open();
		},
		onClickCancel() {
			this.$refs.mdcDialog.close();
		},
		async onClickAccept() {
			this.errorMessage = null;
			try {
				const success = await this.$refs.validationObserver.validate();
				if (!success) {
					return;
				}
				this.$refs.validationObserver.reset();
				this.isSaving = true;
				if (this.isEditing) {
					await this.onUpdateGear(this.newGear);
					this.$snackbar({
						message: lang('msg_changes_are_saved'),
					});
				} else {
					await this.onCreateGear(this.newGear);
					this.$snackbar({
						message: lang('msg_gear_created'),
					});
				}
				this.$refs.mdcDialog.close('accept');
			} catch (errorMessage) {
				this.errorMessage = errorMessage;
			} finally {
				this.isSaving = false;
			}
		},
		onDialogClosed() {
			this.gear = null;
			this.isEditing = false;
			this.errorMessage = null;
			this.$refs.validationObserver.reset();
		},
	}
};
</script>
