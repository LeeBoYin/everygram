<template>
	<MainLayout :user="user" :page-list="pageList" />
</template>

<script>
import MainLayout from '@components/MainLayout';
export default {
	components: {
		MainLayout,
	},
	computed: {
		pageList() {
			return [
				{
					name: 'Gears',
					icon: 'category',
					text: lang('title_gears'),
				},
				{
					name: 'Collections',
					icon: 'collections_bookmark',
					text: lang('title_collections'),
				},
				{
					name: 'Trips',
					icon: 'landscape',
					text: lang('title_trips'),
				},
				{
					name: 'Wishes',
					icon: 'favorite_border',
					text: lang('title_wishes'),
				},
				{
					name: 'Archives',
					icon: 'archive',
					text: lang('title_archives'),
				},
				{
					name: 'Settings',
					icon: 'settings',
					text: lang('title_settings'),
				},
			];
		},
		...mapGetters('user', [
			'user',
		]),
	},
};
</script>
