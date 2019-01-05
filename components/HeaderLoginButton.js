import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import HeaderDropdown from "that/components/HeaderDropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";

class HeaderLoginButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.upvote
        }}
        onPress={() => {
          this.props.navigation.navigate("EditProfile");
        }}
      >
        <Icon name="login-variant" color={colors.text} size={25} />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(HeaderLoginButton);
