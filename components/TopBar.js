import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import GroupSelector from "that/components/GroupSelector";
import HeaderLoginButton from "that/components/HeaderLoginButton";
import HeaderNotificationButton from "that/components/HeaderNotificationButton";
import HeaderProfileButton from "that/components/HeaderProfileButton";
import colors from "that/colors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, TouchableOpacity, Text } from "react-native";

class TopBar extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      open: false
    };
  }
  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: colors.headerBackground,
            borderBottomWidth: 2,
            borderColor: colors.seperator,
            flexDirection: "row",
            zIndex: 2,
            height: 60
          }}
        >
          {this.props.back ? (
            <TouchableOpacity
              onPress={() => {
                this.props.back();
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon name="chevron-left" size={33} color={colors.text} />
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          <TouchableOpacity
            onPress={() => {
              this.setState({ open: !this.state.open });
            }}
            disabled={this.props.hasDropdown === false}
            style={{ flex: 3, justifyContent: "center" }}
          >
            <Text style={{ color: colors.text }}>{this.props.title || ""}</Text>
          </TouchableOpacity>
          {this.props.user && this.props.user.id ? (
            <View style={{ flex: 2, flexDirection: "row" }}>
              <HeaderNotificationButton events={this.props.events} />
              <HeaderProfileButton user={this.props.user} />
            </View>
          ) : (
            <HeaderLoginButton />
          )}
        </View>
        {this.state.open && (
          <GroupSelector
            leaving={() => {
              this.setState({ open: false });
            }}
          />
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    events: state.events
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);
