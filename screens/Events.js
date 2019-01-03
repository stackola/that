import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Post from "that/components/Post";
import TopBar from "that/components/TopBar";
import UserBox from "that/components/UserBox";
import UserPosts from "that/components/UserPosts";
import Notification from "that/components/Notification";
import colors from "that/colors";

import firebase from "react-native-firebase";
import { markAllEventsRead } from "that/lib";
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	ScrollView,
	View,
	Text,
	TouchableOpacity
} from "react-native";

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
							return (
								<Notification
									key={e.event.data.child.id}
									data={e}
								/>
							);
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

export default connect(mapStateToProps, mapDispatchToProps)(Events);
