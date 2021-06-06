<template>
	<MdcDialog
		ref="mdcDialog"
		:title="lang('title_change_password')"
	>
		<template #default>
			<ValidationObserver ref="validationObserver" v-slot="{ pristine }">
				<ValidationProvider name="Password" rules="required" v-slot="{ failed, errors }">
					<div class="mb-4">
						<MdcTextField
							v-model="currentPassword"
							type="password"
							:label="lang('label_current_password')"
							name="current-password"
							autocomplete="off"
							:required="true"
							:invalid="failed"
						/>
						<TextFieldErrorMessage :message="errors[0]" />
					</div>
				</ValidationProvider>
				<ValidationProvider name="Password" :rules="constant('PASSWORD_RULES')" v-slot="{ failed, errors }">
					<div>
						<MdcTextField
							v-model="newPassword"
							type="password"
							:label="lang('label_new_password')"
							name="new-password"
							autocomplete="off"
							:required="true"
							:invalid="failed"
						/>
						<MdcTextFieldHelperText v-if="!errors[0]">
							{{ lang('hint_password_length') }}
						</MdcTextFieldHelperText>
						<TextFieldErrorMessage :message="errors[0]" />
					</div>
				</ValidationProvider>
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
				:is-loading="isSavingNewPassword"
				:is-default="true"
				@click.native="onClickAccept"
			>
				{{ lang('action_save') }}
			</MdcDialogActionButton>
		</template>
	</MdcDialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import AlertInline from '@components/AlertInline';
import MdcDialog from '@components/MdcDialog';
import MdcDialogActionButton from '@components/MdcDialogActionButton';
import MdcTextField from '@components/MdcTextField';
import MdcTextFieldHelperText from '@components/MdcTextFieldHelperText';
import TextFieldErrorMessage from '@components/TextFieldErrorMessage';

export default {
	components: {
		AlertInline,
		MdcDialog,
		MdcDialogActionButton,
		MdcTextField,
		MdcTextFieldHelperText,
		TextFieldErrorMessage,
		ValidationObserver,
		ValidationProvider,
	},
	props: {
		onChangePassword: {
			type: Function,
			default: () => {},
		},
	},
	data() {
		return {
			currentPassword: '',
			errorMessage: null,
			isSavingNewPassword: false,
			newPassword: '',
		};
	},
	methods: {
		open() {
			this.currentPassword = this.newPassword = '';
			this.errorMessage = null;
			this.$refs.mdcDialog.open();
			this.$nextTick(() => {
				this.$refs.validationObserver.reset();
			});
		},
		onClickCancel() {
			this.$refs.mdcDialog.close('cancel');
		},
		async onClickAccept() {
			this.errorMessage = null;
			try {
				const success = await this.$refs.validationObserver.validate();
				if(!success) {
					return;
				}
				this.$refs.validationObserver.reset();
				this.isSavingNewPassword = true;
				await this.onChangePassword(this.currentPassword, this.newPassword);
				this.$refs.mdcDialog.close('accept');
				this.$snackbar({
					message: lang('msg_password_changed'),
				});
			} catch (errorMessage) {
				this.errorMessage = errorMessage;
			} finally {
				this.isSavingNewPassword = false;
			}
		},
	},
};
</script>
