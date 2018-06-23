import React from "react";
import {Text, View} from "react-native";
import style from '../style/views/game';
import Box from '../components/Box';

export default class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: null,
            gameBoard: null,
            currentSymbol: 0,
            winner: null
        }
    }

    /**
     * Triggered when user pressed any game tile
     * @param {number} row Row of pressed box
     * @param {number} column Column od pressed box
     */
    boxOnPress(row, column) {
        //Already winner
        if (this.state.winner) return;

        //Attemp to select already selected box
        if (this.state.gameBoard[row][column] !== 0) return;

        //Updating gameBoard
        const {gameBoard} = this.state;
        gameBoard[row][column] = this.state.currentSymbol;

        //Checking for winner
        const winner = this.checkWinner();

        //If no winner updating board
        if (winner === 0) this.setState(previousState => ({
            currentSymbol: previousState.currentSymbol === 1 ? 2 : 1,
            gameBoard
        }));

        //Setting winner
        else this.setState({
            winner: winner === 1
                ? 'Winner is X'
                : winner === 2
                    ? 'Winner is O'
                    : 'Draw'
        })
    }

    /**
     * Checks is there is a winner on the board
     * @return {number} [0 - 'GAME IN PROGRESS'] || [1 - 'X'] || [2 - 'O'] || [3 - 'DRAW']
     */
    checkWinner() {
        //Data
        const {gameBoard} = this.state;
        const boardSize = this.state.mode;

        //Horizontally
        for (let i = 0; i < gameBoard.length; i++) {
            const sum = gameBoard[i].reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            if (gameBoard[i].indexOf(0) >= 0) continue;
            if (sum === boardSize) return 1;
            if (sum === boardSize * 2) return 2;
        }

        //Vertically
        for (let i = 0; i < gameBoard.length; i++) {
            let sum = 0;
            for (let j = 0; j < gameBoard.length; j++) {
                if (gameBoard[j][i] === 0) sum = Infinity;
                sum += gameBoard[j][i];
            }
            if (sum === boardSize) return 1;
            if (sum === boardSize * 2) return 2;
        }

        //Skew_1
        let skew_1 = 0;
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i][i] === 0) {
                skew_1 = Infinity;
                break;
            }
            skew_1 += gameBoard[i][i];
        }
        if (skew_1 === boardSize) return 1;
        if (skew_1 === boardSize * 2) return 2;

        //Skew_2
        let skew_2 = 0;
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i][gameBoard.length - 1 - i] === 0) {
                skew_2 = Infinity;
                break;
            }
            skew_2 += gameBoard[i][gameBoard.length - 1 - i];
        }
        if (skew_2 === boardSize) return 1;
        if (skew_2 === boardSize * 2) return 2;

        //Game in progress
        for (let i = 0; i < gameBoard.length; i++)
            for (let j = 0; j < gameBoard[i].length; j++)
                if (gameBoard[i][j] === 0) return 0;

        //Draw
        return 3;
    }

    render() {
        return (
            <View style={style.view}>
                {
                    typeof this.props.mode !== 'number' && this.state.winner === null
                        ? (<Text style={style.text}>Select size</Text>) //no winner and no game mode detected
                        : this.state.winner !== null && this.props.mode === this.state.mode
                        ? (<Text style={style.text}>{this.state.winner}</Text>) //winner info
                        : this.props.mode === this.state.mode
                            ? this.state.gameBoard.map((value, row) => { //size of game board was not changed so rendering current
                                return (
                                    <View style={style.row} key={row}>
                                        {
                                            value.map((value, column) =>
                                                <Box text={this.state.gameBoard[row][column]} key={column}
                                                     onPress={() => this.boxOnPress(row, column)}/>
                                            )
                                        }
                                    </View>
                                )
                            })
                            : this.setState({ //size of game board was changed so need to restart game
                                mode: this.props.mode, //size of game board
                                gameBoard: new Array(this.props.mode).fill(0).map(v => new Array(this.props.mode).fill(0)), //new blank board
                                currentSymbol: Math.floor(Math.random() * 2) + 1, //starting with random symbol
                                winner: null //no winner info at the begging of the game
                            })
                }
            </View>
        )
    }
}