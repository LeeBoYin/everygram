<template>
	<div
		class="avatar"
		:style="{ 'background-image': imageUrl ? `url(${ imageUrl })` : null }"
	></div>
</template>

<script>
export default {
	props: {
		imageUrl: {
			type: String,
		},
	},
};
</script>
