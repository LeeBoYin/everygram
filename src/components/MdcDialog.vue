<template>
	<div class="mdc-dialog" :class="{ 'mdc-dialog--with-tab-bar': $slots['tab-bar'] }">
		<div class="mdc-dialog__container">
			<div
				class="mdc-dialog__surface"
				role="alertdialog"
				aria-modal="true"
			>
				<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
				<h2 v-if="title" class="mdc-dialog__title" id="my-dialog-title">{{ title }}</h2>
				<div v-if="$slots['tab-bar']" class="mdc-dialog__tab-bar">
					<slot v-if="isOpen" name="tab-bar"></slot>
				</div>
				<div ref="content" class="mdc-dialog__content">
					<slot v-if="isOpen"></slot>
				</div>
				<div v-if="$slots.actions" class="mdc-dialog__actions">
					<slot v-if="isOpen" name="actions"></slot>
				</div>
			</div>
		</div>
		<div class="mdc-dialog__scrim"></div>
	</div>
</template>

<script>
import { MDCDialog } from '@material/dialog';
export default {
	props: {
		title: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			isOpen: false,
			mdcDialog: null,
		};
	},
	mounted() {
		this.mdcDialog = new MDCDialog(this.$el);
		this.bindEvents();
	},
	destroyed() {
		this.mdcDialog.destroy();
	},
	methods: {
		bindEvents() {
			// Making dialogs accessible
			this.mdcDialog.listen('MDCDialog:opening', () => {
				this.isOpen = true;
				this.$emit('opening');
			});
			this.mdcDialog.listen('MDCDialog:opened', () => {
				this.$refs.content.setAttribute('aria-hidden', 'true');
				this.$emit('opened');
			});
			this.mdcDialog.listen('MDCDialog:closing', () => {
				this.$refs.content.removeAttribute('aria-hidden');
				this.$emit('closing');
			});
			this.mdcDialog.listen('MDCDialog:closed', () => {
				this.isOpen = false;
				this.$emit('closed');
			});
		},
		open() {
			this.mdcDialog.open();
		},
		close(action) {
			this.mdcDialog.close(action);
		},
	},
};
</script>
