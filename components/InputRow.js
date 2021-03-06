import React, { Component } from "react";
import colors from "that/colors";
import { TextInput, View, Switch, Picker, Text } from "react-native";
import { HueSlider } from "react-native-color";

import IconPicker from "that/components/IconPicker";

import tinycolor from "tinycolor2";

export default function InputRow(props) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 12 }}>
      <View style={{ flex: 2, justifyContent: "center", paddingRight: 8 }}>
        <Text style={{ color: colors.text }}>{props.title}</Text>
      </View>
      <View style={{ flex: 3 }}>
        {props.type == "text" && (
          <TextInput
            multiline={false}
            value={props.value}
            placeholder={props.placeholder}
            onChangeText={text => props.onChange && props.onChange(text)}
            placeholderTextColor={colors.placeholder}
            editable={!props.readOnly == true}
            style={{
              color: colors.text,
              backgroundColor: null,
              borderColor: colors.seperator,
              borderBottomWidth: 2,
              margin: 4
            }}
          />
        )}

        {props.type == "switch" && (
          <View style={{ flex: 3, alignItems: "flex-start" }}>
            <Switch
              value={props.value}
              onValueChange={v => {
                props.onChange && props.onChange(v);
              }}
            />
          </View>
        )}

        {props.type == "icon" && (
          <View style={{ flex: 3 }}>
            <IconPicker
              value={props.value}
              color={props.color}
              onChange={v => {
                props.onChange && props.onChange(v);
              }}
            />
          </View>
        )}

        {props.type == "color" && (
          <View style={{ flex: 3, alignItems: "flex-start" }}>
            <HueSlider
              gradientSteps={40}
              style={{ alignSelf: "stretch", marginLeft: 12, marginTop: 12 }}
              value={tinycolor(props.value || "#000").toHsl().h}
              onValueChange={v => {
                props.onChange &&
                  props.onChange(
                    tinycolor({ h: v, s: 100, l: 50 }).toHexString()
                  );
              }}
            />
          </View>
        )}

        {props.type == "picker" && (
          <Picker
            selectedValue={props.value}
            style={{
              height: 50,
              backgroundColor: colors.seperator,
              color: colors.text
            }}
            onValueChange={value => props.onChange && props.onChange(value)}
          >
            {props.items.map(i => {
              return (
                <Picker.Item key={i.value} label={i.label} value={i.value} />
              );
            })}
          </Picker>
        )}
      </View>
    </View>
  );
}
