<template>
	<div
		class="image-file-input"
		:style="{ 'background-image': backgroundImage ? `url(${ backgroundImage })` : null }"
	>
		<input
			type="file"
			class="image-file-input__input"
			@change="onImageSelected"
			accept="image/*"
			:title="title"
		/>
		<i v-if="value" class="image-file-input__camera-lower-right material-icons-outlined">photo_camera</i>
		<i v-if="!value && !isUploading" class="image-file-input__camera-background material-icons-outlined">photo_camera</i>
		<MdcCircularProgress v-show="isUploading" class="image-file-input__loading" />
		<slot></slot>
	</div>
</template>

<script>
import { uploadFile } from '@libs/storage';
import Compressor from 'compressorjs';
import MdcCircularProgress from '@components/MdcCircularProgress';
export default {
	components: {
		MdcCircularProgress,
	},
	props: {
		maxHeight: {
			type: Number,
			default: 300,
		},
		maxWidth: {
			type: Number,
			default: 300,
		},
		quality: {
			type: Number,
			default: 0.8,
		},
		path: {
			type: String,
			required: true,
		},
		fileName: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			default: null,
		},
		title: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			isUploading: false,
		};
	},
	computed: {
		backgroundImage() {
			if(this.isUploading) {
				return null;
			}
			return this.value;
		},
	},
	methods: {
		async onImageSelected(e) {
			const file = e.target.files[0];
			if (!file || this.isUploading) {
				return;
			}
			try {
				this.isUploading = true;
				// compress image
				const compressedFile = await new Promise((resolve) => {
					new Compressor(file, {
						quality: this.quality,
						maxHeight: this.maxHeight,
						maxWidth: this.maxWidth,
						success(result) {
							resolve(result);
						},
						error(err) {
							console.log(err.message);
							throw err.message;
						},
					});
				});
				// clear input
				e.target.value = '';
				// upload
				const photoURL = await uploadFile({
					path: this.path,
					file: compressedFile,
					fileName: this.fileName,
				});
				this.$emit('input', photoURL);
			} catch (errorMessage) {
				this.$snackbar({
					message: errorMessage,
				});
			} finally {
				this.isUploading = false;
			}
		},
	},
};
</script>
