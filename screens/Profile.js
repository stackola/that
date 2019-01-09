import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import TopBar from "that/components/TopBar";
import UserBox from "that/components/UserBox";
import ItemLoader from "that/components/ItemLoader";
import Tabs from "that/components/Tabs";
import UserPosts from "that/components/UserPosts";
import UserComments from "that/components/UserComments";
import colors from "that/colors";

import firebase from "react-native-firebase";

import { ScrollView, View, Text, TouchableOpacity } from "react-native";

class Profile extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(p) {
    super(p);
    this.state = { tab: "posts" };
  }
  render() {
    let userId = this.props.navigation.getParam("userId", null);

    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <TopBar
          title={""}
          back={() => {
            this.props.navigation.goBack();
          }}
          navigate={(a, b, c) => {
            this.props.navigation.navigate({
              routeName: a,
              params: b,
              key: c
            });
          }}
        />
        <ItemLoader path={"users/" + userId}>
          {user => {
            let header = (
              <View>
                <UserBox user={user} navigate={(a,b,c)=>{this.props.navigation.navigate({routeName:a, params:b, key:c})}}/>

                <Tabs
                  value={this.state.tab}
                  onChange={t => {
                    this.setState({ tab: t });
                  }}
                  tabs={[
                    { title: "Posts", value: "posts" },
                    { title: "Comments", value: "comments" }
                  ]}
                />
              </View>
            );
            return (
              <View style={{ flex: 1 }}>
                {this.state.tab == "posts" && (
                  <UserPosts userId={userId} header={header} />
                )}
                {this.state.tab == "comments" && (
                  <UserComments userId={userId} header={header} />
                )}
              </View>
            );
          }}
        </ItemLoader>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
