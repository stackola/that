import React, { Component } from "react";
import CommentReplyNotification from "that/components/CommentReplyNotification";
import colors from "that/colors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";

export default class Notification extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View
        style={{
          minHeight: 60,
          borderBottomWidth: 2,
          borderColor: colors.seperator,
          padding: 4,
          flexDirection: "row"
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon name={"reply"} size={30} color={colors.text} />
        </View>
        <View style={{ flex: 5 }}>
          <CommentReplyNotification data={this.props.data} />
        </View>
      </View>
    );
  }
}
