import React, { Component } from "react";
import colors from "that/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
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
