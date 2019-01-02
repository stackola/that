import React, { Component } from "react";
import colors from "that/colors";
import { AndroidBackHandler } from "react-navigation-backhandler";

import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TouchableHighlight
} from "react-native";

let Item = props => {
	return (
		<TouchableOpacity
			onPress={() => {
				console.log("pressed");
			}}
			style={{
				backgroundColor: colors.dropwdownBackground,
				width: "100%",
				paddingTop: 5,
				paddingBottom: 20,
				paddingLeft: 10,
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: 0.8,
				shadowRadius: 4,
				elevation: 1
			}}
		>
			<View style={{}}>
				<Text style={{ fontSize: 15, color: colors.dropdownFont }}>
					{props.data.name}!
				</Text>
			</View>
		</TouchableOpacity>
	);
};
export default class HeaderDropdown extends Component {
	constructor(p) {
		super(p);
		this.state = { open: false };
	}
	onBackButtonPressAndroid() {
		/*
    *   Returning `true` from `onBackButtonPressAndroid` denotes that we have handled the event,
    *   and react-navigation's lister will not get called, thus not popping the screen.
    *
    *   Returning `false` will cause the event to bubble up and react-navigation's listener will pop the screen.
    * */

		if (this.state.open) {
			// do something

			this.setState({ open: false });
			return true;
		} else {
			return false;
		}
	}
	render() {
		const options = [
			{ name: "Home", id: "home" },
			{ name: "My Town", id: "myTown" },
			{ name: "My Clubs", id: "myClubs" },
			{ name: "Multicopter", id: "multicopter" }
		];
		return (
			<AndroidBackHandler
				onBackPress={() => {
					return this.onBackButtonPressAndroid();
				}}
			>
				<View style={{ width: "100%" }}>
					<TouchableOpacity
						onPress={() => {

							this.setState({ open: !this.state.open });
						}}
						style={{
							height: 60,
							backgroundColor: colors.headerBackground
						}}
					>
						<View
							style={{
								flex: 1,
								justifyContent: "center"
							}}
						>
							<Text
								style={{
									fontSize: 15,
									paddingLeft: 12,
									color: colors.headerFont
								}}
							>
								Home
							</Text>
						</View>

						<View
							style={{
								height: 2,
								backgroundColor: colors.seperator
							}}
						/>
					</TouchableOpacity>
					{this.state.open && (
						<View>
							<TouchableOpacity
								onPress={() => {
									
									this.setState({ open: false });
								}}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: 100000,
									zIndex: 10
								}}
							/>
							<View
								style={{
									position: "absolute",
									top: "100%",
									width: "100%",
									zIndex: 100
								}}
							>
								{options.map(o => {
									return <Item key={o.id} data={o} />;
								})}
							</View>
						</View>
					)}
				</View>
			</AndroidBackHandler>
		);
	}
}
