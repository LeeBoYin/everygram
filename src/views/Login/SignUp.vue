<template>
	<div class="login__form">
		<h2>{{ lang('title_sign_up') }}</h2>
		<ValidationObserver ref="validationObserver" v-slot="{ pristine }">
			<div class="mb-4">
				<ValidationProvider name="Name" rules="required" v-slot="{ failed, errors }">
					<MdcTextField
						v-model="name"
						type="text"
						label="Name"
						name="sign-up-name"
						autocomplete="off"
						:required="true"
						:invalid="failed"
						@keypress.enter="onClickSignUp"
					/>
					<TextFieldErrorMessage :message="errors[0]" />
				</ValidationProvider>
			</div>
			<div class="mb-4">
				<ValidationProvider name="Email" rules="required|email" v-slot="{ failed, errors }">
					<MdcTextField
						v-model="email"
						type="email"
						label="Email"
						name="sign-up-email"
						autocomplete="off"
						:required="true"
						:invalid="failed"
						@keypress.enter="onClickSignUp"
					/>
					<TextFieldErrorMessage :message="errors[0]" />
				</ValidationProvider>
			</div>
			<div class="mb-4">
				<ValidationProvider name="Password" :rules="constant('PASSWORD_RULES')" v-slot="{ failed, errors }">
					<MdcTextField
						v-model="password"
						type="password"
						label="Password"
						name="sign-up-password"
						autocomplete="off"
						:required="true"
						:invalid="failed"
						@keypress.enter="onClickSignUp"
					/>
					<MdcTextFieldHelperText v-if="!errors[0]">
						{{ lang('hint_password_length') }}
					</MdcTextFieldHelperText>
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
					@click.native="onClickSignUp"
				>
					{{ lang('action_sign_up') }}
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
import MdcTextFieldHelperText from '@components/MdcTextFieldHelperText';
import TextFieldErrorMessage from '@components/TextFieldErrorMessage';

export default {
	components: {
		AlertInline,
		MdcButton,
		MdcTextField,
		MdcTextFieldHelperText,
		TextFieldErrorMessage,
		ValidationObserver,
		ValidationProvider,
	},
	data() {
		return {
			name: '',
			email: '',
			password: '',
			isLoading: false,
			errorMessage: null,
		};
	},
	methods: {
		async onClickSignUp() {
			this.errorMessage = null;
			try {
				const success = await this.$refs.validationObserver.validate();
				if(!success) {
					return;
				}
				this.$refs.validationObserver.reset();
				this.isLoading = true;
				await this.signUpWithEmail({
					email: this.email,
					password: this.password,
					name: this.name,
				});
				await this.$router.push({
					name: 'Gears',
				});
			} catch (errorMessage) {
				this.errorMessage = errorMessage;
				this.isLoading = false;
			}
		},
		...mapActions('user', [
			'signUpWithEmail',
		]),
	},
};
</script>
