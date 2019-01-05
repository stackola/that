import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "that/colors";

import { TouchableOpacity, View, TextInput, FlatList } from "react-native";
const IconOption = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
      }}
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: colors.textMinor,
        marginRight: 4,
        borderRadius: 5
      }}
    >
      <Icon size={40} color={props.color || colors.text} name={props.name} />
    </TouchableOpacity>
  );
};
export default class Header extends Component {
  componentDidMount() {
    console.log();
  }
  constructor(p) {
    super(p);
    this.state = { open: false, input: "" };
  }

  select(v) {
    this.props.onChange(v);
    this.setState({ open: false });
  }
  render() {
    return (
      <View style={{ width: "100%" }}>
        {!this.state.open && (
          <TouchableOpacity
            onPress={() => {
              this.setState({ open: true });
            }}
            style={{
              borderWidth: 1,
              borderColor: colors.textMinor,
              width: 50,
              height: 50,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon
              name={this.props.value || "rocket"}
              size={40}
              color={this.props.color || colors.text}
            />
          </TouchableOpacity>
        )}
        {this.state.open && (
          <View style={{}}>
            <FlatList
              horizontal={true}
              style={{ flex: 1 }}
              data={Object.keys(Icon.getRawGlyphMap()).filter(a => {
                a = a
                  .trim()
                  .toLowerCase()
                  .replace(/ /g, "")
                  .replace(/\-/g);
                let b = this.state.input
                  .trim()
                  .toLowerCase()
                  .replace(/ /g, "")
                  .replace(/\-/g);
                return a.includes(b);
              })}
              keyExtractor={i => {
                return i;
              }}
              renderItem={i => {
                return (
                  <IconOption
                    onPress={() => {
                      this.select(i.item);
                    }}
                    color={this.props.color}
                    name={i.item}
                  />
                );
              }}
            />

            <TextInput
              multiline={false}
              value={this.state.input}
              placeholder={"Search Icon"}
              onChangeText={text => this.setState({ input: text })}
              placeholderTextColor={colors.placeholder}
              style={{
                color: colors.text,
                backgroundColor: null,
                borderColor: colors.seperator,
                borderBottomWidth: 2,
                margin: 4
              }}
            />
          </View>
        )}
      </View>
    );
  }
}
