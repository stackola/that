import React from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import { ActivityIndicator, StatusBar, View } from "react-native";

import firebase from "react-native-firebase";
import colors from "that/colors";
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const channel = new firebase.notifications.Android.Channel(
      "test-channel",
      "Test Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("My apps test channel");
    firebase.notifications().android.createChannel(channel);
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        this.props.userSubscribe(() => {
          this.props.navigation.navigate("Home");
          this.props.subHomePosts();
        });
        this.props.eventsSubscribe();
        this.props.settingsSubscribe();
      });
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ActivityIndicator />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
