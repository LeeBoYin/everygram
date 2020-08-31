<template>
	<div class="login__form">
		<RouterLink :to="{ name: 'Home' }" class="login__logo" tabindex="-1">
			<img src="/static/images/logo-vertical.svg" alt="logo">
		</RouterLink>
		<ValidationObserver ref="validationObserver" v-slot="{ pristine }">
			<div class="mb-4">
				<ValidationProvider name="Email" rules="required|email" v-slot="{ failed, errors }">
					<MdcTextField
						v-model="email"
						type="email"
						label="Email"
						:required="true"
						:invalid="failed"
						@keypress.enter="onEmailEnter"
					/>
					<TextFieldErrorMessage :message="errors[0]" />
				</ValidationProvider>
			</div>
			<div class="mb-4">
				<ValidationProvider name="Password" rules="required" v-slot="{ failed, errors }">
					<MdcTextField
						ref="passwordTextField"
						v-model="password"
						type="password"
						label="Password"
						:required="true"
						:invalid="failed"
						@keypress.enter="onClickSignIn"
					/>
					<TextFieldErrorMessage :message="errors[0]" />
				</ValidationProvider>
			</div>
			<AlertInline v-if="pristine && errorMessage" class="text-danger mb-3">
				{{ errorMessage }}
			</AlertInline>
			<div class="mb-1">
				<MdcButton
					class="mdc-button--raised w-100"
					:is-loading="isLoading"
					@click.native="onClickSignIn"
				>
					{{ lang('action_sign_in') }}
				</MdcButton>
			</div>
		</ValidationObserver>
		<div class="text-center mb-2">
			<MdcButton el="router-link" :to="{ name: 'SignUp' }">{{ lang('action_sign_up_new_member') }}</MdcButton>
			<span class="text-muted">|</span>
			<MdcButton el="router-link" :to="{ name: 'ForgetPassword' }">{{ lang('action_forget_password') }}</MdcButton>
		</div>
		<div class="mb-3 text-center text-muted">{{ lang('util_or') }}</div>
		<div>
			<MdcButton
				class="mdc-button--raised button--white w-100"
				@click.native="onClickSignInWithGoogle"
			>
				<img slot="leading-icon" src="/static/images/social-google.svg" alt="Google" class="mdc-button__icon">
				{{ lang('action_sign_in_with_google') }}
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
			password: '',
			isLoading: false,
			errorMessage: null,
		};
	},
	methods: {
		async onClickSignIn() {
			this.errorMessage = null;
			try {
				const success = await this.$refs.validationObserver.validate();
				if(!success) {
					return;
				}
				this.$refs.validationObserver.reset();
				this.isLoading = true;
				await this.signInWithEmail({
					email: this.email,
					password: this.password,
				});
				this.onSignedIn();
			} catch (errorMessage) {
				this.errorMessage = errorMessage;
				this.isLoading = false;
			}
		},
		async onClickSignInWithGoogle() {
			try {
				await this.signInWithGoogle();
				this.onSignedIn();
			} catch (e) {
				console.error(e);
			}
		},
		onEmailEnter() {
			if(!this.email) {
				return;
			}
			if(!this.password) {
				this.$refs.passwordTextField.focus();
				return;
			}
			this.onClickSignIn();
		},
		onSignedIn() {
			this.$router.push({
				name: 'Gears',
			});
		},
		...mapActions('user', [
			'signInWithEmail',
			'signInWithGoogle',
		]),
	},
};
</script>
