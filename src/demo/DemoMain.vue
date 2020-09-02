<template>
	<MainLayout :user="user" :page-list="pageList" />
</template>

<script>
import MainLayout from '@components/MainLayout';
export default {
	components: {
		MainLayout,
	},
	data() {
		return {
			user: {
				photoURL: constant('DEFAULT_MEMBER_PHOTO_URL'),
				displayName: 'LIN PEI ZHEN',
			},
			pageList: [
				{
					name: 'DemoGears',
					icon: 'category',
					text: '裝備庫',
				},
				{
					name: 'DemoCollections',
					icon: 'collections_bookmark',
					text: '裝備組合',
				},
				{
					name: 'DemoTrips',
					icon: 'landscape',
					text: '行程裝備',
				},
				{
					name: 'DemoWishes',
					icon: 'favorite_border',
					text: '願望清單',
				},
				{
					name: 'DemoArchives',
					icon: 'archive',
					text: '已封存',
				},
				{
					name: 'DemoSettings',
					icon: 'settings',
					text: '設定',
				},
			],
		};
	},
};
</script>
