<template>
	<div class="main">
		<MdcTopAppBar
			ref="mdcTopAppBar"
			:title="currentPage.text"
			navigation-icon="menu"
		/>
		<aside ref="mdcDrawer" class="mdc-drawer mdc-drawer--modal">
			<div class="mdc-drawer__header">
				<div class="drawer-header">
					<div
						v-if="user.photoURL"
						class="avatar drawer-header__avatar"
						:style="{ 'background-image': `url(${ user.photoURL })` }"
					></div>
					<div class="drawer-header__title">
						{{ user.displayName }}
					</div>
				</div>
			</div>
			<div class="mdc-drawer__content">
				<nav ref="mdcList" class="mdc-list">
					<RouterLink
						v-for="page in pageList"
						ref="listItem"
						:key="page.name"
						:to="{ name: page.name }"
						:class="{ 'mdc-list-item--activated': page.name === currentPage.name }"
						class="mdc-list-item"
						:aria-current="page.name === currentPage.name ? 'page' : null"
						:tabindex="page.name === currentPage.name ? 0 : -1"
					>
						<span class="mdc-list-item__ripple"></span>
						<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">
							{{ page.icon }}
						</i>
						<span class="mdc-list-item__text">
							{{ page.text }}
						</span>
					</RouterLink>
				</nav>
			</div>
		</aside>
		<div class="mdc-drawer-scrim"></div>
		<div ref="mdcDrawerAppContent" class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
			<main ref="mainContent" class="main__content">
				<router-view></router-view>
			</main>
		</div>
	</div>
</template>

<script>
import { MDCList } from "@material/list";
import { MDCDrawer } from "@material/drawer";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCRipple } from '@material/ripple/index';
import MdcTopAppBar from '@components/MdcTopAppBar';
export default {
	components: {
		MdcTopAppBar,
	},
	props: {
		user: {
			type: Object,
			required: true,
		},
		pageList: {
			type: Array,
			required: true,
		},
	},
	computed: {
		currentPage() {
			return _.find(this.pageList, ['name', this.$route.name]);
		},
	},
	mounted() {
		this.initResponsiveDrawer();
		this.initRipple()
	},
	methods: {
		initResponsiveDrawer() {
			// https://glitch.com/~material-responsive-drawer
			const topAppBarElement = this.$refs.mdcTopAppBar.$el;
			const listEl = this.$refs.mdcList;
			const drawerElement = this.$refs.mdcDrawer;
			const appContentEl = this.$refs.mdcDrawerAppContent;
			const mainContentEl = this.$refs.mainContent;

			const initModalDrawer = () => {
				drawerElement.classList.add("mdc-drawer--modal");
				const drawer = MDCDrawer.attachTo(drawerElement);
				drawer.open = false;

				const topAppBar = MDCTopAppBar.attachTo(topAppBarElement);
				topAppBar.setScrollTarget(mainContentEl);
				topAppBar.listen('MDCTopAppBar:nav', () => {
					drawer.open = !drawer.open;
				});

				listEl.addEventListener('click', () => {
					drawer.open = false;
				});

				appContentEl.classList.add('mdc-top-app-bar--fixed-adjust');

				return drawer;
			};

			const initPermanentDrawer = () => {
				drawerElement.classList.remove("mdc-drawer--modal");
				const list = new MDCList(listEl);
				list.wrapFocus = true;
				appContentEl.classList.remove('mdc-top-app-bar--fixed-adjust');
				return list;
			};

			let drawer = window.matchMedia("(max-width: 991px)").matches ?
				initModalDrawer() : initPermanentDrawer();

			// Toggle between permanent drawer and modal drawer at breakpoint
			const resizeHandler = () => {
				if (window.matchMedia("(max-width: 991px)").matches && drawer instanceof MDCList) {
					drawer.destroy();
					drawer = initModalDrawer();
				} else if (window.matchMedia("(min-width: 992px)").matches && drawer instanceof MDCDrawer) {
					drawer.destroy();
					drawer = initPermanentDrawer();
				}
			};
			window.addEventListener('resize', resizeHandler);
		},
		initRipple() {
			this.$refs.listItem.forEach(listItem => {
				new MDCRipple(listItem.$el);
			});
		},
	},
};
</script>
