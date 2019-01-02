import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import colors from "that/colors"
import Icon from "react-native-vector-icons/Ionicons";
import { getUID} from "that/lib";
const uid=getUID();
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from "react-native";

export default class VoteButtons extends React.PureComponent {
	hasUpvoted(){
		return (this.props.upvoters && this.props.upvoters.includes(uid))
	}
	hasDownvoted(){
		return (this.props.downvoters && this.props.downvoters.includes(uid))
	}
	render() {
		
		return (
			<View style={{ width:35, maxHeight: 100, minHeight:80}}>
				<TouchableOpacity
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center"
					}}
					onPress={()=>{
						if (this.props.onUpvote){
							this.props.onUpvote();
						}
					}}
				>
					<Icon name={"md-arrow-up"} color={this.hasUpvoted()?colors.upvote:'#ccc'} size={25} />
				</TouchableOpacity>
				<View
					style={{

						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Text style={{ color: "white", textAlign: "center" }}>
						{this.props.points||0}
					</Text>
				</View>
				<TouchableOpacity
				onPress={()=>{
						if (this.props.onDownvote){
							this.props.onDownvote();
						}
					}}
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Icon name={"md-arrow-down"} color={this.hasDownvoted()?colors.downvote:'#ccc'} size={25} />
				</TouchableOpacity>
			</View>
		);
	}
}
