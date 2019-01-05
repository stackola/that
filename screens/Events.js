import React from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import TopBar from "that/components/TopBar";
import Notification from "that/components/Notification";
import colors from "that/colors";

import { markAllEventsRead } from "that/lib";
import { ScrollView, View } from "react-native";

class Events extends React.Component {
  static navigationOptions = {
    header: null
  };
  componentWillUnmount() {
    markAllEventsRead();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <TopBar
          title={"Notifications"}
          back={() => {
            markAllEventsRead();
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
        <ScrollView style={{ flex: 1 }}>
          {this.props.events &&
            this.props.events.length > 0 &&
            this.props.events.map(e => {
              return <Notification key={e.event.data.child.id} data={e} />;
            })}
        </ScrollView>
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
)(Events);
