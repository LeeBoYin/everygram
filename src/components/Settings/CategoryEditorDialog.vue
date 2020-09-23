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

				<h5 class="mb-2">{{ lang('label_category_color') }}</h5>
				<ValidationProvider :name="lang('label_category_color')" rules="required" v-slot="{ errors }">
					<div class="row no-gutters">
						<div class="col-auto" v-for="categoryColor in categoryColors" :key="categoryColor">
							<CircleRadio
								name="category_color"
								v-model="color"
								:radio-value="categoryColor"
								:background-color="categoryColor"
							>
								<template v-slot:icon="{ checked }">
									<i v-if="checked" class="circle-radio__icon material-icons-outlined">check</i>
								</template>
							</CircleRadio>
						</div>
						<TextFieldErrorMessage :message="errors[0]" />
					</div>
				</ValidationProvider>

				<h5 class="mb-2">{{ lang('label_category_icon') }}</h5>
				<ValidationProvider :name="lang('label_category_icon')" rules="required" v-slot="{ errors }">
					<div class="row no-gutters">
						<div class="col-auto" v-for="(categoryIcon, index) in categoryIcons" :key="index">
							<CircleRadio
								name="category_icon"
								v-model="iconIndex"
								:radio-value="index"
								:background-color="iconIndex === index ? color : null"
							>
								<template #icon>
									<CategoryIcon class="circle-radio__icon" :icon-type="categoryIcon.type" :icon-name="categoryIcon.name" />
								</template>
							</CircleRadio>
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
import CircleRadio from '@components/CircleRadio';
import MdcDialog from '@components/MdcDialog';
import MdcDialogActionButton from '@components/MdcDialogActionButton';
import MdcTextField from '@components/MdcTextField';
import TextFieldErrorMessage from '@components/TextFieldErrorMessage';

const initialState = () => {
	return {
		categoryIndex: null,
		categoryName: '',
		color: _.head(settingsConfig.categoryColors),
		iconIndex: null,
		isEditing: false,
		isSaving: false,
	};
};

export default {
	mixins: [
		mixinForm,
	],
	components: {
		CategoryIcon,
		CircleRadio,
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
		return initialState();
	},
	computed: {
		categoryIcons() {
			if(this.isEditing) {
				const category = this.memberSettings.categories[this.categoryIndex];
				const isCurrentIconIncluded = _.some(settingsConfig.categoryIcons, categoryIcon => {
					return category.iconType === categoryIcon.type && category.iconName === categoryIcon.name;
				});
				if(!isCurrentIconIncluded) {
					// prepend original icon if it is no longer existing
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
		categoryColors() {
			if(this.isEditing) {
				const category = this.memberSettings.categories[this.categoryIndex];
				const isCurrentColorIncluded = _.includes(settingsConfig.categoryColors, category.color);
				if(category.color && !isCurrentColorIncluded) {
					// prepend original color if it is no longer existing
					return [
						category.color,
						...settingsConfig.categoryColors,
					];
				}
			}

			return settingsConfig.categoryColors;
		},
		newCategory() {
			if(!this.categoryName || _.isNil(this.iconIndex) || _.isNil(this.color)) {
				return  null;
			}
			return {
				name: this.categoryName,
				iconType: this.categoryIcons[this.iconIndex].type,
				iconName: this.categoryIcons[this.iconIndex].name,
				color: this.color,
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
			if(category.color) {
				this.color = category.color;
			}
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
			_.assign(this.$data, initialState());
			this.resetFormState();
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
