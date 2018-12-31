import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator,createAppContainer } from 'react-navigation';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from 'that/redux/reducers';


import AuthLoadingScreen from "that/screens/AuthLoadingScreen";
import SignInScreen from "that/screens/SignInScreen";

const loggerMiddleware = createLogger({
  predicate: (getState, action) => true,
});

function configureStorage(initialState) {
  let enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
  let store = createStore(reducer, initialState, enhancer);
  return store;
}

let store = configureStorage({});

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.



class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}
class OtherScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Other!</Text>
      </View>
    );
  }
}






const AppStack = createBottomTabNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

let Navigator = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
export default class MainApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }
}