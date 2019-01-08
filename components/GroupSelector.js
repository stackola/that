import React, { Component } from "react";
import colors from "that/colors";
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TextInput
} from "react-native";
import { getGroupList, searchGroup } from "that/lib";

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
          height: 45,
          borderBottomWidth: 1,
          flexDirection: "row",
          borderColor: colors.seperator,
          results: []
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Icon
            size={20}
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
    this.state = { groups: null, searching: false };
  }
  componentDidMount() {
    getGroupList().then(res => {
      this.setState({ groups: res });
    });
  }
  render() {
    return (
      <ScrollView
        style={{
          height: 200,
          backgroundColor: colors.background
        }}
      >
        {!this.state.searching && (
          <View>
            <Item
              title={"Home"}
              icon={"home"}
              onPress={() => {
                this.props.leaving();
                this.props.navigation.navigate({ routeName: "Home" });
              }}
            />
            {this.state.groups ? (
              this.state.groups.map(g => {
                return (
                  <Item
                    title={g.name}
                    key={g.slug}
                    icon={g.icon}
                    color={g.color}
                    onPress={() => {
                      this.props.leaving();
                      this.props.navigation.navigate({
                        routeName: "Group",
                        params: { group: g.slug },
                        key: g.slug
                      });
                    }}
                  />
                );
              })
            ) : (
              <View
                style={{
                  height: 45,
                  backgroundColor: colors.background,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: colors.seperator
                }}
              >
                <ActivityIndicator />
              </View>
            )}
            <Item
              title={"Search"}
              icon={"magnify"}
              onPress={() => {
                searchGroup("", r => {
                  this.setState({ results: r, searching: true });
                });
              }}
            />

            <Item
              title={"Create a group!"}
              icon={"plus"}
              onPress={() => {
                this.props.leaving();
                this.props.navigation.navigate({ routeName: "CreateGroup" });
              }}
            />
          </View>
        )}

        {this.state.searching && (
          <View style={{}}>
            <TextInput
              onChangeText={t => {
                searchGroup(t, r => {
                  this.setState({ results: r });
                });
              }}
              style={{
                color: colors.text,
                backgroundColor: null,
                borderColor: colors.textMinor,
                borderBottomWidth: 2,
                margin: 4,
                fontSize: 12,
                height: 40,
                marginTop: 0
              }}
            />
            {this.state.results &&
              this.state.results.map(g => {
                return (
                  <Item
                    title={g.name}
                    key={g.slug}
                    icon={g.icon}
                    color={g.color}
                    onPress={() => {
                      this.props.leaving();
                      this.props.navigation.navigate({
                        routeName: "Group",
                        params: { group: g.slug },
                        key: g.slug
                      });
                    }}
                  />
                );
              })}
            {this.state.results && !this.state.results.length && (
              <Item
                title={"Create a group!"}
                icon={"plus"}
                onPress={() => {
                  this.props.leaving();
                  this.props.navigation.navigate({ routeName: "CreateGroup" });
                }}
              />
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}

export default withNavigation(GroupSelector);
