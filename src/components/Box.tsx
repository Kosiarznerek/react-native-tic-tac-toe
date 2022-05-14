

import React from "react";
import { GestureResponderEvent, StyleSheet } from 'react-native'
import { Text, TouchableOpacity } from "react-native";

const style = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    backgroundColor: '#3b5998',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4
  },
  text: {
    color: '#f7f7f7',
    fontWeight: 'bold',
    fontSize: 40
  }
})

type Props = {
  text: 0 | 1 | 2;
  onPress: ((event: GestureResponderEvent) => void)
};

const Box: React.FC<Props> = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      style={style.touchableOpacity}
      onPress={onPress}
    >
      <Text style={style.text}>{
        text === 0
          ? ''
          : text === 1
            ? 'X'
            : 'O'
      }</Text>
    </TouchableOpacity>
  )
}

export default Box