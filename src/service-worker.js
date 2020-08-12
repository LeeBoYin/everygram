import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
// import { CacheFirst } from 'workbox-strategies'; // seems has some problem
// import { ExpirationPlugin } from 'workbox-expiration';

// precache webpack output dist files
const wbManifest = self.__WB_MANIFEST;
const precacheFiles = _.filter(wbManifest, file => {
	return _.some([
		'index.html',
		'manifest.pwa.json',
		'static/images',
	], path => {
		return file.url.includes(path);
	});
});
precacheAndRoute(precacheFiles);

// This assumes /index.html has been precached.
const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler);
registerRoute(navigationRoute);

// script style cache
registerRoute(
	({ request }) => {
		if(request.destination === 'script' || request.destination === 'style') {
			console.log('load script or style from cache', request);
			return true;
		}
		return false;
	},
	new StaleWhileRevalidate({
		cacheName: 'static-resources',
	})
	// new CacheFirst({
	// 	cacheName: 'static-resources',
	// 	plugins: [
	// 		new ExpirationPlugin({
	// 			// Only cache requests for a week
	// 			maxAgeSeconds: 7 * 24 * 60 * 60,
	// 			// Only cache 10 requests.
	// 			// maxEntries: 10,
	// 		}),
	// 	]
	// })
);

// image cache
registerRoute(
	({ request, url }) => {
		if(request.destination === 'image') {
			console.log('load image from cache', request, url);
			return true;
		}
		return false;
	},
	new StaleWhileRevalidate({
		cacheName: 'image-resources',
	})
);
