import { errorMessageLang, getDefaultLanguage, updateCurrentLanguage } from '@libs/lang';
import settingsConfig from '@/settingsConfig';

const state = {
	member: null, // member data from firestore
	memberRef: null,
};

const getters = {
	memberSettings(state) {
		const defaultSettings = _.assign(_.cloneDeep(settingsConfig.default), {
			language: getDefaultLanguage(),
		});
		if(!state.member) {
			return defaultSettings;
		}
		const memberSettings = _.assign({}, defaultSettings, _.pick(state.member, _.keys(defaultSettings)));
		updateCurrentLanguage(memberSettings.language);
		return memberSettings;
	},
};

const mutations = {
	setMember(state, member) {
		state.member = member;
	},
	setMemberRef(state, memberRef) {
		state.memberRef = memberRef;
	},
};

const actions = {
	async createMember(context) {
		if(context.state.member) {
			throw 'member exist';
		}
		try {
			await context.state.memberRef.set({
				createTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
				loadCount: 0,
			});
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async getMember(context) {
		try {
			const memberSnapshot = await context.state.memberRef.get();
			if(!memberSnapshot.exists) {
				return;
			}
			context.commit('setMember', memberSnapshot.data());
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async updateMember(context, updateObj) {
		try {
			context.state.memberRef.update(updateObj).then(() => {
				// update successfully written to the backend
			});
			// get member and update state.member
			await context.dispatch('getMember');
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async init(context) {
		const user = context.rootState.user.user;
		if(!user) {
			throw 'user not defined';
		}

		context.commit('setMemberRef', context.rootState.db.collection('member').doc(user.uid));
		await context.dispatch('getMember');
		if(!context.state.member) {
			await context.dispatch('createMember');
			await context.dispatch('getMember');
		}
		context.dispatch('refreshMemberDataOnInit');
	},
	async refreshMemberDataOnInit(context) {
		const userAgent = window.navigator.userAgent;
		const displayMode = context.rootState.displayMode;
		const updateData = {
			displayModes: firebase.firestore.FieldValue.arrayUnion(displayMode),
			lastDisplayMode: displayMode,
			lastUserAgent: userAgent,
			lastVisitTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
			loadCount: firebase.firestore.FieldValue.increment(1),
			userAgents: firebase.firestore.FieldValue.arrayUnion(userAgent),
		};

		// set default settings
		_.forEach(_.keys(settingsConfig.default), settingKey => {
			if(!_.get(context.state.member, [settingKey])) {
				updateData[settingKey] = _.get(context.getters.memberSettings, [settingKey]);
				if(settingKey === 'categories') {
					updateData[settingKey] = _.map(updateData[settingKey], category => {
						return {
							...category,
							uuid: uuid(),
						};
					});
				}
			}
		});

		await context.dispatch('updateMember', updateData);
	},
	onSignOut(context) {
		context.commit('setMemberRef', null);
		context.commit('setMember', null);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
