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

let sorts = ["Top", "New"];
let times = ["1 hour", "6 hours", "24 hours", "7 days", "30 days", "All time"];

export default class SortBar extends Component {
	constructor(p) {
		super(p);
		this.state = {
			open: false,
			selectedSort: "New",
			selectedTime: "1 Hour"
		};
	}
	setSort(sort) {
		this.setState({ selectedSort: sort });
	}
	setTime(time) {
		this.setState({ selectedTime: time });
	}
	render() {
		return (
			<View>
				{!this.state.open && (
					<TouchableOpacity
						onPress={() => {
							this.setState({ open: true });
						}}
						style={{
							flexDirection: "row",
							paddingTop: 10,
							paddingBottom: 10
						}}
					>
						<View style={{ flex: 1, flexDirection: "row" }}>
							<View
								style={{
									flex: 1,
									alignItems: "center"
								}}
							>
								<Text style={{ color: colors.text }}>
									<MDIcon name="sort-variant" size={15} />
								</Text>
							</View>
							<View style={{ flex: 1, justifyContent: "center" }}>
								<Text style={{ color: colors.text }}>
									{this.state.selectedSort}
								</Text>
							</View>
						</View>
						{this.state.selectedSort != "New" ? (
							<View style={{ flex: 1, flexDirection: "row" }}>
								<View
									style={{
										flex: 1,
										alignItems: "center"
									}}
								>
									<Text style={{ color: colors.text }}>
										<MDIcon
											name="clock-outline"
											size={15}
										/>
									</Text>
								</View>
								<View
									style={{
										flex: 1,
										justifyContent: "center"
									}}
								>
									<Text style={{ color: colors.text }}>
										{this.state.selectedTime}
									</Text>
								</View>
							</View>
						) : (
							<View style={{ flex: 1 }} />
						)}
					</TouchableOpacity>
				)}
				{this.state.open && (
					<View>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								paddingTop: 10,
								paddingBottom: 10
							}}
						>
							<View style={{ flex: 1, flexDirection: "row" }}>
								<View
									style={{
										flex: 1,
										alignItems: "center"
									}}
								>
									<Text style={{ color: colors.text }}>
										<MDIcon name="sort-variant" size={15} />
									</Text>
								</View>
								<View style={{ flex: 1 }}>
									{sorts.map(s => {
										return (
											<TouchableOpacity
												key={s}
												onPress={() => {
													this.setSort(s);
												}}
											>
												<Text
													style={{
														color:
															s ==
															this.state
																.selectedSort
																? colors.downvote
																: colors.text
													}}
												>
													{s}
												</Text>
											</TouchableOpacity>
										);
									})}
								</View>
							</View>
							{this.state.selectedSort != "New" ? (
								<View style={{ flex: 1, flexDirection: "row" }}>
									<View
										style={{
											flex: 1,
											alignItems: "center"
										}}
									>
										<Text style={{ color: colors.text }}>
											<MDIcon
												name="clock-outline"
												size={15}
											/>
										</Text>
									</View>
									<View style={{ flex: 1 }}>
										{times.map(s => {
											return (
												<TouchableOpacity
													key={s}
													onPress={() => {
														this.setTime(s);
													}}
												>
													<Text
														style={{
															color:
																s ==
																this.state
																	.selectedTime
																	? colors.downvote
																	: colors.text
														}}
													>
														{s}
													</Text>
												</TouchableOpacity>
											);
										})}
									</View>
								</View>
							) : (
								<View style={{ flex: 1 }} />
							)}
						</View>
						<TouchableOpacity
							onPress={() => {
								this.setState({ open: false });
							}}
							style={{
								height: 30,
								backgroundColor: colors.seperator,
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<MDIcon
								name="chevron-up"
								color={colors.textMinor}
								size={25}
							/>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}
}
