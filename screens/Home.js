import React, { Component } from "react";
import TopBar from "that/components/TopBar";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import { View, TouchableOpacity, Text } from "react-native";
import PostList from "that/components/PostList";
import { withInAppNotification } from "that/components/inappnoti";
import firebase from "react-native-firebase";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(p) {
    super(p);
    this.state = { creating: false, posts: [], refreshing: false };
  }
  componentDidMount() {
    firebase
      .notifications()
      .getInitialNotification()
      .then(notificationOpen => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notification = notificationOpen.notification;
          console.log("Got data", notification);
          this.processNotification(notification);
        }
      });
    //subscribe to a sub.
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log(notification);
        // Process your notification as required
        this.props.showNotification({
          title: notification._title,
          vibrate: false,
          message: notification._body,
          onPress: () => {
            console.log("GOING THERE!");
            this.processNotification(notification);
          },
          onClose: () => {}
        });
      });
  }
  getParentPath(path) {
    let l = path.split("/").length;
    return path
      .split("/")
      .filter((a, i) => {
        return i < l - 2;
      })
      .join("/");
  }
  processNotification(noti) {
    if (noti && noti.data) {
      noti = noti.data;
      if (noti.type == "reply") {
        if (noti.path.split("/").length <= 5) {
          let tp = noti.path.split("/");
          this.props.navigation.navigate({
            routeName: "Details",
            params: {
              postId: tp[3],
              group: tp[1]
            },
            key: tp[3]
          });
          //redirect to post.
        } else {
          this.props.navigation.navigate({
            routeName: "SingleComment",
            params: {
              commentPath: noti.path,
              sort: "time"
            },
            key: noti.path + "time"
          });
        }
        //navigate to thing.
      }
    }
  }

  _onRefresh = () => {
    console.log("aye");
    this.setState({ refreshing: true });
    this.props.subHomePosts().then(() => {
      this.setState({ refreshing: false });
    });
  };
  componentWillUnmount() {
    this.notificationListener();
  }
  render() {
    return (
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <TopBar
          title={"Home"}
          navigate={(a, b, c) => {
            this.props.navigation.navigate({
              routeName: a,
              params: b,
              key: c
            });
          }}
        />

        <View style={{ flex: 1 }}>
          <PostList posts={this.props.homePosts} realtime={true} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    homePosts: state.homePosts,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default withInAppNotification(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeScreen)
);
