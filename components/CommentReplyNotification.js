import React, { Component } from "react";
import colors from "that/colors";

import Link from "that/components/Link";

import Icon from "react-native-vector-icons/Foundation";
import { withNavigation } from "react-navigation";
import { genderColor } from "that/lib";
import {
	View,
	TouchableOpacity,
	Text
} from "react-native";

class Notification extends React.Component {
	isPostReply() {
		return this.props.data.event.data.parent.path.split("/").length == 4;
	}
	getPath() {
		return this.props.data.event.data.parent.path.split("/");
	}
	constructor(p) {
		super(p);
		this.state = { otherUser: null };
	}
	componentDidMount() {
		//fetch user
		console.log(this.props.data.event.data.otherUser);
		this.props.data.event.data.otherUser.get().then(snap => {
			console.log("got single comment snap snap", snap);
			this.setState({ otherUser: snap.data() }, () => {
				console.log(this.state);
			});
		});

		//			console.log(this.props.data.event.data.otherUser.data().username)
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
			{this.props.data.read==false && <View style={{position:"absolute", height:40, width:40, top:0,height:"100%", alignItems:'center', justifyContent:'center', right:4, zIndex:1}}><Icon name="burst-new" size={40} color={"#ffc800"}/></View>}
			
				{this.state.otherUser &&
					this.state.otherUser.id && (
						<Link
							to={"Profile"}
							params={{
								userId: this.state.otherUser.id
							}}
							key={this.state.otherUser.id}
							viewKey={this.state.otherUser.id}
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
