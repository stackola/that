import React, { Component } from "react";
import colors from "that/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

class HeaderNotificationButton extends Component {
  getEventCount() {
    let eventCount =
      this.props.events && this.props.events.length > 0
        ? this.props.events.filter(e => {
            return !e.read;
          }).length
        : 0;
    return eventCount;
  }
  render() {
    return (
      <TouchableOpacity
        style={{
          alignItems: "center",
          borderLeftWidth: 0,
          borderColor: colors.seperator,
          flex: 1
        }}
        onPress={() => {
          this.props.navigation.navigate("Events");
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon name="coin" size={20} color={colors.upvote} />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: colors.text,
            paddingBottom: 8
          }}
        >
          1.523
          {/*this.props.user.points+1500000 || 0*/}
        </Text>
        {this.getEventCount() > 0 && (
          <View
            style={{
              backgroundColor: "red",
              zIndex: 1,
              height: 15,
              width: 15,
              borderRadius: 15,
              position: "absolute",
              top: 5,
              left: 36,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: colors.text,
                flex: 1,
                fontSize: 9
              }}
            >
              {this.getEventCount()}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

export default withNavigation(HeaderNotificationButton);
