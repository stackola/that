import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";
import HeaderDropdown from "that/components/HeaderDropdown";
import ExpandingTextInput from "that/components/ExpandingTextInput";
import colors from "that/colors"; 
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	ScrollView,
	TextInput,
	StyleSheet,
	View,
	Text
} from "react-native";

export default class CreationForm extends Component {
	render() {
		return (
			<ScrollView
				style={{
					position: "absolute",
					width: "96%",
					height: "95%",
					marginLeft: "2%",
					marginRight: "2%",
					borderTopRightRadius: 14,
					borderTopLeftRadius: 14,
					bottom: 0,
					backgroundColor: colors.overlayBackground,
					paddingTop:12,
					paddingLeft:12,
					paddingRight:12,
				}}
			>
			<TextInput multiline={false} placeholder={"Title"} placeholderTextColor={colors.placeholder} style={{color:colors.text, backgroundColor:null,borderColor:colors.seperator,borderBottomWidth:2, margin:4}}/>
			<ExpandingTextInput multiline={true} placeholder={"Text"} min={120} max={200} numberOfLines={4} placeholderTextColor={colors.placeholder} style={{color:colors.text, backgroundColor:null,borderColor:colors.seperator,borderBottomWidth:2, margin:4}}/>
			<TextInput multiline={false} placeholder={"Wohin"} value={"/lustig"} placeholderTextColor={colors.placeholder} style={{color:colors.text, backgroundColor:null,borderColor:colors.seperator,borderBottomWidth:2, margin:4}}/>
			</ScrollView>
		);
	}
}
