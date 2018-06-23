import React from "react";
import {Text, View} from "react-native";
import style from '../style/views/header';

export default class Header extends React.Component {
    render() {
        return (
            <View style={style.view}>
                <Text style={style.text}>Tic-Tac-Toe</Text>
            </View>
        )
    }
}