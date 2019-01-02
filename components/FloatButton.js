import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import MDIcon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "that/colors";
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from "react-native";

export default class FloatButton extends Component {
	render() {
		return (
			<TouchableOpacity
				onPress={() => {
					if (this.props.onPress) {
						this.props.onPress();
					}
				}}
				style={{
					backgroundColor: colors.floatbutton,
					width: 60,
					alignItems: "center",
					justifyContent: "center",
					height: 60,
					position: "absolute",
					right: 10,
					bottom: 10,
					borderRadius: 60,
					zIndex:2,
				}}
			>
				<MDIcon name="plus" size={25} color={"white"} />
			</TouchableOpacity>
		);
	}
}
