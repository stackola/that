import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Post from "that/components/Post";
import TopBar from "that/components/TopBar";
import UserBox from "that/components/UserBox";
import UserPosts from "that/components/UserPosts";
import UserComments from "that/components/UserComments";
import colors from "that/colors";

import firebase from "react-native-firebase";

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

class Profile extends React.Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		//initialize local state
		this.state = {
			user: null,
			posts: null,
			comments: null,
			tab: "posts"
		};
	}
	componentDidMount() {
		let userId = this.props.navigation.getParam("userId", null);
		this.sub1 = firebase
			.firestore()
			.collection("users")
			.doc(userId)
			.get()
			.then(snap => {
				console.log("got user snap", snap);
				this.setState({ user: snap.data() });
			});
	}
	componentWillUnmount() {}
	render() {
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
				{this.state.user ? (
					<ScrollView style={{ flex: 1 }}>
						<UserBox user={this.state.user} />
						<View style={{ flexDirection: "row", height: 40 }}>
							<TouchableOpacity
								onPress={() => {
									this.setState({ tab: "posts" });
								}}
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
									borderRightWidth: 1,
									borderColor: colors.seperator,
									backgroundColor:
										this.state.tab == "posts"
											? colors.background
											: colors.background
								}}
							>
								<Text
									style={{
										color: colors.text,
										fontWeight:
											this.state.tab == "posts"
												? "500"
												: "400",
										textDecorationLine:
											this.state.tab == "posts"
												? "underline"
												: null
									}}
								>
									Posts
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									this.setState({ tab: "comments" });
								}}
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
									borderLeftWidth: 1,
									borderColor: colors.seperator,
									backgroundColor:
										this.state.tab == "comments"
											? colors.background
											: colors.background
								}}
							>
								<Text
									style={{
										color: colors.text,
										fontWeight:
											this.state.tab == "comments"
												? "500"
												: "400",
										textDecorationLine:
											this.state.tab == "comments"
												? "underline"
												: null
									}}
								>
									Comments
								</Text>
							</TouchableOpacity>
						</View>
						{this.state.tab == "posts" && (
							<UserPosts
								user={this.state.user}
								navigate={(a, b, c) => {
									this.props.navigation.navigate({
										routeName: a,
										params: b,
										key: c
									});
								}}
							/>
						)}
						{this.state.tab == "comments" && (
							<UserComments
								user={this.state.user}
								canVote={this.props.user && this.props.user.id}
								navigate={(a, b, c) => {
									this.props.navigation.navigate({
										routeName: a,
										params: b,
										key: c
									});
								}}
							/>
						)}
					</ScrollView>
				) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
