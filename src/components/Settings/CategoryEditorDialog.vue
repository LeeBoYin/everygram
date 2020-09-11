<template>
	<MdcDialog
		ref="mdcDialog"
		:title="isEditing ? lang('title_edit_category') : lang('title_create_category')"
		@closed="onDialogClosed"
	>
		<template #default>
			<ValidationObserver ref="validationObserver" v-slot="{ pristine }">
				<ValidationProvider :name="lang('label_category_name')" rules="required" v-slot="{ failed, errors }">
					<div class="mb-4">
						<MdcTextField
							type="text"
							v-model.trim="categoryName"
							name="category-name"
							autocomplete="off"
							:label="lang('label_category_name')"
							:required="true"
							:invalid="failed"
						/>
						<TextFieldErrorMessage :message="errors[0]" />
					</div>
				</ValidationProvider>

				<h5 class="mb-2">類別圖示</h5>
				<ValidationProvider :name="lang('label_category_icon')" rules="required" v-slot="{ errors }">
					<div class="row no-gutters">
						<div class="col-auto" v-for="(categoryIcon, index) in categoryIcons" :key="index">
							<label class="icon-radio">
								<input type="radio" name="category_icon" v-model="iconIndex" :value="index">
								<CategoryIcon class="icon-radio__icon" :icon-type="categoryIcon.type" :icon-name="categoryIcon.name" />
							</label>
						</div>
						<TextFieldErrorMessage :message="errors[0]" />
					</div>
				</ValidationProvider>

				<AlertInline v-if="pristine && errorMessage" class="text-danger mt-3">
					{{ errorMessage }}
				</AlertInline>
			</ValidationObserver>

			<h5 class="mb-2">類別顏色</h5>
			<div class="mb-4">
				<div class="row no-gutters">
					<div class="col-auto">
						<label class="avatar-radio">
							<input type="radio" name="category_color">
							<div class="category-avatar avatar-radio__avatar mr-2" :style="{ 'background-color': '#999' }">
								<i class="category-avatar__icon material-icons-outlined">check</i>
							</div>
						</label>
					</div>
					<div class="col-auto">
						<label class="avatar-radio">
							<input type="radio" name="category_color">
							<div class="category-avatar avatar-radio__avatar mr-2" :style="{ 'background-color': '#999' }">
								<i class="category-avatar__icon material-icons-outlined">check</i>
							</div>
						</label>
					</div>
				</div>
			</div>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import AlertInline from '@components/AlertInline';
import settingsConfig from '@/settingsConfig';
import CategoryIcon from '@components/CategoryIcon';
import MdcDialog from '@components/MdcDialog';
import MdcDialogActionButton from '@components/MdcDialogActionButton';
import MdcTextField from '@components/MdcTextField';
import TextFieldErrorMessage from '@components/TextFieldErrorMessage';
export default {
	components: {
		AlertInline,
		CategoryIcon,
		MdcDialog,
		MdcDialogActionButton,
		MdcTextField,
		TextFieldErrorMessage,
		ValidationObserver,
		ValidationProvider,
	},
	props: {
		categories: {
			type: Array,
			default: () => [],
		},
		onCreateCategory: {
			type: Function,
			default: () => {},
		},
		onUpdateCategory: {
			type: Function,
			default: () => {},
		},
	},
	data() {
		return {
			categoryIndex: null,
			categoryName: '',
			errorMessage: null,
			iconIndex: null,
			isEditing: false,
			isSaving: false,
		};
	},
	computed: {
		categoryIcons() {
			if(this.isEditing) {
				const category = this.categories[this.categoryIndex];
				const isCurrentIconIncluded = _.some(settingsConfig.categoryIcons, categoryIcon => {
					return category.iconType === categoryIcon.type && category.iconName === categoryIcon.name;
				});
				if(!isCurrentIconIncluded) {
					// prepend original icon if it is no loner existing
					return [
						{
							type: category.iconType,
							name: category.iconName,
						},
						...settingsConfig.categoryIcons,
					];
				}
			}

			return settingsConfig.categoryIcons;
		},
		newCategory() {
			if(!this.categoryName || _.isNil(this.iconIndex)) {
				return  null;
			}
			return {
				name: this.categoryName,
				iconType: this.categoryIcons[this.iconIndex].type,
				iconName: this.categoryIcons[this.iconIndex].name,
			};
		},
	},
	methods: {
		create() {
			this.$refs.mdcDialog.open();
		},
		edit(index) {
			const category = this.categories[index];
			this.isEditing = true;
			this.categoryIndex = index;
			this.categoryName = getCategoryName(category);
			this.iconIndex = _.findIndex(this.categoryIcons, categoryIcon => {
				return category.iconType === categoryIcon.type && category.iconName === categoryIcon.name;
			});
			this.$refs.mdcDialog.open();
		},
		onClickCancel() {
			this.$refs.mdcDialog.close();
		},
		async onClickAccept() {
			this.errorMessage = null;
			try {
				const success = await this.$refs.validationObserver.validate();
				if(!success) {
					return;
				}
				this.$refs.validationObserver.reset();
				if(this.checkIsCategoryNameExisting()) {
					this.errorMessage = lang('error_category_name_exist');
					return;
				}
				this.isSaving = true;
				if(this.isEditing) {
					await this.onUpdateCategory(this.categoryIndex, this.newCategory);
					this.$snackbar({
						message: lang('msg_changes_are_saved'),
					});
				} else {
					await this.onCreateCategory(this.newCategory);
					this.$snackbar({
						message: lang('msg_category_created'),
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
			this.categoryName = '';
			this.categoryIndex = null;
			this.iconIndex = null;
			this.isEditing = false;
			this.errorMessage = null;
			this.$refs.validationObserver.reset();
		},
		checkIsCategoryNameExisting() {
			const existingIndex = _.findIndex(this.categories, category => {
				return this.categoryName === getCategoryName(category);
			});
			if(existingIndex !== -1) {
				if(!this.isEditing) {
					return true;
				}
				if(this.isEditing && existingIndex !== this.categoryIndex) {
					return true;
				}
			}
			return false;
		},
	},
}
</script>
