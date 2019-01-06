import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";

import FloatButton from "that/components/FloatButton";
import CreationForm from "that/components/CreationForm";
import Loading from "that/components/Loading";
import PostList from "that/components/PostList";
import TopBar from "that/components/TopBar";
import ItemLoader from "that/components/ItemLoader";
import CollectionLoader from "that/components/CollectionLoader";

import colors from "that/colors";

import firebase from "react-native-firebase";
import { View } from "react-native";
class Group extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(p) {
    super(p);
    this.state = { creating: false, posts: [], group: {} };
  }

  render() {
    let group = this.props.navigation.getParam("group", null);
    return (
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <ItemLoader
          key={group}
          path={"groups/" + group}
          loadingComponent={
            <View
              style={{
                flex: 1,
                backgroundColor: colors.background
              }}
            >
              <TopBar
                back={() => {
                  this.props.navigation.goBack();
                }}
              />
              <Loading />
            </View>
          }
        >
          {group => {
            return (
              <View style={{ flex: 1 }}>
                <TopBar
                  color={group.color ? group.color : colors.seperator}
                  navigate={(a, b, c) => {
                    this.props.navigation.navigate({
                      routeName: a,
                      params: b,
                      key: c
                    });
                  }}
                  title={group.name}
                  back={() => {
                    this.props.navigation.goBack();
                  }}
                />
                <CollectionLoader
                  realtime={false}
                  path={"groups/" + group.slug}
                  collection={"posts"}
                >
                  {posts => {
                    return <PostList posts={posts} realtime={true} />;
                  }}
                </CollectionLoader>
                {this.props.user && this.props.user.id ? (
                  <FloatButton
                    color={group.color ? group.color : colors.seperator}
                    onPress={() => {
                      this.setState({ creating: true });
                    }}
                  />
                ) : null}
                {this.state.creating && (
                  <CreationForm
                    group={group}
                    navigate={(a, b, c) => {
                      this.setState({ creating: false });
                      this.props.navigation.navigate({
                        routeName: a,
                        params: b,
                        key: c
                      });
                    }}
                    onClose={() => {
                      this.setState({ creating: false });
                    }}
                  />
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
)(Group);
