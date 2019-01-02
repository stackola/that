import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";

import { vote } from "that/lib";
import { SwipeRow } from "react-native-swipe-list-view";
import colors from "that/colors";
import VoteButtons from "that/components/VoteButtons";
import ExpandingTextInput from "that/components/ExpandingTextInput";

import Icon from "react-native-vector-icons/Entypo";
import Ant from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	TouchableOpacity,
	StyleSheet,
	View,
	Text
} from "react-native";

import { comment } from "that/lib";
import firebase from "react-native-firebase";

export default class Comment extends Component {
	constructor(p) {
		super(p);
		this.state = {
			input: "",
			replying: false,
			user: {},
			comments: [],
			collapsed: false
		};
	}
	componentDidMount() {
		let data = this.props.data || {};
		if (data.user) {
			data.user.get().then(d => {
				this.setState({ user: d._data });
			});
		}

		this.sub1 = firebase
			.firestore()
			.doc(this.props.data.path)
			.collection("comments")
			.onSnapshot(d => {
				this.setState({
					comments: d._docs.map(d => {
						return { ...d._data, path: d._ref.path };
					})
				});
			});
	}
	componentWillUnmount() {
		this.sub1 && this.sub1();
		this.sub2 && this.sub2();
	}
	render() {
		return (
			<View style={{ marginBottom: 4 }}>
				<View style={{ flexDirection: "row" }}>
					<View style={{}}>
						<VoteButtons
							id={this.props.data.id}
							points={
								this.props.data.upvotes -
								this.props.data.downvotes
							}
							upvoters={this.props.data.upvoters}
							downvoters={this.props.data.downvoters}
							onUpvote={() => {
								vote({
									path: this.props.data.path,
									id: this.props.data.id,
									vote: "up"
								});
							}}
							onDownvote={() => {
								vote({
									path: this.props.data.path,
									id: this.props.data.id,
									vote: "down"
								});
							}}
						/>
					</View>
					<View
						style={{
							borderBottomWidth: 1,
							borderColor: colors.seperator,
							flex: 1,
							paddingBottom: 0
						}}
					>
						<SwipeRow
							swipeToOpenPercent={20}
							swipeToClosePercent={20}
							leftOpenValue={155}
							rightOpenValue={0}
							style={{ minHeight: 80 }}
							ref={ref => {
								this.ref = ref;
							}}
							onRowPress={() => {
								return false;
							}}
						>
							<View style={{}}>
								<View
									style={{
										minHeight: 80,
										width: 155,
										flexDirection: "row"
									}}
								>
									<TouchableOpacity
										style={{
											flex: 1,
											alignItems: "center",
											justifyContent: "center",
											backgroundColor: colors.upvote
										}}
										onPress={() => {
											this.setState({ replying: true });
											this.ref.closeRow();
										}}
									>
										<Text style={{ color: colors.text }}>
											<Icon name="reply" size={20} />
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={{
											flex: 1,
											alignItems: "center",
											justifyContent: "center",
											backgroundColor: colors.downvote
										}}
										onPress={() => {
											this.setState({ replying: true });
											this.ref.closeRow();
										}}
									>
										<Text style={{ color: colors.text }}>
											<Icon
												name="flag"
												size={20}
											/>
										</Text>
									</TouchableOpacity>
								</View>
							</View>
							<View
								style={{
									minHeight: 80,
									backgroundColor: colors.background
								}}
							>
								<View style={{ flex: 1 }}>
									<Text
										style={{
											color: colors.text,
											paddingRight: 12,
											padding: 4
										}}
									>
										{this.props.data.text}
									</Text>
								</View>
								<Text
									style={{
										textAlign: "right",
										paddingRight: 8,
										color: colors.textMinor,
										fontSize: 12
									}}
								>
									vor 6 min von @{this.state.user.username}
								</Text>
							</View>
						</SwipeRow>
					</View>
				</View>
				{this.state.replying && (
					<View style={{ flexDirection: "row" }}>
						<View style={{ flex: 1, paddingLeft: 35 }}>
							<ExpandingTextInput
								multiline={true}
								placeholder={"Text"}
								min={120}
								max={600}
								numberOfLines={4}
								ref={ref => {
									//ref && ref.focus();
								}}
								onChangeText={input => {
									this.setState({ input });
								}}
								value={this.state.input}
								placeholderTextColor={colors.placeholder}
								style={{
									color: colors.text,
									backgroundColor: null,
									borderColor: colors.seperator,
									borderBottomWidth: 2,
									margin: 4,
									textAlignVertical: "top",
									marginBottom: 0
								}}
							/>
						</View>
						<View style={{ width: 60 }}>
							<TouchableOpacity
								onPress={() => {
									this.setState({ replying: false });
								}}
								style={{
									backgroundColor: colors.downvote,
									height: 40,
									flex: 1,
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Text style={{ color: colors.background }}>
									<Icon name="cross" size={20} />
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									console.log(this.props.data.path);
									if (this.state.input) {
										this.setState({
											replying: false,
											input: ""
										});
										comment({
											text: this.state.input,
											path: this.props.data.path
										});
									}
								}}
								style={{
									backgroundColor: this.state.input
										? colors.upvote
										: "#999",
									height: 40,
									flex: 3,
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Text style={{ color: colors.text }}>
									<Feather name="send" size={20} />
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
				{this.state.collapsed && (
					<TouchableOpacity
						style={{
							alignItems: "center",
							borderColor: colors.seperator,
							borderBottomWidth: 1,
							marginLeft: 35,
							paddingBottom: 0,
							justifyContent: "center"
						}}
						onPress={() => {
							this.setState({ collapsed: false });
						}}
					>
						<Icon
							size={20}
							name="dots-three-horizontal"
							color={colors.textMinor}
						/>
					</TouchableOpacity>
				)}
				{!this.state.collapsed && (
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							style={{
								width: 35,
								alignItems: "center"
							}}
							onPress={() => {
								this.setState({
									collapsed: true,
									replying: false,
									input: ""
								});
							}}
						>
							<View
								style={{
									flex: 1,
									width: 4,
									backgroundColor: colors.seperator
								}}
							/>
						</TouchableOpacity>
						<View style={{ flex: 1 }}>
							{this.state.comments &&
								this.state.comments.map(c => {
									return (
										<Comment
											key={c.id}
											level={this.props.level + 1}
											data={c}
										/>
									);
								})}
						</View>
					</View>
				)}
			</View>
		);
	}
}
