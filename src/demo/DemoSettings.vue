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
									:value="constant('DEFAULT_MEMBER_PHOTO_URL')"
									:max-width="300"
									:max-height="300"
									:path="`demo`"
									file-name="profile_picture"
								/>
							</div>
						</template>
						<template #body>
							<EditableTextField
								label="名稱"
								:value="displayName"
								:on-save="onSaveDisplayName"
								class="mb-4"
							/>
							<div class="mb-4">
								<MdcTextField
									type="text"
									label="Email"
									value="everygram@text.com"
									disabled
								>
									<template #trailingIcon>
										<img src="/static/images/social-google.svg" alt="">
									</template>
								</MdcTextField>
							</div>
							<div class="text-center">
								<MdcButton class="mdc-button--outlined my-2" @click.native="onClickChangePassword">更改密碼</MdcButton>
								<MdcButton class="mdc-button--outlined my-2">登出</MdcButton>
							</div>
						</template>
					</Board>
				</div>
				<div class="col-xl-7">
					<Board class="settings__board">
						<MdcList>
							<MdcListItem>
								<template #text>裝備類別設定</template>
								<template #icon>keyboard_arrow_right</template>
								<RouterLink :to="{ name: 'DemoSettingsCategories' }" />
							</MdcListItem>
						</MdcList>
					</Board>
					<Board class="settings__board">
						<MdcList>
							<MdcListItemSelect
								label="系統語言"
								:options="[
									{ value: 'zh-tw', text: '繁體中文' },
									{ value: 'en-us', text: 'English' },
								]"
								v-model="language"
							/>
							<MdcListItemSelect
								label="預設單位"
								:options="[
									{ value: constant('UNIT_SYSTEM_METRIC'), text: '公制' },
									{ value: constant('UNIT_SYSTEM_IMPERIAL'), text: '英制' },
								]"
								v-model="unitSystem"
							/>
							<MdcListItemSelect
								label="日期格式"
								:options="[
									{ value: 'YYYY/MM/DD', text: 'YYYY/MM/DD' },
									{ value: 'MM/DD/YYYY', text: 'MM/DD/YYYY' },
									{ value: 'DD/MM/YYYY', text: 'DD/MM/YYYY' },
								]"
								v-model="dateFormat"
							/>
							<MdcListItemSelect
								label="預設幣別"
								:options="[
									{ value: 'TWD', text: 'TWD' },
									{ value: 'USD', text: 'USD' },
									{ value: 'JPY', text: 'JPY' },
									{ value: 'KRW', text: 'KRW' },
								]"
								v-model="currency"
							/>
						</MdcList>
					</Board>
					<Board class="settings__board">
						<MdcList>
							<MdcListItem>
								<template #text>給予意見與回饋</template>
								<template #icon>open_in_new</template>
							</MdcListItem>
							<MdcListItem>
								<template #text>Buy me a coffee</template>
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
		<ChangePasswordDialog ref="changePasswordDialog" />
	</div>
</template>

<script>
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
			mode: 'viewMode',
			displayName: 'LIN PEIZHEN',
			language: 'zh-tw',
			unitSystem: 'metric',
			dateFormat: 'YYYY/MM/DD',
			currency: 'TWD',
		};
	},
	methods: {
		onClickChangePassword() {
			this.$refs.changePasswordDialog.open();
		},
		async onSaveDisplayName(newDisplayName) {
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve();
					this.displayName = newDisplayName;
				}, 1500);
			});
		},
	},
};
</script>
