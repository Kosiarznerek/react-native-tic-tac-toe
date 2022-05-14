

import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { Text, TouchableOpacity } from "react-native";

const style = StyleSheet.create({
  touchableOpacity: {
    justifyContent: 'center',
    padding: 10,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#3b5998',
    backgroundColor: '#ffffff',
    margin: 2
  },
  text: {
    textAlign: 'center',
    color: '#3b5998',
    fontWeight: 'bold',
    fontSize: 18,
  }
})

type Props = {
  val?: number;
  text?: string;
  style: StyleProp<ViewStyle>;
  onPress?: (value?: number) => void
};

const ButtonPrimary: React.FC<Props> = ({
  val,
  text,
  onPress,
  style: propsStyle
}) => {
  return (
    <TouchableOpacity
      style={[style.touchableOpacity, propsStyle]}
      onPress={() => onPress ? onPress(val) : null}
    >
      <Text style={style.text}>{text || ''}</Text>
    </TouchableOpacity>
  )
}

export default ButtonPrimary;