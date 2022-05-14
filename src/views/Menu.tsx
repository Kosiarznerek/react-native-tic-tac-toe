

import React from "react";
import { StyleSheet, View } from 'react-native'
import ButtonPrimary from "../components/ButtonPrimary";

const style = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: { // Overwriting/adding default ButtonPrimary style
    flex: 1
  }
})

type Props = {
  options: Array<{
    val: number;
    text: string;
  }>;
  onSelect?: ((value?: number) => void) | undefined
};

const Menu: React.FC<Props> = ({ options, onSelect }) => {
  return (
    <View style={style.view}>
      {options.map((menuOption, index) => {
        return (
          <ButtonPrimary key={index} val={menuOption.val} text={menuOption.text}
            onPress={onSelect} style={style.button} />
        )
      })}
    </View>
  )
}

export default Menu