import firebase from "react-native-firebase";
const uuidv4 = require("uuid/v4");
const sendPost = firebase.functions().httpsCallable("post");
const sendComment = firebase.functions().httpsCallable("comment");
const sendGroup = firebase.functions().httpsCallable("group");
const sendVote = firebase.functions().httpsCallable("vote");
import colors from "that/colors";
import store from "that/redux/store";

export function genderColor(gender) {
  return gender == "D" || !gender
    ? colors.otherGenders
    : gender == "M"
    ? colors.male
    : colors.female;
}
export function getUID() {
  if (firebase.auth().currentUser !== null) {
    return firebase.auth().currentUser.uid;
  } else {
    return null;
  }
}

export function subscribe(group) {
  firebase
    .firestore()
    .collection("users")
    .doc(getUID())
    .collection("subscriptions")
    .doc(group)
    .set({ group: firebase.firestore().doc("groups/" + group) });
}

export function unsub(group) {
  firebase
    .firestore()
    .collection("users")
    .doc(getUID())
    .collection("subscriptions")
    .doc(group)
    .delete();
}
export function getGroupList() {
  let uid = getUID();
  if (uid) {
    let state = store.getState();
    console.log(state);
    if (state.user.subs) {
      console.log("user got subs");
      console.log(state.user.subs);
      //fetch all user subs.
      return Promise.all(
        state.user.subs.map(g => {
          return firebase
            .firestore()
            .doc(g.path)
            .get()
            .then(s => {
              return s._data;
            });
        })
      ).then(r => {
        console.log("got that callback", r);
        return r;
      });
    } else {
      console.log("aint got no subs!");
      return getDefaults();
    }

    //user is logged in!
  } else {
    return getDefaults();
  }
}

function getDefaults() {
  return firebase
    .firestore()
    .collection("groups")
    .where("isDefault", "==", true)
    .get()
    .then(s => {
      console.log("got defaults", s);
      return s._docs.map(d => {
        return d._data;
      });
    });
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

export function createPost(post, cb = null) {
  sendPost(post)
    .then(res => {
      console.log("Yay!!");
      console.log(res);
      if (cb) {
        cb(res);
      }
    })
    .catch(err => {
      console.log("no!!");
      console.log(err);
    });
}

export function makeGroup(group, cb = null) {
  sendGroup(group)
    .then(res => {
      console.log("Yay!!");
      console.log(res);
      if (cb) {
        cb(res);
      }
    })
    .catch(err => {
      console.log("no!!");
      console.log(err);
    });
}

export function comment(comment, cb = null) {
  sendComment(comment)
    .then(res => {
      console.log("Yay!!");
      console.log(res);
      if (cb) {
        cb(res);
      }
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

export function uploadImage(
  path,
  width,
  height,
  callback = null,
  fileType = "jpg"
) {
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

export function markAllEventsRead() {
  let userId = getUID();
  return firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("events")
    .where("read", "==", false)
    .get()
    .then(d => {
      d._docs.map(doc => {
        doc._ref.update({ read: true });
      });
    });
}
