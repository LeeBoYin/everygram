import store from '@/store';
import Home from '@views/Home';
import Login from '@views/Login';
import SignIn from '@views/Login/SignIn';
import SignUp from '@views/Login/SignUp';
import ForgetPassword from '@views/Login/ForgetPassword';
import ResetPassword from '@views/Login/ResetPassword';
import ResetPasswordInvalid from '@views/Login/ResetPasswordInvalid';
import Main from '@views/Main';
import Gears from '@views/main/Gears';
import Trips from '@views/main/Trips';
import Collections from '@views/main/Collections';
import Wishes from '@views/main/Wishes';
import Archives from '@views/main/Archives';
import Settings from '@views/main/Settings';
import Categories from '@views/Settings/Categories';
import NotFound from '@views/NotFound';

const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			unsubscribe();
			resolve(user);
		}, reject);
	})
};

const untilInitialized = () => {
	return new Promise((resolve) => {
		if(store.state.isInitialized) {
			resolve();
			return;
		}
		const unwatch = store.watch(state => state.isInitialized, () => {
			unwatch();
			resolve();
		});
	});
};

const untilMemberLoaded = () => {
	return new Promise((resolve) => {
		if(store.state.member.member) {
			resolve();
			return;
		}
		const unwatch = store.watch(state => state.member.member, () => {
			unwatch();
			resolve();
		});
	});
};

export default [
	{
		path: '/',
		component: Main,
		beforeEnter: async (to, from, next) => {
			if (await getCurrentUser()) {
				await untilMemberLoaded();
				await untilInitialized();
				next();
			} else {
				next({
					name: 'SignIn',
				});
			}
		},
		children: [
			{
				path: '/',
				alias: '/gears',
				name: 'Gears',
				component: Gears,
				meta: {
					title: 'title_gears',
				},
			},
			{
				path: '/trips',
				name: 'Trips',
				component: Trips,
				meta: {
					title: 'title_trips',
				},
			},
			{
				path: '/collections',
				name: 'Collections',
				component: Collections,
				meta: {
					title: 'title_collections',
				},
			},
			{
				path: '/wishes',
				name: 'Wishes',
				component: Wishes,
				meta: {
					title: 'title_wishes',
				},
			},
			{
				path: '/archives',
				name: 'Archives',
				component: Archives,
				meta: {
					title: 'title_archives',
				},
			},
			{
				path: '/settings',
				name: 'Settings',
				component: Settings,
				meta: {
					title: 'title_settings',
				},
			},
		],
	},
	{
		path: '/settings/categories',
		name: 'SettingsCategories',
		component: Categories,
		beforeEnter: async ( to, from, next ) => {
			if ( await getCurrentUser() ) {
				await untilMemberLoaded();
				await untilInitialized();
				next();
			} else {
				next({
					name: 'SignIn',
				});
			}
		},
		meta: {
			title: 'title_settings_categories',
		},
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
		meta: {
			title: 'title_home',
		},
	},
	{
		path: '/login',
		component: Login,
		beforeEnter: async (to, from, next) => {
			if (await getCurrentUser()) {
				next({
					name: 'Gears',
					replace: true,
				});
			} else {
				next();
			}
		},
		children: [
			{
				path: '/sign-in',
				alias: '/login',
				name: 'SignIn',
				component: SignIn,
				meta: {
					title: 'title_sign_in',
				},
			},
			{
				path: '/sign-up',
				name: 'SignUp',
				component: SignUp,
				meta: {
					title: 'title_sign_up',
				},
			},
			{
				path: '/forget-password',
				name: 'ForgetPassword',
				component: ForgetPassword,
				meta: {
					title: 'title_forget_password',
				},
			},
			{
				path: '/reset-password',
				name: 'ResetPassword',
				component: ResetPassword,
				meta: {
					title: 'title_change_password',
				},
				beforeEnter: async (to, from, next) => {
					const code = to.query.code;
					try {
						to.params.email = await firebase.auth().verifyPasswordResetCode(code);
						next();
					} catch (e) {
						next({
							name: 'ResetPasswordInvalid',
							replace: true,
						});
					}
				},
			},
			{
				path: '/reset-password-invalid',
				name: 'ResetPasswordInvalid',
				component: ResetPasswordInvalid,
				meta: {
					title: 'title_reset_password_invalid',
				},
			},
		],
	},
	{
		path: '*' ,
		name: 'NotFound',
		component: NotFound,
		meta: {
			title: 'title_not_found',
		},
	},
];
