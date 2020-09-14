import Gear from '@class/Gear';
import { errorMessageLang } from '@libs/lang';

const state = {
	gearCollectionRef: null,
};
const getters = {

};
const mutations = {
	setGearCollectionRef(state, gearCollectionRef) {
		state.gearCollectionRef = gearCollectionRef;
	},
};
const actions = {
	async init(context) {
		context.commit('setGearCollectionRef', context.rootState.db.collection('gear'));
	},
	async createGear(context, { gearData }) {
		try {
			return await context.state.gearCollectionRef
			.add(new Gear({
				ownerUserUid: context.rootGetters['user/user'].uid,
				...gearData,
			}))
			.then((gearRef) => {
				return gearRef.id;
			}).catch((error) => {
				console.error("Error adding gear: ", error);
			});
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async getGear(context, gearId) {
		try {
			return await context.state.gearCollectionRef.doc(gearId).get();
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
