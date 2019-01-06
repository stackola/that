import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Post from "that/components/Post";
import Comment from "that/components/Comment";
import CommentBox from "that/components/CommentBox";
import colors from "that/colors";
import firebase from "react-native-firebase";

import TopBar from "that/components/TopBar";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import CommentLoader from "../components/CommentLoader";

class Details extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    //initialize local state
    this.state = {
      post: {},
      path: null,
      comments: [],
      commentsLoading: true,
      isPanning: false
    };
  }
  componentDidMount() {
    console.log("the post is");
    let postId = this.props.navigation.getParam("postId", null);
    let group = this.props.navigation.getParam("group", null);
    this.sub1 = firebase
      .firestore()
      .collection("groups")
      .doc(group)
      .collection("posts")
      .doc(postId)
      .onSnapshot(snap => {
        console.log("got post snapsnappyty", snap);
        this.setState({ post: snap._data, path: snap._ref.path });
      });
    //Auslagern!
    firebase
      .firestore()
      .collection("groups")
      .doc(group)
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .get()
      .then(d => {
        this.setState({
          commentsLoading: false,
          comments: d._docs.map(d => {
            return { ...d._data, path: d._ref.path };
          })
        });
      });
  }
  componentWillUnmount() {
    this.sub1 && this.sub1();
    this.sub2 && this.sub2();
  }

  render() {
    //We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
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
            scrollEnabled={!this.state.isPanning}
          >
            <View style={{ flex: 1 }}>
              {this.state.path && (
                <Post
                  data={this.state.post}
                  updatePan={d => {
                    console.log("set pan to ", d);
                    if (this.state.isPanning != d) {
                      this.setState({ isPanning: d });
                    }
                  }}
                />
              )}
              {this.props.user && this.props.user.id ? (
                <CommentBox path={this.state.path} />
              ) : null}
              {!this.state.commentsLoading && this.state.comments.length == 0 && (
                <View
                  style={{
                    height: 80,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.background
                  }}
                >
                  <Text style={{ color: colors.text }}>No comments</Text>
                </View>
              )}
              {this.state.commentsLoading && (
                <View
                  style={{
                    marginTop: 12,
                    marginBottom: 12
                  }}
                >
                  <ActivityIndicator />
                </View>
              )}
            </View>
            <View style={{ backgroundColor: colors.background }}>
              {this.state.comments.map(c => {
                return (
                  <CommentLoader
                    key={c.id}
                    realtime={true}
                    canVote={this.props.user && this.props.user.id}
                    path={c.path}
                    level={0}
                    op={this.state.post.user.id}
                    rules={{}}
                  />
                  /*key={c.id}
                    level={0}
                    data={c}
                    op={this.state.post.user.id}
                    canVote={this.props.user && this.props.user.id}
                    navigate={(a, b, c) => {
                      this.props.navigation.navigate({
                        routeName: a,
                        params: b,
                        key: c
                      });
                    }}
                  />*/
                );
              })}
            </View>
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
