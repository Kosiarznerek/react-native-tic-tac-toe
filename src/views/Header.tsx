

import React from "react";
import { StyleSheet, View, Text } from 'react-native'

const style = StyleSheet.create({
  view: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#3b5998',
    fontWeight: 'bold',
    fontSize: 30
  }
})

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <View style={style.view}>
      <Text style={style.text}>Tic-Tac-Toe</Text>
    </View>
  )
}

export default Header