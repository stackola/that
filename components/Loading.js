import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

export default class Loading extends PureComponent {
  render() {
    return (
      <View
        style={{
          height: 80,
          backgroundColor: colors.backgroundColor,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }
}
