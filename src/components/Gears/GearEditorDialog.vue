<template>
	<MdcDialog
		ref="mdcDialog"
		:title="isEditing ? lang('title_edit_gear') : lang('title_create_gear')"
		@closed="onDialogClosed"
	>
		<template #default>
			<ValidationObserver ref="validationObserver" v-slot="{ pristine }">
				<div class="row mt-4">
					<div class="col-6 col-sm-3 mx-auto">
						<div class="mb-3">
							<div class="img-thumbnail w-100 embed-responsive embed-responsive-1by1">
								<i class="material-icons-outlined">photo_camera</i>
							</div>
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
							/>
						</div>
						<div class="mb-3">
							<MdcTextField
								v-model="gearBrand"
								:label="lang('label_brand')"
							/>
						</div>
						<div class="row form-row">
							<div class="col-md-6">
								<div class="mb-3">
									<MdcTextField
										v-model="gearModel"
										:label="lang('label_model')"
									/>
								</div>
							</div>
							<div class="col-md-6">
								<div class="mb-3">
									<MdcTextField
										v-model="gearSize"
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
											v-model="gearWeight"
											:label="lang('label_weight')"
											unit-system="metric"
										/>
										<TextFieldErrorMessage :message="errors[0]" />
									</ValidationProvider>
								</div>
							</div>
							<div class="col-md-6">
								<div class="mb-3">
									<ValidationProvider :name="lang('label_quantity')" rules="numeric|min_value:1" v-slot="{ failed, errors }">
										<NumberTextField
											v-model="gearQuantity"
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
		</template>
		<template #actions>
			<MdcDialogActionButton
				class="mdc-button--text"
				@click.native="onClickCancel"
			>
				{{ lang('action_cancel') }}
			</MdcDialogActionButton>
			<MdcDialogActionButton
				:is-loading="isSaving"
				class="mdc-button--raised"
				@click.native="onClickAccept"
			>
				{{ isEditing ? lang('action_save') : lang('action_create') }}
			</MdcDialogActionButton>
		</template>
	</MdcDialog>
</template>

<script>
import mixinForm from '@mixins/mixinForm';
import DateTextField from '@components/DateTextField';
import MdcDialog from '@components/MdcDialog';
import MdcDialogActionButton from '@components/MdcDialogActionButton';
import MdcSelect from '@components/MdcSelect';
import MdcTextField from '@components/MdcTextField';
import NumberTextField from '@components/NumberTextField';
import TextFieldErrorMessage from '@components/TextFieldErrorMessage';
import WeightTextField from '@components/WeightTextField';

import { getCategoryName } from '@libs/lang';
export default {
	mixins: [
		mixinForm,
	],
	components: {
		DateTextField,
		MdcDialog,
		MdcDialogActionButton,
		MdcSelect,
		MdcTextField,
		NumberTextField,
		TextFieldErrorMessage,
		WeightTextField,
	},
	props: {
		categories: {
			type: Array,
			default: () => [],
		},
		onCreateGear: {
			type: Function,
			default: () => {},
		},
		onUpdateGear: {
			type: Function,
			default: () => {},
		},
	},
	data() {
		return {
			gearName: null,
			categoryUuid: null,
			gearBrand: null,
			gearModel: null,
			gearSize: null,
			gearWeight: 12345,
			gearQuantity: 1,
			gearManufacturedDate: null,
			isEditing: false,
			isSaving: false,
		};
	},
	computed: {
		categoryOptions() {
			return _.map(this.categories, category => {
				return {
					value: category.langKey,
					text: getCategoryName(category),
					iconType: category.iconType,
					iconName: category.iconName,
				};
			});
		},
		newGear() {
			return {};
		},
		...mapGetters('member', [
			'memberSettings',
		]),
	},
	methods: {
		create() {
			this.$refs.mdcDialog.open();
		},
		edit(gearId) {
			// this.gear = gear;
			this.isEditing = true;
			this.$refs.mdcDialog.open();
		},
		onClickCancel() {
			this.$refs.mdcDialog.close();
		},
		async onClickAccept() {
			this.errorMessage = null;
			try {
				const success = await this.$refs.validationObserver.validate();
				if (!success) {
					return;
				}
				this.$refs.validationObserver.reset();
				this.isSaving = true;
				if (this.isEditing) {
					await this.onUpdateGear(this.newGear);
					this.$snackbar({
						message: lang('msg_changes_are_saved'),
					});
				} else {
					await this.onCreateGear(this.newGear);
					this.$snackbar({
						message: lang('msg_gear_created'),
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
			this.gear = null;
			this.isEditing = false;
			this.errorMessage = null;
			this.$refs.validationObserver.reset();
		},
	}
};
</script>
