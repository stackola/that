import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import ItemLoader from "that/components/ItemLoader";
import Post from "that/components/Post";
import CommentBox from "that/components/CommentBox";
import CommentLoader from "that/components/CommentLoader";
import InfiniteList from "that/components/InfiniteList";
import colors from "that/colors";
import { getItem } from "that/lib";
import firebase from "react-native-firebase";

import TopBar from "that/components/TopBar";
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from "react-native";

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

class Details extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(p) {
    super(p);

    this.state = { group: null, sort: "new" };
  }
  componentDidMount() {
    let group = this.props.navigation.getParam("group", null);
    getItem("groups/" + group).then(g => {
      this.setState({ group: g._data });
    });
  }
  getSortField() {
    return this.state.sort == "new" ? "time" : "points";
  }
  render() {
    let postId = this.props.navigation.getParam("postId", null);
    let group = this.props.navigation.getParam("group", null);
    //We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
    let path = "groups/" + group + "/posts/" + postId;
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
        <InfiniteList
          header={
            <ItemLoader path={path} realtime={true}>
              {post => {
                //console.log(post);
                return (
                  <View>
                    <Post linkToSelf={false} data={post || {}} />
                    <View
                      style={{
                        height: 35,
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
                      <SortButton
                        text={"Best"}
                        selected={this.state.sort == "best"}
                        onPress={() => {
                          this.setState({ sort: "best" });
                        }}
                      />
                    </View>
                    {this.props.user && this.props.user.id ? (
                      <CommentBox group={this.state.group} path={path} />
                    ) : null}
                  </View>
                );
              }}
            </ItemLoader>
          }
          sort={this.getSortField()}
          path={path}
          collection={"comments"}
          renderItem={i => {
            return (
              <CommentLoader
                linkToSelf={false}
                path={i.item._ref.path}
                marginBottom={2}
                level={0}
                sort={this.getSortField()}
                group={this.state.group}
                loadChildren={true}
                realtime={true}
                loadingComponent={
                  <View
                    style={{
                      height: 45,
                      backgroundColor: colors.backgroundColor,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <ActivityIndicator />
                  </View>
                }
              />
            );
          }}
        />
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
)(Details);
