import React from "react";
import {Text, TouchableOpacity} from "react-native";
import style from '../style/components/buttonPrimary';

export default class ButtonPrimary extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={[style.touchableOpacity, this.props.style]}
                onPress={() => this.props.onPress ? this.props.onPress(this.props.val, this.props.text) : null}
            >
                <Text style={style.text}>{this.props.text || ''}</Text>
            </TouchableOpacity>
        )
    }
}