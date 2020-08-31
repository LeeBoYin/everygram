import { trimPathSlash } from '@libs/utils';
import { errorMessageLang } from '@libs/lang';

export const uploadFile = (payload = {}) => {
	return new Promise((resolve, reject) => {
		if(!payload.file) {
			reject('empty file');
		}

		const fileName = payload.fileName || payload.file.name;
		const storageRef = firebase.storage().ref();
		const fullPath = payload.path ? `${ trimPathSlash(payload.path) }/${ fileName }` : fileName;
		const uploadTask = storageRef.child(fullPath).put(payload.file, payload.metadata);

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			const state = snapshot.state;
			if(_.isFunction(payload.onStateChange)) {
				payload.onStateChange({
					progress,
					state,
				});
			}
		}, (e) => {
			console.log(e);
			reject(errorMessageLang(e.code));
		}, () => {
			// Upload completed successfully, now we can get the download URL
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				resolve(downloadURL);
			});
		});
	});
};
