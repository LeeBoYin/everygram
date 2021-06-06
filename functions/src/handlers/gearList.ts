import * as admin from 'firebase-admin';
import * as _ from 'lodash';

export async function updateCategoriesInGearLists(payload: { userUid: string, categories: [] }) {
	const promises: Promise<any>[] = [];
	const gearLists = admin.firestore().collectionGroup('gearList').where('userUid', '==', payload.userUid);
	await gearLists.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			promises.push(doc.ref.update({
				categories: payload.categories,
			}));
		});
	});

	return Promise.all(promises);
}

export async function removeCategoriesFromGearList(payload: { userUid: string, categories: [] }) {
	const promises: Promise<any>[] = [];
	const gearLists = admin.firestore().collectionGroup('gearList').where('userUid', '==', payload.userUid);
	await gearLists.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			const newOrder = { ...doc.data().order };
			_.forEach(payload.categories, (category: { uuid: string }) => {
				// move gearIdList of the deleted category to others
				newOrder['others'].push(...newOrder[category.uuid]);
				delete newOrder[category.uuid];
			});
			promises.push(doc.ref.update({
				order: newOrder,
			}));
		});
	});

	return Promise.all(promises);
}

export async function moveGearToCategory(payload: {
	userUid: string,
	gearId: string,
	fromCategoryUuid: string,
	toCategoryUuid: string,
}) {
	const promises: Promise<any>[] = [];
	const gearLists = admin.firestore().collectionGroup('gearList').where('userUid', '==', payload.userUid);
	await gearLists.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			if(_.includes(doc?.data().order[payload.toCategoryUuid], payload.gearId)) {
				return;
			}
			promises.push(doc.ref.update({
				[`order.${ payload.fromCategoryUuid }`]: admin.firestore.FieldValue.arrayRemove(payload.gearId),
				[`order.${ payload.toCategoryUuid }`]: admin.firestore.FieldValue.arrayUnion(payload.gearId),
			}));
		});
	});

	return Promise.all(promises);
}

export async function updateGearDataInGearLists(payload: {
	gearId: string,
}) {
	const promises: Promise<any>[] = [];
	const gearData = await admin.firestore().doc(`gear/${ payload.gearId }`).get().then((gearSnapshot) => {
		return gearSnapshot.data();
	});
	const gearLists = admin.firestore().collectionGroup('gearList').where(`gearIdList`, 'array-contains', payload.gearId);
	await gearLists.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			const updateObj = {
				[`gearData.${ payload.gearId }`]: gearData,
			};
			promises.push(doc.ref.update(updateObj));
		});
	});
	return Promise.all(promises);
}

export async function removeGearFromGearLists(payload: {
	gearId: string,
}) {
	const promises: Promise<any>[] = [];
	const gearLists = admin.firestore().collectionGroup('gearList').where(`gearIdList`, 'array-contains', payload.gearId);
	await gearLists.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			const categoryUuid = _.findKey(doc.data().order, gearIdList => {
				return _.includes(gearIdList, payload.gearId);
			});
			const updateObj = {
				[`gearData.${ payload.gearId }`]: admin.firestore.FieldValue.delete(),
				[`order.${ categoryUuid }`]: admin.firestore.FieldValue.arrayRemove(payload.gearId),
				gearIdList: admin.firestore.FieldValue.arrayRemove(payload.gearId),
			};
			promises.push(doc.ref.update(updateObj));
		});
	});
	return Promise.all(promises);
}