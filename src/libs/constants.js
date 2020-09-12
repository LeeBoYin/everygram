const CONSTANTS = {
	PASSWORD_RULES: 'required|alpha_num|min:6',
	DEFAULT_MEMBER_PHOTO_URL: '/static/images/placeholder-user.jpg',
	STORAGE_PATH_TO_GEAR_PHOTO: 'gear',
	ROLE_OWNER: 'owner',
};

export const constant = (key) => {
	return CONSTANTS[key];
};
