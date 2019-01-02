import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import VoteButtons from "that/components/VoteButtons";

import { vote } from "that/lib";

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
	constructor(p) {
		super(p);
		this.state = { user: {} };
	}
	componentDidMount() {
		let data = this.props.data || {};
		if (data.user) {
			console.log("GETTING USER");
			data.user.get().then(d => {
				this.setState({ user: d.data() });
			});
		} else {
			console.log(this.props.data);
			console.log("NO GET USER");
		}
	}
	componentWillUnmount() {
	}
	render() {
		let data = this.props.data || {};
		return (
			<View
				style={{
					width: "100%",
					backgroundColor: colors.backgroundOffset,
					minHeight: 150,
					flexDirection: "row",
					borderBottomWidth: 4,
					borderColor: colors.seperator
				}}
			>
				<View style={{ flex: 1 }}>
					<View style={{ flex: 1, alignItems: "center" }}>
						<VoteButtons
							points={data.upvotes - data.downvotes}
							upvoters={data.upvoters}
							downvoters={data.downvoters}
							onUpvote={() => {
								vote({path:"/groups/"+data.group+"/posts/"+data.id, id:data.id, vote:"up"})
							}}
							onDownvote={()=>{
								vote({path:"/groups/"+data.group+"/posts/"+data.id, id:data.id, vote:"down"})
							}}
						/>
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
							<MDIcon size={9} name={"message"} /> {data.comments}
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
							{this.props.data.title}
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
							{this.props.data.text}
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
								marginBottom: 0,
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
								Von @{this.state.user.username} in /{data.group}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}
