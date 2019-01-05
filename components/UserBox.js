import React, { Component } from "react";
import colors from "that/colors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import {
	View,
	Text
} from "react-native";

export default class UserBox extends Component {
	constructor(props) {
		super(props);
		//initialize local state
		this.state = {};
	}
	componentDidMount() {}

	render() {
		//We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
		return (
			<View
				style={{
					paddingTop: 8,
					paddingBottom: 4,
					flexDirection: "row",
					borderBottomWidth: 2,
					borderColor: colors.seperator
				}}
			>
				<Text
					style={{
						flex: 1,
						color: colors.text,
						fontSize: 20,
						textAlign: "center",
						lineHeight: 28
					}}
				>
					<Text
						style={{
							color:
								this.props.user.gender == "D" ||
								!this.props.user ||
								!this.props.user.gender
									? colors.otherGenders
									: this.props.user.gender == "M"
										? colors.male
										: colors.female
						}}
					>
						{this.props.user.username}
					</Text>
					{"\n"}
					<Text
						style={{
							flex: 1,
							color: colors.textMinor,
							fontSize: 15,
							textAlign: "center"
						}}
					>
						<Icon2
							name="location-on"
							size={15}
							color={colors.textMinor}
						/>{" "}
						Dresden
						{"\n"}
						<Text style={{ fontSize: 12 }}>Joined 7 days ago</Text>
					</Text>
				</Text>
				<Text
					style={{
						flex: 1,
						color: colors.text,
						fontSize: 20,
						textAlign: "center",
						lineHeight: 35
					}}
				>
					<Icon name="coin" size={20} color={colors.upvote} />
					{"\n"}
					<Text
						style={{
							flex: 1,
							color: colors.text,
							fontSize: 15,
							textAlign: "center"
						}}
					>
						1.567
					</Text>
				</Text>
			</View>
		);
	}
}
