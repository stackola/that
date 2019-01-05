import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import colors from "that/colors";
import Icon from "react-native-vector-icons/EvilIcons";

import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getUID } from "that/lib";
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

class TopBar extends React.Component {
	constructor(p) {
		super(p);
		this.state = {
			open: false
		};
	}
	render() {
		let eventCount = this.props.events && this.props.events.length >0 
			? this.props.events.filter(e => {
					return !e.read;
			  }).length
			: 0;
		return (
			<View>
				<View
					style={{
						backgroundColor: colors.headerBackground,
						borderBottomWidth: 2,
						borderColor: colors.upvote,
						flexDirection: "row",
						zIndex: 2,
						height: 60
					}}
				>
					{this.props.back ? (
						<TouchableOpacity
							onPress={() => {
								this.props.back();
							}}
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center"
							}}
						>
							<MIcon
								name="chevron-left"
								size={33}
								color={colors.text}
							/>
						</TouchableOpacity>
					) : (
						<View style={{ flex: 1 }} />
					)}
					<TouchableOpacity
						onPress={() => {
							this.setState({ open: !this.state.open });
						}}
						style={{ flex: 3, justifyContent: "center" }}
					>
						<Text style={{ color: colors.text }}>
							{this.props.title || ""}
						</Text>
					</TouchableOpacity>
					{this.props.user && this.props.user.id ? (
						<View style={{ flex: 2, flexDirection: "row" }}>
							<TouchableOpacity
								style={{
									alignItems: "center",
									borderLeftWidth: 0,
									borderColor: colors.seperator,
									flex: 1
								}}
								onPress={() => {
									this.props.navigate("Events");
								}}
							>
								<View
									style={{
										flex: 1,
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<MIcon
										name="coin"
										size={20}
										color={colors.upvote}
									/>
								</View>
								<Text
									style={{
										fontSize: 12,
										color: colors.text,
										paddingBottom: 8
									}}
								>
									1.523
									{/*this.props.user.points+1500000 || 0*/}
								</Text>
								{eventCount > 0 && (
									<View
										style={{
											backgroundColor: "red",
											zIndex: 1,
											height: 15,
											width: 15,
											borderRadius: 15,
											position: "absolute",
											top: 5,
											left: 36,
											alignItems: "center",
											justifyContent: "center"
										}}
									>
										<Text
											numberOfLines={1}
											style={{
												color: colors.text,
												flex: 1,
												fontSize: 9
											}}
										>
											{eventCount}
										</Text>
									</View>
								)}
							</TouchableOpacity>
							<TouchableOpacity
								style={{ flex: 1, alignItems: "center" }}
								onPress={() => {
									this.props.navigate("EditProfile");
								}}
							>
								<View
									style={{
										flex: 1,
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<Icon
										name="user"
										size={25}
										color={colors.text}
									/>
								</View>
								<Text
									numberOfLines={1}
									style={{
										color: colors.text,
										paddingBottom: 8,
										fontSize: 12
									}}
								>
									{this.props.user.username || "Anon"}
								</Text>
							</TouchableOpacity>
						</View>
					) : (
						<TouchableOpacity
							style={{
								flex: 2,
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: colors.upvote
							}}
							onPress={() => {
								this.props.navigate("EditProfile");
							}}
						>
							<MIcon
								name="login-variant"
								color={colors.text}
								size={25}
							/>
						</TouchableOpacity>
					)}
				</View>
				{this.state.open && (
					<View
						style={{
							height: 200,
							backgroundColor: colors.seperator
						}}
					>
						<TouchableOpacity
							onPress={() => {
								this.setState({ open: false }, () => {
									this.props.navigate &&
										this.props.navigate("Home");
								});
							}}
							style={{
								height: 50,
								borderBottomWidth: 2,
								flexDirection: "row",
								borderColor: colors.textMinor
							}}
						>
							<View style={{ flex: 1 }} />
							<View style={{ flex: 5, justifyContent: "center" }}>
								<Text
									style={{ color: colors.text, fontSize: 16 }}
								>
									Home
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.setState({ open: false }, () => {
									this.props.navigate &&
										this.props.navigate(
											"Group",
											{
												group: "general"
											},
											"general"
										);
								});
							}}
							style={{
								height: 60,
								borderBottomWidth: 2,
								flexDirection: "row",
								borderColor: colors.textMinor
							}}
						>
							<View style={{ flex: 1 }} />
							<View style={{ flex: 5, justifyContent: "center" }}>
								<Text
									style={{ color: colors.text, fontSize: 16 }}
								>
									General
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.setState({ open: false }, () => {
									this.props.navigate &&
										this.props.navigate(
											"Group",
											{
												group: "cars"
											},
											"cars"
										);
								});
							}}
							style={{
								height: 60,
								borderBottomWidth: 2,
								flexDirection: "row",
								borderColor: colors.textMinor
							}}
						>
							<View style={{ flex: 1 }} />
							<View style={{ flex: 5, justifyContent: "center" }}>
								<Text
									style={{ color: colors.text, fontSize: 16 }}
								>
									Cars
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}
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

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
