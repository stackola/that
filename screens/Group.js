import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";

import FloatButton from "that/components/FloatButton";
import CreationForm from "that/components/CreationForm";
import Loading from "that/components/Loading";
import TopBar from "that/components/TopBar";
import ItemLoader from "that/components/ItemLoader";

import PostLoader from "that/components/PostLoader";

import colors from "that/colors";

import firebase from "react-native-firebase";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation
} from "react-native";
import InfiniteList from "../components/InfiniteList";

const SortButton = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress && props.onPress();
      }}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: props.selected ? colors.hidden : colors.background,
        margin: 4,
        marginRight: 0,
        borderRadius: 5
      }}
    >
      <Text style={{ color: colors.text, textAlign: "center", fontSize: 12 }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
class Group extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(p) {
    super(p);
    this.state = { creating: false, posts: [], group: {}, sort: "day" };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  getSortField() {
    return this.state.sort == "new" ? "time" : "points";
  }
  getSortTimeFrame() {
    if (this.state.sort == "new") {
      return null;
    }
    return this.state.sort;
  }
  getSortTime() {}
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
                <InfiniteList
                  header={
                    <View
                      style={{
                        height: 50,
                        flexDirection: "row",
                        paddingRight: 4
                      }}
                    >
                      <SortButton
                        text={"New"}
                        selected={this.state.sort == "new"}
                        onPress={() => {
                          this.setState({ sort: "new" });
                        }}
                      />
                      <View
                        style={{
                          justifyContent: "center",
                          marginLeft: 12,
                          marginRight: 8
                        }}
                      >
                        <Text style={{ color: colors.text, fontSize: 12 }}>
                          Best off:
                        </Text>
                      </View>
                      <SortButton
                        text={"1 hour"}
                        selected={this.state.sort == "hour"}
                        onPress={() => {
                          this.setState({ sort: "hour" });
                        }}
                      />
                      <SortButton
                        text={"Today"}
                        selected={this.state.sort == "day"}
                        onPress={() => {
                          this.setState({ sort: "day" });
                        }}
                      />
                      <SortButton
                        text={"This month"}
                        selected={this.state.sort == "month"}
                        onPress={() => {
                          this.setState({ sort: "month" });
                        }}
                      />
                      <SortButton
                        text={"All time"}
                        selected={this.state.sort == "all"}
                        onPress={() => {
                          this.setState({ sort: "all" });
                        }}
                      />
                    </View>
                  }
                  path={"groups/" + group.slug}
                  sort={this.getSortField()}
                  timeFrame={this.getSortTimeFrame()}
                  collection={"posts"}
                  renderItem={i => {
                    return (
                      <PostLoader
                        linkToSelf={true}
                        path={i.item._ref.path}
                        marginBottom={4}
                        realtime={true}
                      />
                    );
                  }}
                />

                {this.props.user && this.props.user.id ? (
                  <FloatButton
                    color={group.color ? group.color : colors.seperator}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      );
                      this.setState({ creating: true });
                    }}
                  />
                ) : null}
                <CreationForm
                  creating={this.state.creating}
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
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut
                    );
                    this.setState({ creating: false });
                  }}
                />
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
