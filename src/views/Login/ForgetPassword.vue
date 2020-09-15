<template>
	<div class="login__form">
		<h2>{{ lang('title_forget_password') }}</h2>
		<ValidationObserver ref="validationObserver" v-slot="{ pristine }">
			<div class="mb-4">
				<ValidationProvider name="Email" rules="required|email" v-slot="{ failed, errors }">
					<MdcTextField
						v-model="email"
						type="email"
						label="Email"
						:required="true"
						:invalid="failed"
						@keypress.enter="onClickSend"
					/>
					<TextFieldErrorMessage :message="errors[0]" />
				</ValidationProvider>
			</div>
			<AlertInline v-if="pristine && errorMessage" class="text-danger mb-3">
				{{ errorMessage }}
			</AlertInline>
			<div class="mb-2">
				<MdcButton
					class="mdc-button--raised w-100"
					:is-loading="isLoading"
					@click.native="onClickSend"
				>
					{{ lang('action_send_password_reset_email') }}
				</MdcButton>
			</div>
		</ValidationObserver>
		<div>
			<MdcButton el="router-link" :to="{ name: 'SignIn' }">
				<i slot="leading-icon" class="material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
				{{ lang('action_back_to_sign_in') }}
			</MdcButton>
		</div>
	</div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import AlertInline from '@components/AlertInline';
import MdcButton from '@components/MdcButton';
import MdcTextField from '@components/MdcTextField';
import TextFieldErrorMessage from '@components/TextFieldErrorMessage';

export default {
	components: {
		AlertInline,
		MdcButton,
		MdcTextField,
		TextFieldErrorMessage,
		ValidationObserver,
		ValidationProvider,
	},
	data() {
		return {
			email: '',
			isLoading: false,
			errorMessage: null,
		};
	},
	methods: {
		async onClickSend() {
			this.errorMessage = null;
			try {
				const success = await this.$refs.validationObserver.validate();
				if(!success) {
					return;
				}
				this.$refs.validationObserver.reset();
				this.isLoading = true;
				await this.sendPasswordResetEmail(this.email);
				this.isLoading = false;
				this.$snackbar({
					message: lang('msg_password_reset_email_sent'),
				});
			} catch (errorMessage) {
				this.errorMessage = errorMessage;
				this.isLoading = false;
			}
		},
		...mapActions('user', [
			'sendPasswordResetEmail',
		]),
	},
};
</script>
