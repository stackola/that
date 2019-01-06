import React, { Component } from "react";
import TopBar from "that/components/TopBar";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import colors from "that/colors";
import { View } from "react-native";
import PostList from "that/components/PostList";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(p) {
    super(p);
    this.state = { creating: false, posts: [], refreshing: false };
  }
  componentDidMount() {
    //subscribe to a sub.
  }
  _onRefresh = () => {
    console.log("aye");
    this.setState({ refreshing: true });
    this.props.subHomePosts().then(() => {
      this.setState({ refreshing: false });
    });
  };
  componentWillUnmount() {}
  render() {
    return (
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <TopBar
          title={"Home"}
          navigate={(a, b, c) => {
            this.props.navigation.navigate({
              routeName: a,
              params: b,
              key: c
            });
          }}
        />

        <View style={{ flex: 1 }}>
          <PostList posts={this.props.homePosts} realtime={true} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    homePosts: state.homePosts,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
