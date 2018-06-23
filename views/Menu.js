import {View} from "react-native";
import React from "react";
import ButtonPrimary from '../components/ButtonPrimary';
import style from '../style/views/menu'

export default class Menu extends React.Component {

    render() {
        return (
            <View style={style.view}>
                {this.props.options.map((menuOption, index) => {
                    return (
                        <ButtonPrimary key={index} val={menuOption.val} text={menuOption.text}
                                       onPress={this.props.onSelect} style={style.button}/>
                    )
                })}
            </View>
        )
    }

}