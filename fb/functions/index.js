const functions = require("firebase-functions");
var admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.post = functions.https.onCall((data, context) => {
	// Authentication / user information is automatically added to the request.
	const uid = context.auth.uid;
	const name = context.auth.token.name || null;
	const picture = context.auth.token.picture || null;
	const email = context.auth.token.email || null;

	if (!context.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		return { error: "Not authenticated" };
	}

	// TODO: Check ban list. Check allow anonymous. Check if either home town or in raidus.
	const title = data.title;
	const text = data.text;
	const image = data.image;
	const group = data.group;
	var db = admin.firestore();
	let newPost = db
		.collection("groups")
		.doc(group)
		.collection("posts")
		.doc();

	return newPost
		.set({
			id: newPost.id,
			title,
			text,
			image,
			comments: 0,
			downvotes: 0,
			upvotes: 0,
			group,
			user: db.collection("users").doc(uid)
		})
		.then(() => {
			return { status: "ok" };
		});
});

exports.vote = functions.https.onCall((data, context) => {
	const uid = context.auth.uid;
	const name = context.auth.token.name || null;
	const picture = context.auth.token.picture || null;
	const email = context.auth.token.email || null;

	if (!context.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		return { error: "Not authenticated" };
	}

	let path = data.path;
	let vote = data.vote;
	var db = admin.firestore();
	let ref = db.doc(path);
	return db
		.runTransaction(t => {
			return t.get(ref).then((s)=>{
				let snap = s.data();
				let hasUpped = snap.upvoters && snap.upvoters.includes(uid);
				let hasDowned = snap.downvoters && snap.downvoters.includes(uid);
				let upvotes = snap.upvotes||0;
				let upvoters = snap.upvoters||[];
				let downvotes = snap.downvotes||0;
				let downvoters = snap.downvoters||[];
				if (vote == "up") {
					console.log("voting up");
					if (hasDowned == true) {
						//remove downvote, add upvote
						//applyVote(data.path, 1, -1);
						upvotes++;
						downvotes--;
						downvoters=downvoters.filter((u)=>{return u!=uid});
						upvoters.push(uid);
					} else if (hasUpped == true) {
						//remove upvote
						//applyVote(data.path, -1, 0);
						upvotes--;
						upvoters=upvoters.filter((u)=>{return u!=uid});
					} else {
						//add upvote
						//applyVote(data.path, 1, 0);
						//
						//addUpvote(data.id).then(() => {
						//	applyVote(data.path, 1, 0);
						//});
						upvotes++;
						upvoters.push(uid);
					}
				} else {
					if (hasDowned) {
						//remove downvote
						downvotes--;
						downvoters=downvoters.filter((u)=>{return u!=uid});
					} else if (hasUpped) {
						//remove upvote, add downvote
						//applyVote(data.path, -1, +1);
						upvotes--;
						downvotes++;
						upvoters=upvoters.filter((u)=>{return u!=uid});
						downvoters.push(uid);
					} else {
						//add downvote
						//applyVote(data.path, 0, +1);
						downvotes++;
						downvoters.push(uid);
					}
				}
				t.update(ref, { upvotes, downvotes, upvoters, downvoters });
			});
		})
		.then(result => {
			console.log("Transaction success!");
		})
		.catch(err => {
			console.log("Transaction failure:", err);
		});
});

exports.comment = functions.https.onCall((data, context) => {
	// Authentication / user information is automatically added to the request.
	const uid = context.auth.uid;
	const name = context.auth.token.name || null;
	const picture = context.auth.token.picture || null;
	const email = context.auth.token.email || null;

	if (!context.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		return { error: "Not authenticated" };
	}

	// TODO: Check ban list. Check allow anonymous. Check if either home town or in raidus.
	const text = data.text;
	const path = data.path;
	const image = data.image;
	var db = admin.firestore();
	let newComment = db
		.doc(path)
		.collection("comments")
		.doc();

	return newComment
		.set({
			id: newComment.id,
			text,
			image,
			downvotes: 0,
			upvotes: 0,
			user: db.collection("users").doc(uid)
		})
		.then(() => {
			let ref = db.doc(path);
			return db
				.runTransaction(t => {
					return t.get(ref).then(doc => {
						// Add one person to the city population
						var comments = (doc.data().comments||0) + 1;

						t.update(ref, { comments: comments });
					});
				})
				.then(result => {
					console.log("Transaction success!");
					return { status: "ok" };
				})
				.catch(err => {
					console.log("Transaction failure:", err);
				});
		});
});
