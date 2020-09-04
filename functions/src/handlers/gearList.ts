import * as admin from 'firebase-admin';
import * as _ from 'lodash';

export const updateAllCategoriesInGearLists = async (payload: { userUid: string, categories: [] }) => {
	console.log('run updateAllCategoriesInGearLists');
	const gearLists = admin.firestore().collectionGroup('gearList').where('userUid', '==', payload.userUid);
	await gearLists.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			doc.ref.update({
				categories: payload.categories,
			});
		});
	});
};

// const addCategoriesToGearList = async (payload: { userUid: string, categories: [] }) => {
// 	console.log('run addCategoriesToGearList');
// 	const gearLists = admin.firestore().collectionGroup('gearList').where('userUid', '==', payload.userUid);
// 	await gearLists.get().then(function (querySnapshot) {
// 		querySnapshot.forEach(function (doc) {
// 			const newOrder = { ...doc.data().order };
// 			_.forEach(payload.categories, (category: { uuid: string }) => {
// 				newOrder[category.uuid] = [];
// 			});
// 			doc.ref.update({
// 				order: newOrder,
// 			});
// 		});
// 	});
// };

export const removeCategoriesFromGearList = async (payload: { userUid: string, categories: [] }) => {
	console.log('run removeCategoriesFromGearList');
	const gearLists = admin.firestore().collectionGroup('gearList').where('userUid', '==', payload.userUid);
	await gearLists.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			const newOrder = { ...doc.data().order };
			_.forEach(payload.categories, (category: { uuid: string }) => {
				// move gearIdList of the deleted category to others
				newOrder['others'].push(...newOrder[category.uuid]);
				delete newOrder[category.uuid];
			});
			doc.ref.update({
				order: newOrder,
			});
		});
	});
};
