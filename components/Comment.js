import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";

import { SwipeRow } from "react-native-swipe-list-view";
import colors from "that/colors";
import VoteButtons from "that/components/VoteButtons";
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
	Text
} from "react-native";

export default class Comment extends Component {
	render() {
		return (
			<View style={{ flexDirection: "row" }}>
				<View style={{}}>
					<VoteButtons />
				</View>
				<View style={{ flex: 1 }}>
					<SwipeRow style={{ minHeight: 80 }}>
						<View style={{ backgroundColor: colors.hidden }}>
							<View style={{ minHeight: 80, padding:4 }}>
								<Text style={{color:colors.text}}>Behind!</Text>
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
									style={{ color: colors.text, paddingRight: 12, padding:4}}
								>
									Ganz ehrlich so ein!!!en scheiß habe ich
									selten gehört!!
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
								vor 6 min von @Anon
							</Text>
						</View>
					</SwipeRow>
				</View>
			</View>
		);
	}
}
