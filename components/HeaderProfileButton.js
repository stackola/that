import React, { Component } from "react";
import colors from "that/colors";
import Icon from "react-native-vector-icons/EvilIcons";
import { View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

class HeaderProfileButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{ flex: 1, alignItems: "center" }}
        onPress={() => {
          this.props.navigation.navigate("EditProfile");
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon name="user" size={25} color={colors.text} />
        </View>
        <Text
          numberOfLines={1}
          style={{
            color: colors.text,
            paddingBottom: 8,
            fontSize: 12
          }}
        >
          {this.props.user.username || "Anon"}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(HeaderProfileButton);
