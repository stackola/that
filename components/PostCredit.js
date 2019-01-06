import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import Link from "that/components/Link";
import UserLoader from "that/components/UserLoader";
import { genderColor } from "that/lib";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";
const textStyle = { color: colors.text, fontSize: 11, lineHeight: 25 };
export default class PostCredit extends Component {
  render() {
    let group = this.props.group;
    return (
      <View style={{ flexDirection: "row" }}>
        <UserLoader sanitize={true} realtime={false} userId={this.props.userId}>
          {user => {
            return (
              <Link
                to={"Profile"}
                params={{
                  userId: user.id
                }}
                viewKey={user.id}
                key={user.id}
                disabled={user.allowLink === false}
                textStyle={{
                  ...textStyle,
                  color: genderColor(user.gender)
                }}
              >
                @{user.username}
              </Link>
            );
          }}
        </UserLoader>
        {this.props.group && (
          <React.Fragment>
            <Text style={{ ...textStyle, color: colors.textMinor }}> in </Text>
            <Link
              to={"Group"}
              params={{ group: group }}
              viewKey={group}
              key={group}
              textStyle={{
                ...textStyle,
                color: colors.text
              }}
            >
              /{group}
            </Link>
          </React.Fragment>
        )}
      </View>
    );
  }
}
