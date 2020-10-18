import * as admin from 'firebase-admin';

export async function deleteGearPhoto(payload: { deletingPhotoFileName: string }) {
	if(!payload.deletingPhotoFileName) {
		return null;
	}
	return admin.storage().bucket().file(`gear/${ payload.deletingPhotoFileName }`).delete();
}
