import React, { Component } from "react";
import Post from "that/components/Post";
import colors from "that/colors";

import firebase from "react-native-firebase";

import {
	ActivityIndicator,
	View,
} from "react-native";

export default class PostLoader extends React.Component {
	constructor(props) {
		super(props);
		//initialize local state
		this.state = {
			post: null
		};
	}
	componentDidMount() {
		let ref = this.props.path;
		this.sub1 = firebase
			.firestore()
			.doc(ref.path)
			.onSnapshot(snap => {
				console.log("got single post snap snap", snap);
				this.setState({ post: snap.data() }, () => {
					console.log(this.state);
				});
			});
	}
	componentWillUnmount() {
		this.sub1 && this.sub1();
	}
	render() {
		return this.state.post ? (
			<Post
				data={this.state.post}
				isButton={true}
				condensed={true}
				id={this.state.post.id}
				onPress={() => {
					this.props.navigate(
						"Details",
						{
							postId: this.state.post.id,
							group: this.state.post.group
						},
						this.state.post.id
					);
				}}
				margin={true}
			/>
		) : (
			<View
				style={{
					height: 80,
					backgroundColor: colors.backgroundOffset,
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<ActivityIndicator />
			</View>
		);
	}
}
