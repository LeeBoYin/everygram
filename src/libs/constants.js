const CONSTANTS = {
	PASSWORD_RULES: 'required|alpha_num|min:6',
	DEFAULT_MEMBER_PHOTO_URL: '/static/images/placeholder-user.jpg',
	STORAGE_PATH_TO_GEAR_PHOTO: 'gear',
	ROLE_OWNER: 'owner',
	CATEGORY_OTHERS: 'others',
	UNIT_SYSTEM_METRIC: 'metric',
	UNIT_SYSTEM_IMPERIAL: 'imperial',
	GEAR_LIST_MODE_DEFAULT: 'default',
	GEAR_LIST_MODE_SORT: 'sort',
	GEAR_LIST_MODE_SELECT: 'select',
	ICON_TYPE_MATERIAL: 'material',
};

export const constant = (key) => {
	return CONSTANTS[key];
};
