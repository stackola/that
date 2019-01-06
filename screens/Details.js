import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import ItemLoader from "that/components/ItemLoader";
import Post from "that/components/Post";
import CommentBox from "that/components/CommentBox";
import CommentList from "that/components/CommentList";
import CollectionLoader from "that/components/CollectionLoader";
import colors from "that/colors";
import firebase from "react-native-firebase";

import TopBar from "that/components/TopBar";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import CommentLoader from "../components/CommentLoader";

class Details extends Component {
  static navigationOptions = {
    header: null
  };
  componentDidMount() {}

  render() {
    let postId = this.props.navigation.getParam("postId", null);
    let group = this.props.navigation.getParam("group", null);
    //We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
    let path = "groups/" + group + "/posts/" + postId;
    return (
      <View style={{ flex: 1 }}>
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
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
            keyboardShouldPersistTaps={"handled"}
          >
            <ItemLoader path={path} realtime={true}>
              {post => {
                console.log(post);
                return (
                  <View>
                    <Post linkToSelf={false} data={post || {}} />
                    {this.props.user && this.props.user.id ? (
                      <CommentBox path={path} />
                    ) : null}
                  </View>
                );
              }}
            </ItemLoader>
            <CollectionLoader path={path} collection="comments" realtime={false}>
              {(c,loadMore) => {
                return (
                  <CommentList
                    loadMore={()=>{loadMore()}}
                    comments={c}
                    realtime={true}
                    linkToSelf={false}
                  />
                );
              }}
            </CollectionLoader>
          </ScrollView>
        </View>
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
