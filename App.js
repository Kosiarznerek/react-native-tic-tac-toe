import React from 'react';
import {View, Alert} from 'react-native';

import style from './style/container';

import Header from "./views/Header";
import Menu from './views/Menu';
import Game from './views/Game'

export default class App extends React.Component {

    constructor() {
        super();

        //Available menu options
        this.menuOptions = [
            {val: 3, text: '3x3'},
            {val: 4, text: '4x4'},
            {val: 5, text: '5x5'}
        ];

        //Application sate
        this.state = {
            selectedOption: null //Currently selected option from menu
        }
    }

    /**
     * Triggered when user clicks on any button from menu
     * @param {number} val Value of clicked button
     * @param {string} text Text of clicked button
     */
    onMenuSelect = (val, text) => {
        this.setState({selectedOption: val})
    };

    render() {
        return (
            <View style={style.view}>
                <Header/>
                <Menu options={this.menuOptions} onSelect={this.onMenuSelect}/>
                <Game mode={this.state.selectedOption}/>
            </View>
        );
    }
}
