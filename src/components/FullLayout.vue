<template>
	<div class="main">
		<MdcTopAppBar
			:title="title"
			navigation-icon="arrow_back_ios"
			@click:navigation="$router.go(-1)"
		/>
		<div ref="mdcDrawerAppContent" class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
			<main ref="mainContent" class="main__content">
				<slot name="main-start" />
				<div class="container-lg">
					<div class="row">
						<div class="col-lg-6 mx-auto">
							<div class="d-none d-lg-block">
								<MdcButton class="mdc-button--text" @click.native="$router.go(-1)">
									<i slot="leading-icon" class="material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
									{{ lang('action_back') }}
								</MdcButton>
								<h2 class="mt-2 px-3">
									{{ title }}
								</h2>
							</div>
							<slot></slot>
						</div>
					</div>
				</div>
				<slot name="main-end" />
			</main>
		</div>
	</div>
</template>

<script>
import MdcButton from '@components/MdcButton';
import MdcTopAppBar from '@components/MdcTopAppBar';
export default {
	components: {
		MdcButton,
		MdcTopAppBar,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
	},
};
</script>
