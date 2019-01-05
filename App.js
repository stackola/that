import React from "react";
import { Text, View } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { Provider } from "react-redux";


import AuthLoadingScreen from "that/screens/AuthLoadingScreen";
import SignInScreen from "that/screens/SignInScreen";
import Home from "that/screens/Home";
import Details from "that/screens/Details";
import Profile from "that/screens/Profile";
import Group from "that/screens/Group";
import Events from "that/screens/Events";
import ImageView from "that/screens/ImageView";
import EditProfile from "that/screens/EditProfile";
import SingleComment from "that/screens/SingleComment";
import CreateGroup from "that/screens/CreateGroup";

import store from "that/redux/store";

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

class OtherScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Other!</Text>
      </View>
    );
  }
}

const AppStack = createStackNavigator({
  Home: Home,
  Details: Details,
  SingleComment: SingleComment,
  Events: Events,
  EditProfile: EditProfile,
  Group: Group,
  ImageView: ImageView,
  Profile: Profile,
  CreateGroup: CreateGroup
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

let Navigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
export default class MainApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
