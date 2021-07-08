<template>
	<div class="settings">
		<div class="container-xl">
			<div class="row">
				<div class="col-xl-5">
					<Board>
						<template #header>
							<div class="settings__profile-header">
								<ImageFileInput
									class="settings__profile-avatar"
									v-model="photoURL"
									:max-width="300"
									:max-height="300"
									:path="`member/${ user.uid }`"
									file-name="profile_picture"
									@input="onSettingChange('photoURL', arguments[0])"
								/>
							</div>
						</template>
						<template #body>
							<EditableTextField
								type="text"
								name="display-name"
								:label="lang('label_display_name')"
								:value="user.displayName"
								:on-save="onSaveDisplayName"
								class="mb-4"
							/>
							<div class="mb-4">
								<MdcTextField
									type="text"
									:label="lang('label_email')"
									:value="user.email"
									disabled
								>
								</MdcTextField>
							</div>
							<div class="text-center">
								<MdcButton
									v-if="isUserHasPassword"
									class="mdc-button--outlined my-2"
									@click.native="onClickChangePassword"
								>{{ lang('action_change_password') }}</MdcButton>
								<MdcButton
									class="mdc-button--outlined my-2"
									:is-loading="isSigningOut"
									@click.native="onClickSignOut"
								>{{ lang('action_sign_out') }}</MdcButton>
							</div>
						</template>
					</Board>
				</div>
				<div class="col-xl-7">
					<Board class="settings__board">
						<MdcList>
							<MdcListItem>
								<template #text>{{ lang('title_settings_categories') }}</template>
								<template #icon>keyboard_arrow_right</template>
								<RouterLink :to="{ name: 'SettingsCategories' }" />
							</MdcListItem>
						</MdcList>
					</Board>
					<Board class="settings__board">
						<MdcList>
							<MdcListItemSelect
								:label="lang('label_language')"
								:options="languageOptions"
								v-model="language"
								@change="onSettingChange('language', arguments[0])"
							/>
							<MdcListItemSelect
								:label="lang('label_unit_system')"
								:options="unitSystemOptions"
								v-model="unitSystem"
								@change="onSettingChange('unitSystem', arguments[0])"
							/>
							<MdcListItemSelect
								:label="lang('label_date_format')"
								:options="dateFormatOptions"
								v-model="dateFormat"
								@change="onSettingChange('dateFormat', arguments[0])"
							/>
							<MdcListItemSelect
								:label="lang('label_currency')"
								:options="currencyOptions"
								v-model="currency"
								@change="onSettingChange('currency', arguments[0])"
							/>
						</MdcList>
					</Board>
					<Board class="settings__board">
						<MdcList>
							<MdcListItem>
								<template #text>{{ lang('action_give_us_feedback') }}</template>
								<template #icon>open_in_new</template>
							</MdcListItem>
							<MdcListItem>
								<template #text>{{ lang('action_buy_me_a_coffee') }}</template>
								<template #icon>free_breakfast</template>
							</MdcListItem>
						</MdcList>
					</Board>
					<Board>
						<template #body>
							PWA
						</template>
					</Board>
				</div>
			</div>
		</div>
		<ChangePasswordDialog
			ref="changePasswordDialog"
			:on-change-password="onChangePassword"
		/>
	</div>
</template>

<script>
import settingsConfig from '@/settingsConfig.json';
import Board from '@components/Board';
import ChangePasswordDialog from '@components/Settings/ChangePasswordDialog';
import EditableTextField from '@components/EditableTextField';
import ImageFileInput from '@components/ImageFileInput';
import MdcButton from '@components/MdcButton';
import MdcList from '@components/MdcList';
import MdcListItem from '@components/MdcListItem';
import MdcListItemSelect from '@components/MdcListItemSelect';
import MdcTextField from '@components/MdcTextField';

export default {
	components: {
		Board,
		ChangePasswordDialog,
		EditableTextField,
		ImageFileInput,
		MdcButton,
		MdcList,
		MdcListItem,
		MdcListItemSelect,
		MdcTextField,
	},
	data() {
		return {
			currency: '',
			dateFormat: '',
			isSigningOut: false,
			language: '',
			newDisplayName: '',
			photoURL: '',
			unitSystem: '',
		};
	},
	computed: {
		languageOptions() {
			return _.map(settingsConfig.language, (option, key) => ({
				text: lang(_.get(option, 'langKey')),
				value: key,
			}));
		},
		unitSystemOptions() {
			return _.map(settingsConfig.unitSystem, (option, key) => ({
				text: lang(_.get(option, 'langKey')),
				value: key,
			}));
		},
		dateFormatOptions() {
			return _.map(settingsConfig.dateFormat, (option, key) => ({
				text: lang(_.get(option, 'langKey')),
				value: key,
			}));
		},
		currencyOptions() {
			return _.map(settingsConfig.currency, (option, key) => ({
				text: `${ option.code } ${ lang(_.get(option, 'langKey')) }`,
				value: key,
			}));
		},
		...mapGetters('member', [
			'memberSettings',
		]),
		...mapGetters('user', [
			'user',
			'isUserHasPassword',
		]),
	},
	created() {
		this.setInitialData();
	},
	methods: {
		setInitialData() {
			this.language = this.memberSettings.language;
			this.unitSystem = this.memberSettings.unitSystem;
			this.dateFormat = this.memberSettings.dateFormat;
			this.currency = this.memberSettings.currency;
			this.photoURL = this.user.photoURL;
		},
		onClickChangePassword() {
			this.$refs.changePasswordDialog.open();
		},
		async onChangePassword(currentPassword, newPassword) {
			await this.updatePassword({
				currentPassword,
				newPassword,
			});
		},
		async onSaveDisplayName(newDisplayName) {
			if(!newDisplayName) {
				return;
			}
			await this.updateProfile({
				displayName: newDisplayName,
			});
			this.$snackbar({
				message: lang('msg_changes_are_saved'),
			});
		},
		async onClickSignOut() {
			try {
				this.isSigningOut = true;
				await this.signOut();
				await this.$router.push({ name: 'SignIn' });
				this.$snackbar({
					message: lang('msg_signed_out'),
				});
			} catch (e) {
				console.log('catch error', e);
			} finally {
				this.isSigningOut = false;
			}
		},
		async onSettingChange(name, value) {
			try {
				await this.updateMember({
					[name]: value,
				});
				this.$snackbar({
					message: lang('msg_changes_are_saved'),
				});
			} catch (errorMessage) {
				this.$snackbar({
					message: errorMessage,
				});
			}
		},
		...mapActions('member', [
			'updateMember',
		]),
		...mapActions('user', [
			'signOut',
			'updatePassword',
			'updateProfile',
		]),
	},
};
</script>
