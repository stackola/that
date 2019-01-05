import React, { Component } from "react";
import colors from "that/colors";
import {
  View,
  TouchableOpacity,
  Text
} from "react-native";

import { withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
class Item extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ open: false }, () => {
            this.props.onPress && this.props.onPress();
          });
        }}
        style={{
          height: 50,
          borderBottomWidth: 2,
          flexDirection: "row",
          borderColor: colors.textMinor
        }}
      >
        <View style={{ flex: 1 }} />
        <View style={{ flex: 5, justifyContent: "center" }}>
          <Text style={{ color: colors.text, fontSize: 16 }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class GroupSelector extends Component {
  render() {
    return (
      <ScrollView
        style={{
          height: 200,
          backgroundColor: colors.seperator
        }}
      >
        <Item
          title={"Home"}
          onPress={() => {
            this.props.navigation.navigate({ routeName: "Home" });
          }}
        />
        <Item
          title={"General"}
          onPress={() => {
            this.props.navigation.navigate({
              routeName: "Group",
              params: { group: "general" },
              key: "general"
            });
          }}
        />
        <Item
          title={"Cars"}
          onPress={() => {
            this.props.navigation.navigate({
              routeName: "Group",
              params: { group: "cars" },
              key: "cars"
            });
          }}
        />
        <Item
          title={"Create a group!"}
          onPress={() => {
            this.props.navigation.navigate({ routeName: "CreateGroup" });
          }}
        />
      </ScrollView>
    );
  }
}

export default withNavigation(GroupSelector);
