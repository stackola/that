import React, { Component } from "react";
import colors from "that/colors";
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
				<Text style={{fontSize:15, color:colors.dropdownFont}}>{props.data.name}!</Text>
			</View>
		</TouchableOpacity>
	);
};
export default class HeaderDropdown extends Component {
	constructor(p) {
		super(p);
		this.state = { open: false };
	}
	render() {
		const options = [
			{ name: "Home", id: "home" },
			{ name: "My Town", id: "myTown" },
			{ name: "My Clubs", id: "myClubs" },
			{ name: "Multicopter", id: "multicopter" }
		];
		return (
			<View style={{ width: "100%" }}>
				<TouchableOpacity
					onPress={() => {
						this.setState({ open: !this.state.open });
					}}
					style={{
						paddingTop: 20,
						paddingBottom: 20,
						paddingLeft: 10,
						justifyContent: "center",
						backgroundColor: colors.headerBackground
					}}
				>
					<View style={{}}>
						<Text
							style={{
								fontSize: 15,
								color: colors.headerFont
							}}
						>
							Home
						</Text>
					</View>
				</TouchableOpacity>
				{this.state.open && (
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
				)}
			</View>
		);
	}
}
