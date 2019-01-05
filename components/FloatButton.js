import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "that/colors";
import { TouchableOpacity } from "react-native";

export default class FloatButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.props.onPress) {
            this.props.onPress();
          }
        }}
        style={{
          backgroundColor: colors.floatbutton,
          width: 60,
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          position: "absolute",
          right: 10,
          bottom: 10,
          borderRadius: 60,
          zIndex: 2
        }}
      >
        <Icon name="plus" size={25} color={"white"} />
      </TouchableOpacity>
    );
  }
}
