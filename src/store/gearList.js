import { errorMessageLang } from '@libs/lang';
import GearList from '@class/GearList';
window.GearList = GearList;
const state = {
	gearListDocRef: null,
	gearListData: null,
};
const getters = {
	gearListData: state => state.gearListData,
};
const mutations = {
	setGearListDocRef(state, gearListDocRef) {
		state.gearListDocRef = gearListDocRef;
	},
	setGearListData(state, gearListData) {
		state.gearListData = gearListData;
	},
};
const actions = {
	async init(context, payload = {}) {
		context.commit('setGearListDocRef', context.rootState.db.doc(payload.path));
		await context.dispatch('getGearList');
		if(!context.state.gearListData) {
			await context.dispatch('createGearList');
			await context.dispatch('getGearList');
		}
	},
	async createGearList(context) {
		if(context.state.gearListData) {
			throw 'gearList exist';
		}
		try {
			await context.state.gearListDocRef.set(new GearList({
				userUid: context.rootState.user.user.uid,
				categories: context.rootState.member.member.categories,
			}));
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async getGearList(context) {
		try {
			const gearListSnapshot = await context.state.gearListDocRef.get();
			if(!gearListSnapshot.exists) {
				return;
			}
console.log('gearListSnapshot', gearListSnapshot);
			context.commit('setGearListData', gearListSnapshot.data());
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
