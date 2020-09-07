<template>
	<div class="mdc-tab-bar" role="tablist">
		<div class="mdc-tab-scroller">
			<div class="mdc-tab-scroller__scroll-area">
				<div class="mdc-tab-scroller__scroll-content">
					<button
						v-for="tab in tabs"
						:key="tab.value"
						class="mdc-tab"
						:class="{
							'mdc-tab--active': value === tab.value,
							'mdc-tab--min-width': dense,
							'mdc-tab--stacked': stacked,
						}"
						role="tab"
					>
						<span class="mdc-tab__content">
							<span
								v-if="tab.icon"
								class="mdc-tab__icon material-icons material-icons-outlined"
								aria-hidden="true"
							>
								{{ tab.icon }}
							</span>
							<span
								v-if="tab.text"
								class="mdc-tab__text-label"
							>
								{{ tab.text }}
							</span>
						</span>
						<span
							class="mdc-tab-indicator"
							:class="{
								'mdc-tab-indicator--active': value === tab.value,
							}"
						>
							<span v-if="indicatorIcon" class="mdc-tab-indicator__content mdc-tab-indicator__content--icon material-icons material-icons-outlined" aria-hidden="true">
								{{ indicatorIcon }}
							</span>
							<span v-else class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
						</span>
						<span class="mdc-tab__ripple"></span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { MDCTabBar } from '@material/tab-bar';

export default {
	props: {
		value: {
			type: String,
			default: null,
		},
		tabs: {
			type: Array,
			default: () => [],
		},
		dense: {
			type: Boolean,
			default: false,
		},
		stacked: {
			type: Boolean,
			default: false,
		},
		indicatorIcon: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			mdcTabBar: null,
		};
	},
	mounted() {
		this.mdcTabBar = new MDCTabBar(this.$el);
		this.mdcTabBar.listen('MDCTabBar:activated', (e) => {
			this.$emit('input', this.tabs[e.detail.index].value);
		});
	},
	destroyed() {
		this.mdcTabBar.destroy();
	},
};
</script>
