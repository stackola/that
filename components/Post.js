import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import VoteButtons from "that/components/VoteButtons";
import Link from "that/components/Link";
import { withNavigation } from "react-navigation";
import { vote, genderColor } from "that/lib";
import Pinchzoom from "that/components/Pinchzoom";
import Icon from "react-native-vector-icons/Ionicons";
import MDIcon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "that/colors";
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	Alert,
	View,
	Image,
	TouchableOpacity,
	Text
} from "react-native";

class Post extends Component {
	constructor(p) {
		super(p);
		this.state = { user: {} };
	}
	componentDidMount() {
		let data = this.props.data || {};
		if (data.user) {
			console.log("GETTING USER");
			data.user.get().then(d => {
				this.setState({ user: d.data() });
			});
		} else {
			console.log(this.props.data);
			console.log("NO GET USER");
		}
	}
	componentWillUnmount() {}
	noLoggedIn() {
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
		let data = this.props.data || {};
		return (
			<View
				style={{
					width: "100%",
					backgroundColor: colors.backgroundOffset,
					minHeight: 150,
					flexDirection: "row",
					borderBottomWidth: 4,
					borderColor: colors.seperator
				}}
			>
				<View style={{ flex: 1 }}>
					<View style={{ flex: 1, alignItems: "center" }}>
						<VoteButtons
							points={data.upvotes - data.downvotes}
							upvoters={data.upvoters}
							downvoters={data.downvoters}
							onUpvote={() => {
								if (this.props.user && this.props.user.id) {
									vote({
										path:
											"/groups/" +
											data.group +
											"/posts/" +
											data.id,
										id: data.id,
										vote: "up"
									});
								} else {
									this.noLoggedIn();
								}
							}}
							onDownvote={() => {
								if (this.props.user && this.props.user.id) {
									vote({
										path:
											"/groups/" +
											data.group +
											"/posts/" +
											data.id,
										id: data.id,
										vote: "down"
									});
								} else {
									this.noLoggedIn();
								}
							}}
						/>
					</View>
					<View style={{ marginBottom: 8, alignItems: "center" }}>
						<Text
							style={{
								fontSize: 10,
								color: colors.textMinor
							}}
						>
							27 min
						</Text>
					</View>
					<View style={{ marginBottom: 8, alignItems: "center" }}>
						<Text
							style={{
								fontSize: 10,
								color: colors.textMinor
							}}
						>
							<MDIcon size={9} name={"message"} /> {data.comments}
						</Text>
					</View>
				</View>
				{this.props.condensed ? (
					<TouchableOpacity
						activeOpacity={0.7}
						disabled={!this.props.isButton}
						style={{ flex: 5, padding: 0, paddingTop: 0 }}
						onPress={() => {
							if (this.props.isButton && this.props.onPress) {
								this.props.onPress();
							} else {
								return false;
							}
						}}
					>
						{this.props.data.title ? (
							<View
								style={{ minHeight: "auto", paddingBottom: 8 }}
							>
								<Text
									style={{
										fontSize: 15,
										color: colors.text,
										fontWeight: "500",
										paddingRight: 12,
										paddingTop: 4
									}}
								>
									{this.props.data.title}
								</Text>
							</View>
						) : null}
						{this.props.data.image &&
							this.props.data.image.url && (
								<View
									maxScale={3}
									panStart={() => {
										this.props.updatePan &&
											this.props.updatePan(true);
									}}
									panEnd={() => {
										this.props.updatePan &&
											this.props.updatePan(false);
									}}
									style={{
										overflow: "hidden",
										alignItems: "center",
										zIndex: 1,
										justifyContent: "center",
										height: 200
									}}
								>
									<Image
										source={{
											uri: this.props.data.image.url
										}}
										style={{
											position: "absolute",
											top: 8,
											left: 0,
											backgroundColor: "black",
											bottom: 8,
											right: 8
										}}
										resizeMode="contain"
									/>
								</View>
							)}
						{this.props.data.text ? (
							<View style={{ flex: 1 }}>
								<Text style={{ color: colors.text }}>
									{this.props.data.text}
								</Text>
							</View>
						) : (
							<View style={{ flex: 1 }} />
						)}

						<View
							style={{
								flexDirection: "row",
								minHeight: "auto"
							}}
						>
							<View
								style={{
									flex: 1,
									marginTop: 0,
									paddingRight: 8,
									justifyContent: "flex-end",
									flexDirection: "row"
								}}
							>
								<View>
									<Text
										style={{
											color: colors.textMinor,
											fontSize: 11,
											lineHeight: 40
										}}
									/>
								</View>
								{this.state.user && this.state.user.public ? (
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
											fontSize: 11,
											lineHeight: 40
										}}
									>
										@{this.state.user.username}
									</Link>
								) : (
									<Text
										style={{
											color: colors.otherGenders,
											fontSize: 11,
											lineHeight: 40
										}}
									>
										Anon
									</Text>
								)}
								<View>
									<Text
										style={{
											color: colors.textMinor,
											fontSize: 11,
											lineHeight: 40
										}}
									>
										{" "}
										in{" "}
									</Text>
								</View>
								<Link
									to={"Group"}
									params={{ group: data.group }}
									key={data.group}
									textStyle={{
										color: colors.text,
										fontSize: 11,
										lineHeight: 40
									}}
								>
									/{data.group}
								</Link>
							</View>
						</View>
					</TouchableOpacity>
				) : (
					<View style={{ flex: 5, padding: 8, paddingBottom: 0 }}>
						{this.props.data.title ? (
							<View
								style={{ minHeight: "auto", paddingBottom: 8 }}
							>
								<Text
									style={{
										fontSize: 15,
										color: colors.text,
										fontWeight: "500",
										paddingRight: 12,
										paddingTop: 4
									}}
								>
									{this.props.data.title}
								</Text>
							</View>
						) : null}
						{this.props.data.image &&
							this.props.data.image.url && (
								<Pinchzoom
									maxScale={3}
									panStart={() => {
										this.props.updatePan &&
											this.props.updatePan(true);
									}}
									panEnd={() => {
										this.props.updatePan &&
											this.props.updatePan(false);
									}}
									style={{
										overflow: "hidden",
										alignItems: "center",
										zIndex: 1,
										justifyContent: "center",
										height: 300
									}}
								>
									<Image
										source={{
											uri: this.props.data.image.url
										}}
										style={{
											position: "absolute",
											top: 8,
											left: 8,
											bottom: 8,
											right: 8
										}}
										resizeMode="contain"
									/>
								</Pinchzoom>
							)}
						<View style={{ flex: 1 }}>
							<Text style={{ color: colors.text }}>
								{this.props.data.text}
							</Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								minHeight: "auto"
							}}
						>
							<View />
							<View
								style={{
									flex: 1,
									marginBottom: 0,
									marginTop: 8,
									justifyContent: "flex-end",
									flexDirection: "row"
								}}
							>
								<View>
									<Text
										style={{
											color: colors.textMinor,
											fontSize: 11,
											lineHeight: 40
										}}
									/>
								</View>
								{this.state.user && this.state.user.public ? (
									<Link
										to={"Profile"}
										params={{
											userId: this.state.user.id
										}}
										key={this.state.user.id}
										textStyle={{
											color: genderColor(this.state.user),
											fontSize: 11,
											lineHeight: 40
										}}
									>
										@{this.state.user.username}
									</Link>
								) : (
									<Text
										style={{
											color: colors.otherGenders,
											fontSize: 11,
											lineHeight: 40
										}}
									>
										Anon
									</Text>
								)}

								<View>
									<Text
										style={{
											color: colors.textMinor,
											fontSize: 11,
											lineHeight: 40
										}}
									>
										{" "}
										in{" "}
									</Text>
								</View>
								<Link
									to={"Group"}
									params={{ group: data.group }}
									key={data.group}
									textStyle={{
										color: colors.text,
										fontSize: 11,
										lineHeight: 40
									}}
								>
									/{data.group}
								</Link>
							</View>
						</View>
					</View>
				)}
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

export default withNavigation(
	connect(mapStateToProps, mapDispatchToProps)(Post)
);
