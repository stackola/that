import React, { Component } from "react";
import colors from "that/colors";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { getGroupList } from "that/lib";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Icon
            size={40}
            name={this.props.icon || "rocket"}
            color={this.props.color || colors.text}
          />
        </View>
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
  constructor(p) {
    super(p);
    this.state = { groups: null };
  }
  componentDidMount() {
    getGroupList().then(res => {
      console.log("received", res);
      this.setState({ groups: res });
    });
  }
  render() {
    return (
      <ScrollView
        style={{
          maxHeight: 200,
          backgroundColor: colors.seperator
        }}
      >
        {!this.state.groups ? (
          <View
            style={{
              height: 50,
              backgroundColor: colors.background,
              borderColor: colors.textMinor,
              borderBottomWidth: 2,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <View>
            <Item
              title={"Home"}
              icon={"home"}
              onPress={() => {
                this.props.navigation.navigate({ routeName: "Home" });
              }}
            />
            {this.state.groups &&
              this.state.groups.map(g => {
                return (
                  <Item
                    title={g.name}
                    key={g.slug}
                    icon={g.icon}
                    color={g.color}
                    onPress={() => {
                      this.props.navigation.navigate({
                        routeName: "Group",
                        params: { group: g.slug },
                        key: g.slug
                      });
                    }}
                  />
                );
              })}
            <Item
              title={"Create a group!"}
              icon={"plus"}
              onPress={() => {
                this.props.navigation.navigate({ routeName: "CreateGroup" });
              }}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

export default withNavigation(GroupSelector);
