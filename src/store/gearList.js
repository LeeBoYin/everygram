import { errorMessageLang } from '@libs/lang';
import GearList from '@class/GearList';

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
			context.commit('setGearListData', gearListSnapshot.data());
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async updateGearList(context, updateObj) {
		try {
			context.state.gearListDocRef.update(updateObj).then(() => {
				// update successfully written to the backend
			});
			// get gearList and update state.getGearListData
			await context.dispatch('getGearList');
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async appendGearToGearList(context, { gearId, categoryUuid }) {
		const gearData = await context.dispatch('gear/getGear', gearId, { root: true });
		await context.dispatch('updateGearList', {
			[`gearData.${ gearId }`]: gearData,
			[`order.${ categoryUuid || constant('CATEGORY_OTHERS') }`]: firebase.firestore.FieldValue.arrayUnion(gearId),
			gearIdList: firebase.firestore.FieldValue.arrayUnion(gearId),
		});
	},
	async updateGearInGearList(context, { gearId, fromCategoryUuid, toCategoryUuid }) {
		const gearData = await context.dispatch('gear/getGear', gearId, { root: true });
		const updateObj = {
			[`gearData.${ gearId }`]: gearData,
		};
		if(fromCategoryUuid !== toCategoryUuid) {
			updateObj[`order.${ fromCategoryUuid || constant('CATEGORY_OTHERS') }`] = firebase.firestore.FieldValue.arrayRemove(gearId);
			updateObj[`order.${ toCategoryUuid || constant('CATEGORY_OTHERS') }`] = firebase.firestore.FieldValue.arrayUnion(gearId);
		}
		await context.dispatch('updateGearList', updateObj);
	},
	async removeGearFromGearList(context, { gearId }) {
		const categoryUuid = _.findKey(context.state.gearListData.order, gearIdList => {
			return _.includes(gearIdList, gearId);
		});
		await context.dispatch('updateGearList', {
			[`gearData.${ gearId }`]: firebase.firestore.FieldValue.delete(),
			[`order.${ categoryUuid || constant('CATEGORY_OTHERS') }`]: firebase.firestore.FieldValue.arrayRemove(gearId),
			gearIdList: firebase.firestore.FieldValue.arrayRemove(gearId),
		});
	},
	async sortGear(context, { gearId, fromCategoryUuid, toCategoryUuid, index = null }) {
		const updateObj = {};
		if(fromCategoryUuid !== toCategoryUuid) {
			// remove gearId from previous category
			updateObj[`order.${ fromCategoryUuid || constant('CATEGORY_OTHERS') }`] = firebase.firestore.FieldValue.arrayRemove(gearId);
		}
		// update target category
		let gearIdList = _.get(context.state.gearListData, ['order', toCategoryUuid || constant('CATEGORY_OTHERS')], []);
		gearIdList = _.without(gearIdList, gearId);
		gearIdList.splice(index, 0, gearId);
		updateObj[`order.${ toCategoryUuid || constant('CATEGORY_OTHERS') }`] = gearIdList;

		await context.dispatch('updateGearList', updateObj);

		// update gear category
		if(fromCategoryUuid !== toCategoryUuid) {
			context.dispatch('gear/updateGear', {
				gearId,
				updateObj: {
					[`category.${ context.rootState.user.user.uid }`]: toCategoryUuid,
				},
			}, { root: true });
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
