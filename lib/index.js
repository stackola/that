import firebase from "react-native-firebase";

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
		posts: [],
		comments: [],
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
	sendVote(data).then(()=>{}).catch(()=>{})
}