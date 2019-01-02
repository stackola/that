import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Header from "that/components/Header";
import Post from "that/components/Post";
import FloatButton from "that/components/FloatButton";
import CreationForm from "that/components/CreationForm";
import { SwipeListView } from "react-native-swipe-list-view";
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
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(p) {
    super(p);
    this.state = { creating: false, posts: [] };
  }
  componentDidMount() {
    //subscribe to a sub.
    this.sub1=firebase
      .firestore()
      .collection("groups")
      .doc("cars")
      .onSnapshot(doc => {
        console.log("got group snap!!!!!!!!!!!!!!");
        console.log(doc);
      });
    this.sub2=firebase
      .firestore()
      .collection("groups")
      .doc("cars")
      .collection("posts")
      .onSnapshot(posts => {
        this.setState(
          {
            posts: posts._docs.map(d => {
              return d._data;
            })
          },
          () => {
            console.log(this.state);
            console.log("oh yea, home updated!");
          }
        );
      });
  }
  componentWillUnmount() {
    this.sub1 && this.sub1();
    this.sub2 && this.sub2();
  }
  render() {
    return (
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <Header />
        <SwipeListView
          useFlatList
          data={this.state.posts}
          keyExtractor={item => {
            return item.id;
          }}
          closeOnRowBeginSwipe={true}
          swipeToOpenPercent={20}
          swipeToClosePercent={20}
          renderItem={(data, rowMap) => {
            console.log(data);
            return (
              <Post
                data={data.item}
                onPress={() => {
                  this.props.navigation.navigate("Details", {
                    postId: data.item.id,
                    group: data.item.group
                  });
                }}
                margin={true}
              />
            );
          }}
          renderHiddenItem={(data, rowMap) => (
            <View
              style={{
                backgroundColor: colors.hidden,
                flex: 1,
                marginBottom: 4
              }}
            >
              <Text>Left</Text>
            </View>
          )}
          leftOpenValue={155}
          rightOpenValue={0}
        />
        <FloatButton
          onPress={() => {
            this.setState({ creating: true });
          }}
        />
        {this.state.creating && (
          <CreationForm
            onClose={() => {
              this.setState({ creating: false });
            }}
          />
        )}
      </View>
    );
  }
}
