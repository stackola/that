import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";

import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import colors from "that/colors";

import { View, TouchableOpacity, Text } from "react-native";

export default class Buttons extends Component {
  render() {
    return (
      <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
        {this.props.onClose && (
          <TouchableOpacity
            onPress={() => {
              this.props.onClose && this.props.onClose();
            }}
            style={{
              backgroundColor: colors.downvote,
              height: 40,
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: colors.text }}>
              <Entypo name="cross" size={20} />
            </Text>
          </TouchableOpacity>
        )}
        {this.props.onSend && (
          <TouchableOpacity
            style={{
              backgroundColor: colors.upvote,
              height: 40,
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              this.props.onSend && this.props.onSend();
            }}
          >
            <Text style={{ color: colors.text }}>
              <Feather name="send" size={20} />
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
