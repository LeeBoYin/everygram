// configuration
import { configure } from 'vee-validate';
configure({
	mode: 'eager',
	bails: true,
	skipOptional: true,
	useConstraintAttrs: true,
	classes: {},
});

// localization
import { localize } from 'vee-validate';
import localeZhTW from 'vee-validate/dist/locale/zh_TW';
import localeEn from 'vee-validate/dist/locale/en';
localize('zh_TW', localeZhTW);
localize('en', localeEn);

// rules
import { extend } from 'vee-validate';

import { required } from 'vee-validate/dist/rules';
extend('required', required);

import { email } from 'vee-validate/dist/rules';
extend('email', email);

import { min } from 'vee-validate/dist/rules';
extend('min', min);

import { alpha_num } from 'vee-validate/dist/rules';
extend('alpha_num', alpha_num);

export const setValidationLocale = (language) => {
	const localeMap = {
		'zh-tw': 'zh_TW',
		'en-us': 'en',
	};
	localize(localeMap[language] || 'en');
};
