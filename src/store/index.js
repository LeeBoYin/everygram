import gearStore from '@store/gear';
import memberStore from '@store/member';
import userStore from '@store/user';

const state = {
	db: null,
	displayMode: null,
	installPrompt: null,
	isInitialized: false,
	isReadyToInstall: false,
};
const getters = {

};

const mutations = {
	setDB(state, db) {
		if (location.hostname === "localhost" && location.port === "3660") {
			console.log('db host = localhost:3670');
			db.settings({
				host: "localhost:3670",
				ssl: false
			});
		}
		state.db = db;
	},
	setDisplayMode(state, displayMode) {
		state.displayMode = displayMode;
	},
	setInstallPrompt(state, installPrompt) {
		state.installPrompt = installPrompt;
	},
	setIsInitialized(state) {
		state.isInitialized = true;
	},
	setIsReadyToInstall(state, isReadyToInstall) {
		state.isReadyToInstall = isReadyToInstall;

	},
};

const actions = {
	async init(context) {
		context.commit('setDB', firebase.firestore());
		await context.dispatch('user/init');
		await context.dispatch('gear/init');
		context.commit('setIsInitialized');
		console.log('store initialized');
	},
	onInstallReady(context, installPrompt) {
		context.commit('setInstallPrompt', installPrompt);
		context.commit('setIsReadyToInstall', true);
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
	modules: {
		gear: gearStore,
		member: memberStore,
		user: userStore,
	},
};
