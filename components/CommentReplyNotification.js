import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import colors from "that/colors";
import Icon from "react-native-vector-icons/EvilIcons";
import firebase from "react-native-firebase";
import Link from "that/components/Link";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { withNavigation } from "react-navigation";
import { getUID, genderColor } from "that/lib";
const uid = getUID();
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	Picker,
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from "react-native";

class Notification extends React.Component {
	isPostReply() {
		return this.props.data.data.parent.path.split("/").length == 4;
	}
	getPath() {
		return this.props.data.data.parent.path.split("/");
	}
	constructor(p) {
		super(p);
		this.state = { otherUser: null };
	}
	componentDidMount() {
		//fetch user
		console.log(this.props.data.data.otherUser);
		this.props.data.data.otherUser.get().then(snap => {
			console.log("got single comment snap snap", snap);
			this.setState({ otherUser: snap.data() }, () => {
				console.log(this.state);
			});
		});

		//			console.log(this.props.data.data.otherUser.data().username)
	}
	pressed() {
		if (this.isPostReply()) {
			console.log(this.getPath());
			let tp = this.getPath();

			this.props.navigation.navigate({
				routeName: "Details",
				params: {
					postId: tp[3],
					group: tp[1]
				},
				key: tp[3]
			});
		} else {
			let tp = this.getPath().join("/");

			this.props.navigation.navigate({
				routeName: "SingleComment",
				params: {
					commentPath: tp
				},
				key: tp
			});
		}
	}
	render() {
		return (
			<TouchableOpacity
				onPress={() => {
					this.pressed();
				}}
				style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}
			>
				{this.state.otherUser &&
					this.state.otherUser.id && (
						<Link
							to={"Profile"}
							params={{
								userId: this.state.otherUser.id
							}}
							key={this.state.otherUser.id}
							textStyle={{
								color: genderColor(this.state.otherUser.gender),
								fontSize: 14
							}}
						>
							@{this.state.otherUser.username}
						</Link>
					)}
				<Text style={{ fontSize: 14, color: colors.text }}>
					{" "}
					has replied to your{" "}
					{this.isPostReply() ? "post" : "comment"}.
				</Text>
			</TouchableOpacity>
		);
	}
}

export default withNavigation(Notification);
