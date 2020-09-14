/*
* Gear
* 裝備的資料
* 不記錄分類，分類由 GearList 記錄
* 未來可能支援裝備共享（role）
* */
export default function (data = {}) {
	const {
		brand,
		manufacturedDate,
		model,
		name,
		ownerUserUid,
		photoFileName,
		photoURL,
		quantity,
		size,
		unitSystem,
		weight,
		note,
	} = data;

	return {
		role: {
			[ownerUserUid]: constant('ROLE_OWNER'),
		},
		brand,
		manufacturedDate,
		model,
		name,
		photoFileName,
		photoURL,
		quantity,
		size,
		unitSystem,
		weight,
		note,
		createTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
	};
}
