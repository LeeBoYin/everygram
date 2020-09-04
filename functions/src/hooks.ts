import * as gearListHandlers from './handlers/gearList';
const hooks = {
	'onCategoriesUpdate': [
		gearListHandlers.updateAllCategoriesInGearLists,
	],
	'onCategoriesCreate': [
		// gearListHandlers.addCategoriesToGearList,
	],
	'onCategoriesDelete': [
		gearListHandlers.removeCategoriesFromGearList,
	],
};

export const getAllHooksPromises = (event: keyof typeof hooks, payload: object) => {
	const promises: Promise<any>[] = [];
	hooks[event].forEach((handler: Function) => {
		promises.push(new Promise(async (resolve) => {
			await handler(payload);
			resolve();
		}));
	});
	return promises;
};
