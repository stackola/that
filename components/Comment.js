import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "that/redux/actions";
import { bindActionCreators } from "redux";

import { SwipeRow } from "react-native-swipe-list-view";
import colors from "that/colors";
import VoteButtons from "that/components/VoteButtons";
import ExpandingTextInput from "that/components/ExpandingTextInput";
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	TouchableOpacity,
	StyleSheet,
	View,
	Text
} from "react-native";

export default class Comment extends Component {
	constructor(p){
		super(p);
		this.state={replying:false};
	}
	render() {
		return (
			<View>
			<View style={{ flexDirection: "row" }}>
				<View style={{}}>
					<VoteButtons />
				</View>
				<View style={{ flex: 1 }}>
					<SwipeRow
						swipeToOpenPercent={20}
						swipeToClosePercent={20}
						leftOpenValue={155}
						rightOpenValue={0}
						style={{ minHeight: 80 }}
						ref={(ref)=>{this.ref=ref}}
						onRowPress={()=>{return false}}
					>
						<View style={{ backgroundColor: colors.hidden }}>
							<View style={{ minHeight: 80, padding: 4 }}>
							<TouchableOpacity onPress={()=>{this.setState({replying:true}); this.ref.closeRow()}}>
								
								<Text style={{ color: colors.text }}>
									Behind!
								</Text>
							</TouchableOpacity>
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
									style={{
										color: colors.text,
										paddingRight: 12,
										padding: 4
									}}
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
			{this.state.replying && 
			<View>
				<ExpandingTextInput
					multiline={true}
					placeholder={"Text"}
					min={120}
					max={600}
					numberOfLines={4}
					ref={(ref)=>{ref && ref.focus()}}
					placeholderTextColor={colors.placeholder}
					style={{
						color: colors.text,
						backgroundColor: null,
						borderColor: colors.seperator,
						borderBottomWidth: 2,
						margin: 4
					}}
				/>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity onPress={()=>{this.setState({replying:false})}} style={{ backgroundColor: colors.downvote, height: 40,flex:1, alignItems:"center", justifyContent:'center' }} ><Text style={{color:colors.text}}>Abbrechen</Text></TouchableOpacity>
					<TouchableOpacity style={{ backgroundColor: colors.upvote, height: 40,flex:1, alignItems:"center", justifyContent:'center' }} ><Text style={{color:colors.text}}>Feuer</Text></TouchableOpacity>
				</View>
			</View>
			}
			</View>
		);
	}
}
