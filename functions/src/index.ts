import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _ from 'lodash';
import { getAllHooksPromises } from './hooks';
const REGION_TOKYO = 'asia-northeast1'; // same as the region of firestore
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});

export const onCreateGear = functions.region(REGION_TOKYO).firestore
	.document('/gear/{gearId}')
	.onCreate(async (snapshot, context) => {
		console.log('on gear create');
		return null;
	});

export const onUpdateMember = functions.region(REGION_TOKYO).firestore
	.document('/member/{memberId}')
	.onUpdate(async (change, context) => {
		// check categories overall update
		const oldCategories = change?.before?.data()?.categories;
		const newCategories = change?.after?.data()?.categories;
		if(JSON.stringify(oldCategories) !== JSON.stringify(newCategories)) {
			await Promise.all(getAllHooksPromises('onCategoriesUpdate', {
				userUid: change.after.ref.id,
				categories: newCategories,
			}));
		}

		// check new created categories
		const createdCategoryUuidList = _.difference(_.map(newCategories, 'uuid'), _.map(oldCategories, 'uuid'));
		if(createdCategoryUuidList.length) {
			await Promise.all(getAllHooksPromises('onCategoriesCreate', {
				userUid: change.after.ref.id,
				categories: _.filter(newCategories, category => {
					return _.includes(createdCategoryUuidList, category.uuid);
				}),
			}));
		}
		// check deleted categories
		const deletedCategoryUuidList = _.difference(_.map(oldCategories, 'uuid'), _.map(newCategories, 'uuid'));
		if(deletedCategoryUuidList.length) {
			await Promise.all(getAllHooksPromises('onCategoriesDelete', {
				userUid: change.after.ref.id,
				categories: _.filter(oldCategories, category => {
					return _.includes(deletedCategoryUuidList, category.uuid);
				}),
			}));
		}
	});
