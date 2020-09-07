// style
import '@style/vendor.scss';
import '@style/custom.scss';

// firebase
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from '../firebase.config';
export const project = firebase.initializeApp(firebaseConfig);

// vue
import Vue from 'vue';
import router from '@/router';
import store from '@/store';

// vee validation
import '@libs/veeValidations';

// lang
import { lang, getCategoryName } from '@libs/lang';

// use _ in all of vue component template
Object.defineProperty(Vue.prototype, '_', { value: _ });
Object.defineProperty(Vue.prototype, 'lang', { value: lang });
Object.defineProperty(Vue.prototype, 'getCategoryName', { value: getCategoryName });
Object.defineProperty(Vue.prototype, 'constant', { value: constant });

// plugins
import snackbar from '@plugins/snackbar';
Vue.use(snackbar);

new Vue({
	el: '#app',
	store,
	router,
	created() {
		this.$store.dispatch('init');
		// enable firestore offline persistence
		firebase.firestore().enablePersistence({
			synchronizeTabs: true,
		})
		.then(() => {
			// enablePersistence success
		})
		.catch((err) => {
			console.log('EnablePersistence fail', err);
			if (err.code === 'failed-precondition') {
				console.log('multiple tabs open');
			} else if (err.code === 'unimplemented') {
				console.log('current browser does not support');
			}
		});
		this.bindEvents();
	},
	methods: {
		bindEvents() {
			// install prompt
			window.addEventListener('beforeinstallprompt', (e) => {
				// Prevent the mini info bar from appearing on mobile
				e.preventDefault();
				this.$store.dispatch('onInstallReady', e);
			});

			// pwa installed
			window.addEventListener('appinstalled', (e) => {
				console.log('add to home screen installed', e);
			});

			// track how the PWA was launched
			window.addEventListener('load', () => {
				if (navigator.standalone) {
					// iOS standalone
					this.$store.commit('setDisplayMode', 'standalone');
				} else if (matchMedia('(display-mode: standalone)').matches) {
					// other standalone
					this.$store.commit('setDisplayMode', 'standalone');
				} else {
					this.$store.commit('setDisplayMode', 'browser');
				}
			});
		},
	}
});

// Check that service workers are supported
if ('serviceWorker' in navigator) {
	// Use the window load event to keep the page load performant
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js');
	});
}
