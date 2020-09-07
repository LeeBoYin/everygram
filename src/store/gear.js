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
	async createGear(context, { gear }) {
		const gearId = await state.gearCollectionRef.add({
			...gear,
			createTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
		}).then((gearRef) => {
			return gearRef.id;
		}).catch((error) => {
			console.error("Error adding gear: ", error);
		});
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
