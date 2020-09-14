export default function (data = {}) {
	const {
		userUid,
		categories,
	} = data;

	const order = {
		[constant('CATEGORY_OTHERS')]: [],
	};

	_.forEach(categories, category => {
		order[category.uuid] = [];
	});

	return {
		userUid,
		// keep order of gears in each category
		order,
		// copy of owner categories
		categories,
		// copy of gear data
		gearData: {},
	};
}
