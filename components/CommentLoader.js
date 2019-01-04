import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import Comment from "that/components/Comment";
import TopBar from "that/components/TopBar";
import UserBox from "that/components/UserBox";
import UserPosts from "that/components/UserPosts";
import colors from "that/colors";

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

export default class CommentLoader extends React.Component {
	constructor(props) {
		super(props);
		//initialize local state
		this.state = {
			comment: null
		};
	}
	componentDidMount() {
		let ref = this.props.path;
		this.sub1 = firebase
			.firestore()
			.doc(ref.path)
			.onSnapshot(snap => {
				console.log("got single comment snap snap", snap);
				this.setState(
					{ comment: { path: ref.path, ...snap.data() } },
					() => {
						console.log(this.state);
					}
				);
			});
	}
	componentWillUnmount() {
		this.sub1 && this.sub1();
	}
	render() {
		return this.state.comment ? (
			<Comment
				key={this.state.comment.id}
				level={0}
				canVote={this.props.canVote}
				data={this.state.comment}
				onPress={(d)=>{this.props.onPress(d)}}
				loadChildren={this.props.loadChildren}
				navigate={(a, b, c) => {
					console.log("navigat!");
					this.props.navigate(a, b, c);
				}}
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
