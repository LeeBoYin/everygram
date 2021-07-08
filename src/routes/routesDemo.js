export default [
	{
		path: '/demo/home' ,
		name: 'DemoHome',
		component: () => import(/* webpackChunkName: 'DemoHome' */ '@demo/DemoHome'),
		meta: {
			title: 'Demo Home',
		},
	},
	{
		path: '/demo/login' ,
		name: 'DemoLogin',
		component: () => import(/* webpackChunkName: 'DemoLogin' */ '@demo/DemoLogin'),
		meta: {
			title: 'Demo Login',
		},
	},
	{
		path: '/demo/main',
		name: 'DemoMain',
		component: () => import(/* webpackChunkName: 'DemoMain' */ '@demo/DemoMain'),
		children: [
			{
				path: '/demo/main',
				alias: '/demo/gears',
				name: 'DemoGears',
				component: () => import(/* webpackChunkName: 'DemoGears' */ '@demo/DemoGears'),
				meta: {
					title: 'Demo Gears',
				},
			},
			{
				path: '/demo/trips',
				name: 'DemoTrips',
				component: () => import(/* webpackChunkName: 'DemoTrips' */ '@demo/DemoTrips'),
				meta: {
					title: 'Demo Trips',
				},
			},
			{
				path: '/demo/collections',
				name: 'DemoCollections',
				component: () => import(/* webpackChunkName: 'DemoCollections' */ '@demo/DemoCollections'),
				meta: {
					title: 'Demo Collections',
				},
			},
			{
				path: '/demo/wishes',
				name: 'DemoWishes',
				component: () => import(/* webpackChunkName: 'DemoWishes' */ '@demo/DemoWishes'),
				meta: {
					title: 'Demo Wishes',
				},
			},
			{
				path: '/demo/archives',
				name: 'DemoArchives',
				component: () => import(/* webpackChunkName: 'DemoArchives' */ '@demo/DemoArchives'),
				meta: {
					title: 'Demo Archives',
				},
			},
			{
				path: '/demo/settings',
				name: 'DemoSettings',
				component: () => import(/* webpackChunkName: 'DemoSettings' */ '@demo/DemoSettings'),
				meta: {
					title: 'Demo Settings',
				},
			},
		],
	},
	{
		path: '/demo/settings/categories',
		name: 'DemoSettingsCategories',
		component: () => import(/* webpackChunkName: 'DemoSettingsCategories' */ '@demo/DemoSettingsCategories'),
		meta: {
			title: 'Demo Settings Categories',
		},
	},
	{
		path: '/demo/components' ,
		name: 'DemoComponents',
		component: () => import(/* webpackChunkName: 'DemoComponents' */ '@demo/DemoComponents'),
		meta: {
			title: 'Demo Components',
		},
	},
];
