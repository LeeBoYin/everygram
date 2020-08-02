import { errorMessageLang } from '@libs/lang';

const state = {
	user: null,
};

const getters = {
	isSignedIn(state) {
		return !!state.user;
	},
	isUserHasPassword(state) {
		return _.some(_.get(state.user, 'providerData', []), userInfo => {
			return userInfo.providerId === 'password';
		});
	},
	user(state, getter, rootState) {
		if(!state.user) {
			return {};
		}
		const photoURL = _.get(rootState.member, ['member', 'photoURL']) || _.get(state.user, 'photoURL') || constant('DEFAULT_MEMBER_PHOTO_URL');
		return _.assign(_.pickBy(state.user), {
			photoURL,
		});
	},
};

const mutations = {
	clearUser(state) {
		state.user = null;
	},
	setUser(state, user) {
		state.user = _.assign({}, user);
	}
};

const actions = {
	async onSignIn(context, user) {
		context.commit('setUser', user);
		await context.dispatch('member/init', null, { root: true });
	},
	async resetPassword(context, payload) {
		try {
			await firebase.auth().confirmPasswordReset(payload.code, payload.newPassword);
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async sendPasswordResetEmail(context, email) {
		try {
			await firebase.auth().sendPasswordResetEmail(email);
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async signInWithEmail(context, payload) {
		try {
			await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();
		try {
			await firebase.auth().signInWithPopup(provider);
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async signUpWithEmail(context, payload) {
		try {
			await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
			await context.dispatch('updateProfile', {
				displayName: payload.name,
			});
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async updatePassword(context, { currentPassword, newPassword }) {
		const currentUser = firebase.auth().currentUser;
		if(!currentUser) {
			throw 'user not exist';
		}
		try {
			const credential = firebase.auth.EmailAuthProvider.credential(
				currentUser.email,
				currentPassword
			);
			await currentUser.reauthenticateWithCredential(credential);
			await currentUser.updatePassword(newPassword);
		} catch (e) {
			throw errorMessageLang(e.code);
		}
	},
	async updateProfile(context, payload) {
		const currentUser = firebase.auth().currentUser;
		if(!currentUser) {
			throw 'user not exist';
		}
		try {
			await currentUser.updateProfile(_.pick(payload, ['displayName', 'photoURL']));
			context.commit('setUser', currentUser);
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async init(context) {
		await new Promise((resolve) => {
			firebase.auth().onAuthStateChanged(async (user) => {
				if (user) {
					// User is signed in.
					await context.dispatch('onSignIn', user);
				} else {
					// User is signed out.
					await context.dispatch('onSignOut');
				}
				resolve();
			});
		});
	},
	onSignOut(context) {
		context.commit('clearUser');
		context.dispatch('member/onSignOut', null, { root: true });
	},
	async signOut() {
		await firebase.auth().signOut();
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
