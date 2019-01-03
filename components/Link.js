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

import { withNavigation } from "react-navigation";

class Link extends Component {
	render() {
		return (
			<TouchableOpacity
				style={this.props.containerStyle}
				onPress={() => {
					this.props.navigation.navigate({
						routeName: this.props.to,
						params: this.props.params,
						key: this.props.key
					});
				}}
			>
				<Text style={{ fontWeight: "bold", ...this.props.textStyle }}>
					{this.props.children}
				</Text>
			</TouchableOpacity>
		);
	}
}

export default withNavigation(Link);
