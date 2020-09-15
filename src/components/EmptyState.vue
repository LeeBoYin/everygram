<template>
	<div class="empty-state">
		<div class="text-center p-7">
			<p v-if="text">{{ text }}</p>
			<slot name="cta"></slot>
		</div>
		<div v-if="imageUrl" class="mt-7">
			<img :src="imageUrl" class="w-100">
		</div>
	</div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default: null,
		},
		imageUrl: {
			type: String,
			default: null,
		},
	},
}
</script>
