import firebase from "react-native-firebase";
const uuidv4 = require("uuid/v4");
const sendPost = firebase.functions().httpsCallable("post");
const sendComment = firebase.functions().httpsCallable("comment");
const sendVote = firebase.functions().httpsCallable("vote");

export function getUID() {
	if (firebase.auth().currentUser !== null) {
		return firebase.auth().currentUser.uid;
	} else {
		return null;
	}
}

export function createUser(user) {
	let userId = getUID();
	user = {
		id: userId,
		gender: "D",
		postPoints: 0,
		commentPoints: 0,
		location: "",
		username: "Anon",
		...user
	};
	return firebase
		.firestore()
		.collection("users")
		.doc(userId)
		.set(user);

	//firebase.firestore().collection('users').doc(userId).set(user).then((res)=>{}).catch((err)=>{});
}

export function createPost(post) {
	sendPost(post)
		.then(res => {
			console.log("Yay!!");
			console.log(res);
		})
		.catch(err => {
			console.log("no!!");
			console.log(err);
		});
}

export function comment(comment) {
	sendComment(comment)
		.then(res => {
			console.log("Yay!!");
			console.log(res);
		})
		.catch(err => {
			console.log("no!!");
			console.log(err);
		});
}

export function vote(data) {
	sendVote(data)
		.then(() => {})
		.catch(() => {});
}

export function uploadImage(path, width, height,callback = null,fileType = "jpg") {
	var storage = firebase.storage();
	var storageRef = storage.ref();
	var imagesRef = storageRef.child("userUploads/" + getUID() + "/images");
	var fileName = uuidv4();
	var imageRef = imagesRef.child(fileName + "." + fileType);
	imageRef.putFile(path).then(function(snapshot) {
		console.log(snapshot);
		registerImage({
			path: snapshot.ref,
			url: snapshot.downloadURL,
			width: width,
			height: height
		}).then(() => {
			if (callback) {
				callback({
					width: width,
					height: height,
					path: snapshot.ref,
					url: snapshot.downloadURL,
					user: getUID()
				});
			}
		});
	});
}

function registerImage(snap) {
	let userId = getUID();
	image = {
		user: userId,
		path: snap.path.replace("/", ""),
		url: snap.url,
		width: snap.width,
		height: snap.height
	};
	console.log(image);
	return firebase
		.firestore()
		.doc(image.path)
		.set(image);
}
