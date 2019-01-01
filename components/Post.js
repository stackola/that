import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import VoteButtons from "that/components/VoteButtons";

import Icon from "react-native-vector-icons/Ionicons";
import MDIcon from "react-native-vector-icons/MaterialCommunityIcons";

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
					backgroundColor: "#000f33",
					marginBottom: 8,
					minHeight: 200,
					flexDirection: "row"
				}}
			>
				<View style={{ flex: 1 }}>
					<View style={{ flex: 1 }}>
						<VoteButtons />
					</View>
					<View style={{ marginBottom: 8, alignItems: "center" }}>
						<Text
							style={{
								fontSize: 10,
								color: "#ccc"
							}}
						>
							27 min
						</Text>
					</View>
					<View style={{ marginBottom: 8, alignItems: "center" }}>
						<Text
							style={{
								fontSize: 10,
								color: "#ccc"
							}}
						>
							<MDIcon size={9} name={"eye"} /> 452
						</Text>
					</View>
					<View style={{ marginBottom: 8, alignItems: "center" }}>
						<Text
							style={{
								fontSize: 10,
								color: "#ccc"
							}}
						>
							<MDIcon size={9} name={"message"} /> 4
						</Text>
					</View>
				</View>
				<View style={{ flex: 5, padding: 8 }}>
					<View style={{ flex: 1, minHeight: 30 }}>
						<Text
							style={{
								fontSize: 15,
								color: "white",
								fontWeight: "500"
							}}
						>
							Saw this sweet thing a few days ago
						</Text>
					</View>
					{this.props.type != "image" && (
						<View style={{ overflow: "hidden" }}>
							<Image
								source={{
									uri: "https://i.imgur.com/GA5T5S9.jpg"
								}}
								style={{ height: 150, width: 100 }}
								resizeMode="contain"
							/>
						</View>
					)}

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
								minHeight: 50
							}}
						>
							<Text
								style={{
									textAlign: "right",
									color: "#ccc",
									fontSize: 12
								}}
							>
								Von @Willi in #Funny
							</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}
}
