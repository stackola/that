const functions = require("firebase-functions");
var admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function makeSlug(v) {
  return v.toLowerCase().replace(/ /g, "");
}

exports.group = functions.https.onCall((data, context) => {
  // Authentication / user information is automatically added to the request.
  //const uid ="HJHUyMWkpUTIWLj1QDYhSBB8bDG3";

  const uid = context.auth.uid;

  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: "Not authenticated" };
  }

  // TODO CHECK IF USER CAN MAKE GROUP, validate
  const name = data.name || "NONAME";
  const slug = makeSlug(name);
  var db = admin.firestore();
  var ref = db.collection("groups").doc(slug);
  return ref.get().then(s => {
    if (s.exists) {
      return { error: "Group exists" };
    } else {
      return ref
        .set(
          Object.assign({}, data, {
            name: name,
            slug: slug,
            time: admin.firestore.FieldValue.serverTimestamp(),
            createdBy: db.collection("users").doc(uid)
          })
        )
        .then(res => {
          console.log(res);
          return { status: "ok", slug: slug };
        });
    }
  });
});

function sendNotification(userId, title, text, data) {
  admin
    .firestore()
    .collection("users")
    .doc(userId)
    .get()
    .then(user => {
      user = user.data();

      if (user.notifications && user.token) {
        admin
          .messaging()
          .send({
            data: data || {},
            android: { notification: { channelId: "test-channel" } },
            token: user.token,
            notification: {
              title: title,
              body: text
            }
          })
          .then(response => {})
          .catch(error => {});
      }
    });
}

function getHourIndex(d) {
  var datestring =
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2) +
    "-" +
    ("0" + d.getHours()).slice(-2) +
    "-";
  return datestring;
}

function getDayIndex(d) {
  var datestring =
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2) +
    "-";
  return datestring;
}

function getMonthIndex(d) {
  var datestring =
    d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-";
  return datestring;
}

function getYearIndex(d) {
  var datestring = d.getFullYear() + "-";
  return datestring;
}

function padPoints(n) {
  n = 1000000 + n;
  let pad = "00000000";
  return (pad + n).slice(-pad.length);
}

exports.post = functions.https.onCall((data, context) => {
  // Authentication / user information is automatically added to the request.
  // const uid ="mntjlOUpd6SjfQmE1GhF820Ass62";

  const uid = context.auth.uid;

  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: "Not authenticated" };
  }

  // TODO: Check ban list. Check allow anonymous. Check if either home town or in raidus.
  const title = data.title || "";
  const text = data.text || "";
  const image = data.image || null;
  const group = data.group;
  var db = admin.firestore();

  let newPost = db
    .collection("groups")
    .doc(group)
    .collection("posts")
    .doc();
  let now = new Date();
  return newPost
    .set({
      id: newPost.id,
      title,
      text,
      image,
      comments: 0,
      downvotes: 0,
      upvotes: 0,
      points: 0,
      group,
      user: db.collection("users").doc(uid),
      time: now,
      hourIndex: getHourIndex(now) + padPoints(0),
      dayIndex: getDayIndex(now) + padPoints(0),
      monthIndex: getMonthIndex(now) + padPoints(0),
      yearIndex: getYearIndex(now) + padPoints(0)
    })
    .then(() => {
      console.log(newPost.path.toString());
      addPostToUser(newPost.path.toString(), uid);
      return { status: "ok", postId: newPost.id };
    });
});

exports.vote = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;

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
      return t.get(ref).then(s => {
        let snap = s.data();
        let hasUpped = snap.upvoters && snap.upvoters.includes(uid);
        let hasDowned = snap.downvoters && snap.downvoters.includes(uid);
        let upvotes = snap.upvotes || 0;
        let upvoters = snap.upvoters || [];
        let downvotes = snap.downvotes || 0;
        let downvoters = snap.downvoters || [];
        let time = snap.time;
        if (vote == "up") {
          //console.log("voting up");
          if (hasDowned == true) {
            //remove downvote, add upvote
            //applyVote(data.path, 1, -1);
            upvotes++;
            downvotes--;
            downvoters = downvoters.filter(u => {
              return u != uid;
            });
            upvoters.push(uid);
          } else if (hasUpped == true) {
            //remove upvote
            //applyVote(data.path, -1, 0);
            upvotes--;
            upvoters = upvoters.filter(u => {
              return u != uid;
            });
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
            downvoters = downvoters.filter(u => {
              return u != uid;
            });
          } else if (hasUpped) {
            //remove upvote, add downvote
            //applyVote(data.path, -1, +1);
            upvotes--;
            downvotes++;
            upvoters = upvoters.filter(u => {
              return u != uid;
            });
            downvoters.push(uid);
          } else {
            //add downvote
            //applyVote(data.path, 0, +1);
            downvotes++;
            downvoters.push(uid);
          }
        }
        t.update(ref, {
          upvotes,
          downvotes,
          upvoters,
          downvoters,
          points: upvotes - downvotes,
          hourIndex: getHourIndex(time) + padPoints(upvotes - downvotes),
          dayIndex: getDayIndex(time) + padPoints(upvotes - downvotes),
          monthIndex: getMonthIndex(time) + padPoints(upvotes - downvotes),
          yearIndex: getYearIndex(time) + padPoints(upvotes - downvotes)
        });
      });
    })
    .then(result => {
      //console.log("Transaction success!");
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
  const image = data.image || {};
  var db = admin.firestore();
  console.log(path);
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
      points: 0,
      upvotes: 0,
      user: db.collection("users").doc(uid),
      time: new Date()
    })
    .then(() => {
      let ref = db.doc(path);
      return db
        .runTransaction(t => {
          return t.get(ref).then(doc => {
            // Add one person to the city population
            let isPost = path.split("/").length <= 5;
            console.log(path);
            sendNotification(
              doc.data().user.id,
              "New " + (isPost ? "post" : "comment") + " reply!",
              "Someone just replied to your " + (isPost ? "post." : "comment."),
              { type: "reply", path: path }
            );
            var comments = (doc.data().comments || 0) + 1;

            t.update(ref, { comments: comments });
          });
        })
        .then(result => {
          //console.log("Transaction success!");
          dispatchEvent(
            {
              type: "commentReply",
              data: {
                parent: ref,
                child: newComment,
                otherUser: db.collection("users").doc(uid)
              }
            },
            ref
          );
          addCommentToUser(newComment.path.toString(), uid);

          return { status: "ok", newComment: newComment.path.toString() };
        })
        .catch(err => {
          console.log("Transaction failure:", err);
        });
    });
});

function addPostToUser(path, userId) {
  var db = admin.firestore();
  console.log(path);
  db.collection("users")
    .doc(userId)
    .collection("posts")
    .doc()
    .set({
      post: db.doc(path),
      time: new Date()
    });
}
function addCommentToUser(path, userId) {
  var db = admin.firestore();
  db.collection("users")
    .doc(userId)
    .collection("comments")
    .doc()
    .set({
      comment: db.doc(path),
      time: new Date()
    });
}

function dispatchEvent(event, ref) {
  //Possibly do some notification stuff ayyy
  var db = admin.firestore();
  ref.get().then(doc => {
    console.log("adding", doc.data());
    db.collection("users")
      .doc(doc.data().user.id)
      .collection("events")
      .doc()
      .set({
        event: event,
        read: false,
        time: new Date()
      });
  });
  /*
		.collection("users")
		.doc(userId)
		
		*/
}
