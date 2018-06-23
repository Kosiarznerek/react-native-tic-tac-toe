import React from "react";
import {Text, TouchableOpacity} from "react-native";
import style from '../style/components/box'

export default class Box extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={style.touchableOpacity}
                onPress={this.props.onPress}
            >
                <Text style={style.text}>{
                    this.props.text === 0
                        ? ''
                        : this.props.text === 1
                        ? 'X'
                        : 'O'
                }</Text>
            </TouchableOpacity>
        )
    }
}