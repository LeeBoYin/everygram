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

				<h5 class="mb-2">類別顏色</h5>
				<div class="mb-4">
					<div class="row no-gutters">
						<div class="col-auto">
							<label class="circle-radio">
								<input type="radio" name="category_color" checked>
								<div class="circle-radio__circle mr-2" :style="{ 'background-color': '#999' }">
									<!-- Checked 才有打勾 -->
									<i class="circle-radio__icon material-icons-outlined">check</i>
								</div>
							</label>
						</div>
						<div class="col-auto">
							<label class="circle-radio">
								<input type="radio" name="category_color">
								<div class="circle-radio__circle" :style="{ 'background-color': '#999' }">
									<!-- <i class="circle-radio__icon material-icons-outlined">check</i> -->
								</div>
							</label>
						</div>
					</div>
				</div>

				<h5 class="mb-2">類別圖示</h5>
				<ValidationProvider :name="lang('label_category_icon')" rules="required" v-slot="{ errors }">
					<div class="row no-gutters">
						<div class="col-auto" v-for="(categoryIcon, index) in categoryIcons" :key="index">
							<label class="circle-radio">
								<input type="radio" name="category_icon" v-model="iconIndex" :value="index">
								<div class="circle-radio__circle">
									<CategoryIcon class="circle-radio__icon" :icon-type="categoryIcon.type" :icon-name="categoryIcon.name" />
								</div>
							</label>
						</div>
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
import settingsConfig from '@/settingsConfig';
import CategoryIcon from '@components/CategoryIcon';
import MdcDialog from '@components/MdcDialog';
import MdcDialogActionButton from '@components/MdcDialogActionButton';
import MdcTextField from '@components/MdcTextField';
import TextFieldErrorMessage from '@components/TextFieldErrorMessage';
export default {
	mixins: [
		mixinForm,
	],
	components: {
		CategoryIcon,
		MdcDialog,
		MdcDialogActionButton,
		MdcTextField,
		TextFieldErrorMessage,
	},
	props: {
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
			iconIndex: null,
			isEditing: false,
			isSaving: false,
		};
	},
	computed: {
		categoryIcons() {
			if(this.isEditing) {
				const category = this.memberSettings.categories[this.categoryIndex];
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
				uuid: this.isEditing ? this.memberSettings.categories[this.categoryIndex].uuid : uuid(),
			};
		},
		...mapGetters('member', [
			'memberSettings',
		]),
	},
	methods: {
		create() {
			this.$refs.mdcDialog.open();
		},
		edit(index) {
			const category = this.memberSettings.categories[index];
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
			const existingIndex = _.findIndex(this.memberSettings.categories, category => {
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
