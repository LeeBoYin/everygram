import * as gearListHandlers from './handlers/gearList';
import * as storageHandlers from './handlers/storage';
const hooks = {
	'onCategoriesUpdate': [
		gearListHandlers.updateCategoriesInGearLists,
	],
	'onCategoriesCreate': [],
	'onCategoriesDelete': [
		gearListHandlers.removeCategoriesFromGearList,
	],
	'onGearCategoryUpdate': [
		gearListHandlers.moveGearToCategory,
	],
	'onGearUpdate': [
		gearListHandlers.updateGearDataInGearLists,
	],
	'onGearPhotoUpdate': [
		storageHandlers.deleteGearPhoto,
	],
	'onGearDelete': [
		gearListHandlers.removeGearFromGearLists,
		storageHandlers.deleteGearPhoto,
	],
};

export const getAllHooksPromises = (event: keyof typeof hooks, payload: object) => {
	const promises: Promise<any>[] = [];
	hooks[event].forEach((handler: Function) => {
		console.log(`hook: ${ event } -> ${ handler.name }`);
		promises.push(new Promise(async (resolve) => {
			await handler(payload);
			resolve();
		}));
	});

	return promises;
};
