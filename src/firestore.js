export const readData = (string, property, callbackTemplate ) => {
    return firebase.firestore().collection(string).orderBy(property).onSnapshot(callbackTemplate);
}

export const databaseOrder = (objOrder) => {
    return firebase.firestore().collection("order").add(objOrder);
}

export const editFirestore = (id, objEdit) => {
    return firebase.firestore().collection("order").doc(id).update(objEdit);
}

export const filterFirestore = (value, callbackTemplate) => {
    return firebase.firestore().collection("order").where("state", "==", value).orderBy('createdAt').onSnapshot(callbackTemplate);
}

