import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Header from "that/components/Header";

import FloatButton from "that/components/FloatButton";
import CreationForm from "that/components/CreationForm";
import PostList from "that/components/PostList";
import TopBar from "that/components/TopBar";

import colors from "that/colors";
import { withRouter } from "react-navigation";

import firebase from "react-native-firebase";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Text
} from "react-native";
class Group extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(p) {
    super(p);
    this.state = { creating: false, posts: [], group: {} };
  }
  componentDidMount() {
    //subscribe to a sub.
    let group = this.props.navigation.getParam("group", null);

    this.sub1 = firebase
      .firestore()
      .collection("groups")
      .doc(group)
      .onSnapshot(doc => {
        console.log("got group snap!!!!!!!!!!!!!!");
        console.log(doc);
        this.setState({ group: doc.data() }, () => {
          this.sub2 = firebase
            .firestore()
            .collection("groups")
            .doc(group)
            .collection("posts")
            .onSnapshot(posts => {
              console.log("oh yea, group updated!");
              this.setState(
                {
                  posts: posts._docs.map(d => {
                    return d._data;
                  })
                },
                () => {
                  console.log(this.state);
                  console.log("oh yea, group updated!");
                }
              );
            });
        });
      });
  }
  componentWillUnmount() {
    this.sub1 && this.sub1();
    this.sub2 && this.sub2();
  }
  render() {
    let group = this.props.navigation.getParam("group", null);
    return (
      <View key={group} style={{ backgroundColor: colors.background, flex: 1 }}>
        <TopBar
          navigate={(a, b, c) => {
            this.props.navigation.navigate({
              routeName: a,
              params: b,
              key: c
            });
          }}
          title={this.state.group.name}
          back={() => {
            this.props.navigation.goBack();
          }}
        />
        <PostList
          navigate={(a, b, c) => {
            this.props.navigation.navigate({
              routeName: a,
              params: b,
              key: c
            });
          }}
          posts={this.state.posts}
          key={"postList" + group}
        />
        {this.props.user && this.props.user.id ? (
          <FloatButton
            key={"floatButton" + group}
            onPress={() => {
              this.setState({ creating: true });
            }}
          />
        ) : null}
        {this.state.creating && (
          <CreationForm
            key={"createForm" + group}
            group={group}
            onClose={() => {
              this.setState({ creating: false });
            }}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Group);
