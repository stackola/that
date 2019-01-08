import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";

import { withNavigation } from "react-navigation";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from "react-native";

class ReadMoreButton extends PureComponent {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate({
            routeName: "SingleComment",
            params: {
              commentPath: this.props.path,
              sort: this.props.sort || "time"
            },
            key: this.props.path
          });
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 40,
          backgroundColor: "red",
          marginLeft: 40,
          backgroundColor: colors.postBackground,
          marginBottom: 2,
          borderRightWidth: 0,
          marginRight: 0,
          borderRightColor: colors.upvote
        }}
      >
        <Text style={{ color: colors.text }}>Load replies</Text>
      </TouchableOpacity>
    );
  }
}
export default withNavigation(ReadMoreButton);
