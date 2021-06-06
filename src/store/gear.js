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
	async createGear(context, { gearData, categoryUuid }) {
		try {
			return await context.state.gearCollectionRef
			.add(new Gear({
				ownerUserUid: context.rootGetters['user/user'].uid,
				categoryUuid,
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
	async overwriteGear(context, { gearId, gearData, categoryUuid }) {
		await context.dispatch('updateGear', {
			gearId: gearId,
			updateObj: new Gear({
				ownerUserUid: context.rootGetters['user/user'].uid,
				categoryUuid,
				...gearData,
			})
		});
	},
	async getGear(context, gearId) {
		try {
			const gearSnapshot = await context.state.gearCollectionRef.doc(gearId).get();
			return gearSnapshot.exists ? gearSnapshot.data() : null;
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async updateGear(context, { gearId, updateObj }) {
		try {
			context.state.gearCollectionRef.doc(gearId).update(updateObj).then(() => {
				// update successfully written to the backend
			});
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async deleteGear(context, { gearId }) {
		try {
			context.state.gearCollectionRef.doc(gearId).delete().then(() => {
				// delete successfully
			});
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