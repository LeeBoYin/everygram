<template>
	<div class="login">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-6 col-xl-5 d-none d-lg-block">
					<div class="login__banner">
						<h1 class="login__title">Start managing your gears with Everygram</h1>
						<img src="/static/images/illustration/login.png" alt="" class="login__illustration">
					</div>
				</div>
				<div class="col-md-8 col-lg-6 col-xl-5 offset-xl-1 mx-auto">
					<!-- Login -->
					<div v-if="mode === 'signIn'" class="login__form">
						<a href="/demo/home" class="login__logo" tabindex="-1">
							<img src="/static/images/logo-vertical.svg" alt="">
						</a>
						<div class="mb-4">
							<MdcTextField
								type="email"
								label="Email"
							/>
						</div>
						<div class="mb-4">
							<MdcTextField
								type="password"
								label="Password"
							/>
						</div>
						<div class="mb-1">
							<MdcButton class="mdc-button--raised w-100">
								登入
							</MdcButton>
						</div>
						<div class="text-center mb-2">
							<MdcButton @click.native="mode = 'signUp'">註冊會員</MdcButton>
							<span class="text-muted">|</span>
							<MdcButton @click.native="mode = 'forgetPassword'">忘記密碼</MdcButton>
						</div>
						<div class="mb-3 text-center text-muted">或</div>
						<div>
							<MdcButton class="mdc-button--raised button--white w-100">
								<img slot="leading-icon"  src="/static/images/social-google.svg" alt="" class="mdc-button__icon">
								使用 Google 登入
							</MdcButton>
						</div>
					</div>

					<!-- Sign Up -->
					<div v-if="mode === 'signUp'" class="login__form">
						<h2>註冊會員</h2>
						<div class="mb-4">
							<MdcTextField
								type="text"
								label="Name"
							/>
						</div>
						<div class="mb-4">
							<MdcTextField
								type="email"
								label="Email"
							/>
						</div>
						<div class="mb-4">
							<MdcTextField
								type="password"
								label="Password"
							/>
						</div>
						<div class="mb-2">
							<MdcButton class="mdc-button--raised w-100" @click.native="mode = 'singUpSuccess'">註冊</MdcButton>
						</div>
						<div>
							<MdcButton @click.native="mode = 'signIn'">
								<i slot="leading-icon" class="material-icons material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
								返回登入
							</MdcButton>
						</div>
					</div>

					<!-- Forgot Password -->
					<div v-if="mode === 'forgetPassword'" class="login__form">
						<h2>忘記密碼</h2>
						<div class="mb-4">
							<MdcTextField
								type="email"
								label="Email"
							/>
						</div>
						<div class="mb-2">
							<MdcButton class="mdc-button--raised w-100">寄送密碼重設信件</MdcButton>
						</div>
						<div>
							<MdcButton @click.native="mode = 'signIn'">
								<i slot="leading-icon" class="material-icons material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
								返回登入
							</MdcButton>
						</div>
					</div>

					<!-- 註冊成功 -->
					<div v-if="mode === 'singUpSuccess'" class="login__form">
						<h2>註冊成功！</h2>
						<p>請先至電子信箱點選驗證連結以完成註冊流程</p>
						<div class="mb-4">
							<span class="align-middle">沒有收到驗證信嗎？ </span>
							<MdcButton>重新發送</MdcButton>
						</div>
						<div>
							<MdcButton @click.native="mode = 'signIn'">
								<i slot="leading-icon" class="material-icons material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
								返回登入
							</MdcButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MdcButton from '@components/MdcButton';
import MdcTextField from '@components/MdcTextField';

export default {
	components: {
		MdcButton,
		MdcTextField,
	},
	data() {
		return {
			mode: 'signIn',
		};
	},
};
</script>
