import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";

import { vote, genderColor } from "that/lib";
import { SwipeRow } from "react-native-swipe-list-view";
import colors from "that/colors";
import VoteButtons from "that/components/VoteButtons";
import Link from "that/components/Link";
import ExpandingTextInput from "that/components/ExpandingTextInput";
import { createPost, uploadImage } from "that/lib";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/Entypo";
import Ant from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

import {getUID} from "that/lib";
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	TouchableOpacity,
	Image,
	StyleSheet,
	View,
	Text,
	Alert
} from "react-native";

import { comment } from "that/lib";
import firebase from "react-native-firebase";

const pickerOptions = {
	mediaType: "photo",
	quality: 0.4
};

export default class Comment extends Component {
	constructor(p) {
		super(p);
		this.state = {
			input: "",
			replying: false,
			user: {},
			comments: [],
			collapsed: false,
			imageLoading: false,
			image: null
		};
	}
	componentDidMount() {
		console.log(this.props);
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
	isOwnComment(){
		return this.state.user && getUID()==this.state.user.id
	}
	componentWillUnmount() {
		this.sub1 && this.sub1();
		this.sub2 && this.sub2();
	}
	pickPicture(showRemove) {
		this.setState({ imageLoading: true }, () => {
			ImagePicker.showImagePicker(
				{
					...pickerOptions,
					customButtons: showRemove
						? [
								...(pickerOptions.customButtons || []),
								{ name: "remove", title: "Remove image" }
						  ]
						: [...(pickerOptions.customButtons || [])]
				},
				response => {
					console.log(response);
					if (response && response.path) {
						uploadImage(
							response.path,
							response.width,
							response.height,
							d => {
								console.log("got response", d);
								this.setState({
									image: d,
									imageLoading: false
								});
							}
						);
					} else {
						this.setState({
							imageLoading: false,
							image: null
						});
					}
				}
			);
		});
	}
	notLoggedIn() {
		Alert.alert(
			"Not logged in",
			"Please log in to participate",
			[
				{
					text: "Not now",
					onPress: () => console.log("not now"),
					style: "cancel"
				},
				{
					text: "Log in",
					onPress: () => this.props.navigate("EditProfile")
				}
			],
			{ cancelable: true }
		);
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
								if (this.props.canVote) {
									vote({
										path: this.props.data.path,
										id: this.props.data.id,
										vote: "up"
									});
								} else {
									this.notLoggedIn();
								}
							}}
							onDownvote={() => {
								if (this.props.canVote) {
									vote({
										path: this.props.data.path,
										id: this.props.data.id,
										vote: "down"
									});
								} else {
									this.notLoggedIn();
								}
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
							enabled={this.props.canVote}
							style={{ minHeight: 80 }}
							ref={ref => {
								this.ref = ref;
							}}
							onRowPress={() => {
								return false;
							}}
						>
							<View style={{ flex: 1 }}>
								<View
									style={{
										minHeight: 80,
										width: 155,
										flexDirection: "row",
										flex: 1
									}}
								>
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
											<Icon name="flag" size={20} />
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={{
											flex: 1,
											alignItems: "center",
											justifyContent: "center",
											backgroundColor: colors.upvote
										}}
										onPress={() => {
											if (this.props.canVote) {
												this.setState({
													replying: true
												});
												this.ref.closeRow();
											} else {
												this.notLoggedIn();
												this.ref.closeRow();
											}
										}}
									>
										<Text style={{ color: colors.text }}>
											<Icon name="reply" size={20} />
										</Text>
									</TouchableOpacity>
								</View>
							</View>
							<View
								style={{
									minHeight: 80,
									backgroundColor: colors.background,
									borderRightWidth: 2,
									borderColor: this.isOwnComment()?colors.hidden:colors.background,
								}}
							>
								<View style={{ flex: 1 }}>
									<Text
										style={{
											color: colors.text,
											paddingRight: 4,
											padding: 8
										}}
									>
										{this.props.data.text}
									</Text>
									{this.props.data.image &&
									this.props.data.image.url ? (
										<TouchableOpacity
											onPress={() => {
												this.props.navigate(
													"ImageView",
													{
														image: this.props.data
															.image
													},
													this.props.data.path
												);
											}}
										>
											<Image
												source={{
													uri: this.props.data.image
														.url
												}}
												style={{
													width: 100,
													height: 100,
													marginLeft: 12
												}}
											/>
										</TouchableOpacity>
									) : null}
								</View>

								<View
									style={{
										textAlign: "right",
										paddingRight: 4,
										paddingBottom: 4,
										justifyContent: "flex-end",
										flexDirection: "row"
									}}
								>
									<View>
										<Text
											style={{
												color: colors.textMinor,
												fontSize: 11
											}}
										>
											x minutes ago |{" "}
										</Text>
									</View>
									{this.state.user &&
									this.state.user.public ? (
										<Link
											to={"Profile"}
											params={{
												userId: this.state.user.id
											}}
											key={this.state.user.id}
											textStyle={{
												color: genderColor(
													this.state.user.gender
												),
												fontSize: 11
											}}
										>
											{this.props.op==this.state.user.id?"OP":null} @{this.state.user.username}
										</Link>
									) : (
										<Text
											style={{
												fontSize: 11,
												color: colors.otherGenders
											}}
										>
											{this.props.op==this.state.user.id?"OP ":null}Anon
										</Text>
									)}
								</View>
							</View>
						</SwipeRow>
					</View>
				</View>
				{this.state.replying && (
					<View style={{ flexDirection: "row" }}>
						<View style={{ width: 35 }}>
							<TouchableOpacity
								onPress={() => {
									this.setState({
										replying: false,
										image: null
									});
								}}
								style={{
									backgroundColor: colors.downvote,
									flex: 1,
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Text style={{ color: colors.text }}>
									<Icon name="cross" size={15} />
								</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flex: 1 }}>
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
							<View
								style={{
									flex: 1,
									backgroundColor: colors.hidden
								}}
							>
								{!this.state.imageLoading &&
								!this.state.image ? (
									<TouchableOpacity
										onPress={() => {
											this.pickPicture();
										}}
										style={{
											backgroundColor: colors.hidden,

											flex: 1,
											alignItems: "center",
											justifyContent: "center"
										}}
									>
										<Text style={{ color: colors.text }}>
											<Feather name="camera" size={15} />
										</Text>
									</TouchableOpacity>
								) : null}

								{this.state.imageLoading &&
								!this.state.image ? (
									<View
										style={{
											alignItems: "center",
											justifyContent: "center",
											flex: 1
										}}
									>
										<ActivityIndicator
											size={10}
											style={{ height: 15 }}
										/>
									</View>
								) : null}

								{this.state.image ? (
									<View style={{ flex: 1 }}>
										<TouchableOpacity
											onPress={() => {
												this.pickPicture(true);
											}}
											style={{ flex: 1 }}
										>
											<View
												style={{
													minHeight: 15,
													flex: 1
												}}
											>
												<Image
													source={{
														uri: this.state.image
															.url
													}}
													style={{
														flex: 1,
														alignItems: "center",
														justifyContent: "center"
													}}
													resizeMode="cover"
												/>
											</View>
										</TouchableOpacity>
									</View>
								) : null}
							</View>

							<View style={{ flex: 1 }}>
								<TouchableOpacity
									onPress={() => {
										console.log(this.props.data.path);
										if (
											this.state.input ||
											this.state.image
										) {
											comment(
												{
													text: this.state.input,
													path: this.props.data.path,
													image: this.state.image
												},
												() => {
													this.setState({
														replying: false,
														input: ""
													});
												}
											);
										}
									}}
									style={{
										backgroundColor:
											this.state.input || this.state.image
												? colors.upvote
												: "#999",

										flex: 1,
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<Text
										style={{
											color: colors.text,
											height: 15
										}}
									>
										<Feather name="send" size={15} />
									</Text>
								</TouchableOpacity>
							</View>
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
				{!this.state.collapsed &&
					this.props.level < 3 && (
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
												op={this.props.op}
												canVote={this.props.canVote}
												navigate={(a, b, c) => {
													this.props.navigate(
														a,
														b,
														c
													);
												}}
											/>
										);
									})}
							</View>
						</View>
					)}
				{!this.state.collapsed &&
					this.props.level == 3 &&
					this.state.comments &&
					this.state.comments.length > 0 && (
						<TouchableOpacity
							onPress={() => {
								this.props.navigate(
									"SingleComment",
									{ commentPath: this.props.data.path },
									this.props.data.path
								);
							}}
							style={{
								backgroundColor: colors.seperator,
								height: 40,
								alignItems: "center",
								justifyContent: "center"
							}}
						>
							<Text style={{ color: colors.text }}>
								Read more
							</Text>
						</TouchableOpacity>
					)}
			</View>
		);
	}
}
