import React, { Component } from "react";

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
const style = {
	text: {
		fontSize: 15
	}
};

let Item = props => {
	return (
		<TouchableOpacity
			onPress={() => {
				console.log("pressed");
			}}
			style={{
				backgroundColor: "rgba(255,255,255,0.8)",
				width: "100%",
				marginBottom: 6,
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
				<Text style={style.text}>{props.data.name}!</Text>
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
						backgroundColor: "#eee"
					}}
				>
					<View style={{}}>
						<Text style={style.text}>Home</Text>
					</View>
				</TouchableOpacity>
				{this.state.open && (
					<View
						style={{
							position: "absolute",
							top: "100%",
							width: "100%",
							zIndex: 100,
							marginTop:6
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
