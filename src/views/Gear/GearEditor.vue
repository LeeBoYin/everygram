<template>
	<FullLayout
		:title="isEditing ? lang('title_edit_gear') : lang('title_create_gear')"
	>
		<template v-if="!isEditing || isGearDataLoaded" #default>
			<ValidationObserver ref="validationObserver" v-slot="{ pristine }">
				<div class="row mt-4">
					<div class="col-6 col-sm-3 mx-auto">
						<div class="mb-3">
							<ImageFileInput
								class="img-thumbnail w-100 embed-responsive embed-responsive-1by1"
								v-model="gearPhotoURL"
								:max-width="600"
								:max-height="600"
								:path="constant('STORAGE_PATH_TO_GEAR_PHOTO')"
								:file-name="gearPhotoFileName"
							/>
						</div>
					</div>
					<div class="col-sm-9">
						<div class="mb-3">
							<ValidationProvider :name="lang('label_gear_name')" rules="required" v-slot="{ failed, errors }">
								<MdcTextField
									v-model.trim="gearName"
									name="gear-name"
									:label="lang('label_gear_name')"
									:required="true"
									:invalid="failed"
								/>
								<TextFieldErrorMessage :message="errors[0]" />
							</ValidationProvider>
						</div>
						<div class="mb-3">
							<MdcSelect
								v-model="categoryUuid"
								:label="lang('label_category')"
								:options="categoryOptions"
								class="mdc-select--fullwidth"
							>
								<template v-slot:option="{ option, selected }">
									<MdcMenuItem
										:option="option"
										:data-value="option.value"
										:selected="selected"
									>
										<template #graphic>
											<CategoryAvatar
												:icon-type="option.category.iconType"
												:icon-name="option.category.iconName"
												:background-color="option.category.color"
												class="mr-3"
											/>
										</template>
									</MdcMenuItem>
								</template>
								<template #menu-footer>
									<div class="text-right">
										<MdcButton class="mdc-button--text" @click.native="onClickToSettingsCategories">
											{{ lang('title_settings_categories') }}
											<template #trailing-icon>
												<i class="material-icons-outlined">keyboard_arrow_right</i>
											</template>
										</MdcButton>
									</div>
								</template>
							</MdcSelect>
						</div>
						<div class="mb-3">
							<MdcTextField
								v-model.trim="gearBrand"
								:label="lang('label_brand')"
							/>
						</div>
						<div class="row form-row">
							<div class="col-md-6">
								<div class="mb-3">
									<MdcTextField
										v-model.trim="gearModel"
										:label="lang('label_model')"
									/>
								</div>
							</div>
							<div class="col-md-6">
								<div class="mb-3">
									<MdcTextField
										v-model.trim="gearSize"
										:label="lang('label_size')"
									/>
								</div>
							</div>
						</div>
						<div class="row form-row">
							<div class="col-md-6">
								<div class="mb-3">
									<ValidationProvider :name="lang('label_weight')" rules="numeric|min_value:0" v-slot="{ failed, errors }">
										<WeightTextField
											v-model.number="gearWeight"
											:label="lang('label_weight')"
											:unit-system="memberSettings.unitSystem"
										/>
										<TextFieldErrorMessage :message="errors[0]" />
									</ValidationProvider>
								</div>
							</div>
							<div class="col-md-6">
								<div class="mb-3">
									<ValidationProvider :name="lang('label_quantity')" rules="numeric|min_value:1" v-slot="{ failed, errors }">
										<NumberTextField
											v-model.number="gearQuantity"
											:label="lang('label_quantity')"
											:min="1"
										/>
										<TextFieldErrorMessage :message="errors[0]" />
									</ValidationProvider>
								</div>
							</div>
						</div>
						<div class="mb-3">
							<ValidationProvider :name="lang('label_manufactured_date')" rules="yearMonthDate" v-slot="{ failed, errors }">
								<DateTextField
									v-model="gearManufacturedDate"
									:label="lang('label_manufactured_date')"
									:date-format="memberSettings.dateFormat"
									:max-date="moment().format(memberSettings.dateFormat)"
								/>
								<TextFieldErrorMessage :message="errors[0]" />
							</ValidationProvider>
						</div>
					</div>
				</div>
				<AlertInline v-if="pristine && errorMessage" class="text-danger mt-3">
					{{ errorMessage }}
				</AlertInline>
			</ValidationObserver>
			<div class="text-right">
				<MdcButton
					class="mdc-button--text"
					@click.native="onClickCancel"
				>
					{{ lang('action_cancel') }}
				</MdcButton>
				<MdcButton
					:is-loading="isSaving"
					class="mdc-button--raised"
					@click.native="onClickAccept"
				>
					{{ isEditing ? lang('action_save') : lang('action_create') }}
				</MdcButton>
			</div>
		</template>
	</FullLayout>
</template>

<script>
import store from '@/store';
import gearListStore from '@store/gearList';
import FullLayout from '@components/FullLayout';
import mixinForm from '@mixins/mixinForm';
import CategoryAvatar from '@components/CategoryAvatar';
import DateTextField from '@components/DateTextField';
import ImageFileInput from '@components/ImageFileInput';
import MdcButton from '@components/MdcButton';
import MdcMenuItem from '@components/MdcMenuItem';
import MdcSelect from '@components/MdcSelect';
import MdcTextField from '@components/MdcTextField';
import NumberTextField from '@components/NumberTextField';
import TextFieldErrorMessage from '@components/TextFieldErrorMessage';
import WeightTextField from '@components/WeightTextField';

const initialState = () => {
	return {
		// gear data
		gearName: null,
		categoryUuid: null,
		gearBrand: null,
		gearModel: null,
		gearSize: null,
		gearWeight: null,
		gearQuantity: 1,
		gearManufacturedDate: null,
		gearPhotoFileName: uuid(), // random file name
		gearPhotoURL: null,
		gearNote: null,
		oldGear: null,
		// page data
		isSaving: false,
		isGearDataLoaded: false,
	};
};

const editState = ({ gear, userUid }) => {
	return _.pickBy({
		gearName: _.get(gear, 'name'),
		categoryUuid: _.get(gear, ['category', userUid]),
		gearBrand: _.get(gear, 'brand'),
		gearModel: _.get(gear, 'mode'),
		gearSize: _.get(gear, 'size'),
		gearWeight: _.get(gear, 'weight'),
		gearQuantity: _.get(gear, 'quantity'),
		gearManufacturedDate: _.get(gear, 'manufacturedDate'),
		gearPhotoURL: _.get(gear, 'photoURL'),
		gearNote: _.get(gear, 'note'),
		oldGear: gear,
	});
};

export default {
	mixins: [
		mixinForm,
	],
	components: {
		CategoryAvatar,
		DateTextField,
		FullLayout,
		ImageFileInput,
		MdcButton,
		MdcMenuItem,
		MdcSelect,
		MdcTextField,
		NumberTextField,
		TextFieldErrorMessage,
		WeightTextField,
	},
	props: {
		gearId: {
			type: String,
			default: null,
		},
	},
	data() {
		return initialState();
	},
	computed: {
		categoryOptions() {
			return _.map(this.memberSettings.categories, category => {
				return {
					value: category.uuid,
					text: getCategoryName(category),
					category,
				};
			});
		},
		gearData() {
			const gearData = {
				brand: this.gearBrand,
				manufacturedDate: this.gearManufacturedDate,
				model: this.gearModel,
				name: this.gearName,
				photoFileName: this.gearPhotoURL ? this.gearPhotoFileName : null,
				photoURL: this.gearPhotoURL,
				quantity: this.gearQuantity,
				size: this.gearSize,
				unitSystem: this.memberSettings.unitSystem,
				weight: this.gearWeight,
				note: this.gearNote,
			};
			if(this.isEditing) {
				if(gearData.photoURL && gearData.photoURL === this.oldGear.photoURL) {
					// keep the same file name if no new photo was uploaded
					gearData.photoFileName = this.oldGear.photoFileName;
				}
			}
			return gearData;
		},
		isEditing() {
			return !!this.gearId;
		},
		...mapGetters('member', [
			'memberSettings',
		]),
		...mapGetters('user', [
			'user',
		]),
		...mapGetters('gearList', [
			'gearListData',
		]),
	},
	async created() {
		if (this.isEditing) {
			await this.loadEditingGearData();
		}
	},
	methods: {
		async loadEditingGearData() {
			const gearData = await this.getGear(this.gearId);
			_.assign(this.$data, editState({
				gear: gearData,
				userUid: this.user.uid,
			}));
			this.isGearDataLoaded = true;
		},
		async onClickAccept() {
			try {
				this.resetFormState();
				const success = await this.$refs.validationObserver.validate();
				if (!success) {
					return;
				}
				this.isSaving = true;

				// init user's main gear list
				if(!_.get(store, ['state', 'gearList'])) {
					store.registerModule('gearList', gearListStore);
					await store.dispatch('gearList/init', {
						path: `member/${ this.user.uid }/gearList/main`,
					});
				}

				if (this.isEditing) {
					await this.onUpdateGear();
					this.$snackbar({
						message: lang('msg_changes_are_saved'),
					});
				} else {
					await this.onCreateGear();
					this.$snackbar({
						message: lang('msg_gear_created'),
					});
				}
				this.$router.go(-1);
			} catch (errorMessage) {
				this.errorMessage = errorMessage;
			} finally {
				this.isSaving = false;
			}
		},
		async onCreateGear() {
			// create gear
			const gearId = await this.createGear({
				gearData: this.gearData,
				categoryUuid: this.categoryUuid,
			});
			// insert gear into main gear list
			await this.appendGearToGearList({
				gearId,
				categoryUuid: this.categoryUuid,
			});
		},
		async onUpdateGear() {
			const originalCategoryUuid = _.get(this.gearListData, ['gearData', this.gearId, 'category', this.user.uid]);
console.log(originalCategoryUuid, this.gearId, this.user.uid);
			await this.overwriteGear({
				gearId: this.gearId,
				gearData: this.gearData,
				categoryUuid: this.categoryUuid,
			});
			// update gear in gear list immediately
			await this.updateGearInGearList({
				gearId: this.gearId,
				fromCategoryUuid: originalCategoryUuid,
				toCategoryUuid: this.categoryUuid,
			});
		},
		onClickCancel() {
			this.$router.go(-1);
		},
		onClickToSettingsCategories() {
			this.$router.push({
				name: 'SettingsCategories',
			});
		},
		...mapActions('gear', [
			'createGear',
			'getGear',
			'overwriteGear',
		]),
		...mapActions('gearList', [
			'appendGearToGearList',
			'updateGearInGearList',
		]),
	},
}
</script>
