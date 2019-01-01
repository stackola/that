import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import VoteButtons from "that/components/VoteButtons";

import Icon from "react-native-vector-icons/Ionicons";
import MDIcon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "that/colors";
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Text
} from "react-native";

export default class Post extends Component {
	render() {
		return (
			<View
				style={{
					width: "100%",
					backgroundColor: colors.backgroundOffset,
					minHeight: 170,
					flexDirection: "row",
					borderBottomWidth:4,
					borderColor:colors.seperator
				}}
			>
				<View style={{ flex: 1 }}>
					<View style={{ flex: 1, alignItems: "center" }}>
						<VoteButtons />
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
							<MDIcon size={9} name={"eye"} /> 452
						</Text>
					</View>
					<View style={{ marginBottom: 8, alignItems: "center" }}>
						<Text
							style={{
								fontSize: 10,
								color: colors.textMinor
							}}
						>
							<MDIcon size={9} name={"message"} /> 4
						</Text>
					</View>
				</View>
				<TouchableOpacity
					style={{ flex: 5, padding: 8 }}
					onPress={() => {
						if (this.props.onPress) {
							this.props.onPress();
						}
					}}
				>
					<View style={{ minHeight: "auto", paddingBottom: 8 }}>
						<Text
							style={{
								fontSize: 15,
								color: colors.text,
								fontWeight: "500",
								paddingRight: 12
							}}
						>
							Saw this sweet thing a few days ago! What do you
							think?
						</Text>
					</View>
					{this.props.type == "image" && (
						<View
							style={{
								overflow: "hidden",
								alignItems: "center",
								justifyContent: "center",
								flex: 1,
								paddingBottom: 8
							}}
						>
							<Image
								source={{
									uri: "https://i.imgur.com/GA5T5S9.jpg"
								}}
								style={{ width: "100%", height: 400 }}
								resizeMode="cover"
							/>
						</View>
					)}
					<View style={{ flex: 1 }}>
						<Text style={{ color: colors.text }}>
							Ein Balloon flieg einfach so vorbei{"\n"}ich denke
							so, was?
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
								marginBottom: 8,
								marginTop: 8,
								justifyContent: "center"
							}}
						>
							<Text
								style={{
									textAlign: "right",
									color: colors.textMinor,
									fontSize: 12
								}}
							>
								Von @admin in /lustig
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}
