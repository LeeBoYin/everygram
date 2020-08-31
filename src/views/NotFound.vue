<template>
	<div class="not-found">
		<h1>everygram</h1>
		<div>Count every gram, every gram counts.</div>
		<RouterLink :to="{ name: 'Home' }">
			<img src="/static/images/campfire.svg" alt="campfire" class="not-found__img">
		</RouterLink>
		<h2>coming soon</h2>
		<MdcButton
			el="a"
			href="https://github.com/LeeBoYin/everygram"
			target="_blank"
		>
			<i class="material-icons-outlined mdc-button__icon" slot="leading-icon">whatshot</i>
			View on GitHub
		</MdcButton>
	</div>
</template>

<script>
import MdcButton from '@components/MdcButton'
export default {
	components: {
		MdcButton,
	},
};
</script>
