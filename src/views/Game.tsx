

import React from "react";
import { StyleSheet, View, Text } from 'react-native'
import Box from "../components/Box";
import ButtonPrimary from "../components/ButtonPrimary";

const style = StyleSheet.create({
  boardView: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    flex: 6,
    flexDirection: 'row'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    color: '#3b5998',
    fontWeight: 'bold',
    fontSize: 24
  }
})

type Props = {
  mode: number | null;
};

type State = {
  mode: number | null;
  gameBoard: (0 | 1 | 2)[][] | null;
  currentSymbol: 0 | 1 | 2;
  winner: string | null;
};

class Game extends React.Component<Props, State> {

  public constructor(props: Props) {
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
  private boxOnPress(row: number, column: number): void {
    // Game not started
    if (this.state.gameBoard === null) {
      return;
    }

    // Already winner
    if (this.state.winner) {
      return;
    }

    // Attempt to select already selected box
    const { gameBoard } = this.state;
    if (gameBoard[row][column] !== 0) {
      return;
    }

    // Updating gameBoard
    gameBoard[row][column] = this.state.currentSymbol;

    // Checking for winner
    const winner = this.checkWinner();

    // If no winner updating board
    if (winner === 0) {
      this.setState(previousState => ({
        currentSymbol: previousState.currentSymbol === 1 ? 2 : 1,
        gameBoard
      }));
    } else { // Setting winner
      this.setState({
        winner: winner === 1
          ? 'Winner is X'
          : winner === 2
            ? 'Winner is O'
            : 'Draw'
      })
    }
  }

  /**
   * Checks is there is a winner on the board
   * @return {number} [0 - 'GAME IN PROGRESS'] || [1 - 'X'] || [2 - 'O'] || [3 - 'DRAW']
   */
  private checkWinner(): 0 | 1 | 2 | 3 {
    // Game not started
    if (this.state.gameBoard === null || this.state.mode === null) {
      throw new Error('Game not started');
    }

    // Data
    const { gameBoard } = this.state;
    const boardSize = this.state.mode;

    // Horizontally
    for (let i = 0; i < gameBoard.length; i++) {
      const sum: number = gameBoard[i].reduce((p: number, c: number) => p + c, 0);
      if (gameBoard[i].indexOf(0) >= 0) {
        continue;
      }
      if (sum === boardSize) {
        return 1;
      }
      if (sum === boardSize * 2) {
        return 2;
      }
    }

    // Vertically
    for (let i = 0; i < gameBoard.length; i++) {
      let sum = 0;
      for (let j = 0; j < gameBoard.length; j++) {
        if (gameBoard[j][i] === 0) sum = Infinity;
        sum += gameBoard[j][i];
      }
      if (sum === boardSize) {
        return 1;
      }
      if (sum === boardSize * 2) {
        return 2;
      }
    }

    // Skew_1
    let skew_1 = 0;
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][i] === 0) {
        skew_1 = Infinity;
        break;
      }
      skew_1 += gameBoard[i][i];
    }
    if (skew_1 === boardSize) {
      return 1;
    }
    if (skew_1 === boardSize * 2) {
      return 2;
    }

    // Skew_2
    let skew_2 = 0;
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][gameBoard.length - 1 - i] === 0) {
        skew_2 = Infinity;
        break;
      }
      skew_2 += gameBoard[i][gameBoard.length - 1 - i];
    }
    if (skew_2 === boardSize) {
      return 1;
    }
    if (skew_2 === boardSize * 2) {
      return 2;
    }

    // Game in progress
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (gameBoard[i][j] === 0) {
          return 0;
        }
      }
    }

    // Draw
    return 3;
  }

  /**
   * Restarts game
   * @param {number} gameMode Size of game board
   */
  private restartGame = (gameMode: number | null): void => {
    if (gameMode === null) {
      return;
    }

    this.setState({
      mode: gameMode, // size of game board
      gameBoard: new Array(gameMode).fill(0).map(v => new Array(gameMode).fill(0)), // new blank board
      currentSymbol: Math.random() < 0.5 ? 1 : 2, // starting with random symbol
      winner: null // no winner info at the begging of the game
    })
  };

  /**
   * On props change
   * @param {object} props
   */
  public componentWillReceiveProps(props: Props) {
    // No changes in mode
    if (this.state.mode === props.mode) {
      return;
    }

    // Changing game board size
    this.restartGame(props.mode);
  }

  public render(): JSX.Element | null {
    // No size detected
    if (this.state.mode === null) {
      return (
        <View style={style.boardView}>
          <Text style={style.text}>Select size</Text>
        </View>
      );
    }

    // Winner
    if (this.state.winner) {
      return (
        <View style={style.buttonView}>
          <ButtonPrimary text={this.state.winner} onPress={() => this.restartGame(this.state.mode)}
            style={{ flex: 1, flexDirection: 'column' }} />
        </View>
      );
    }

    // Game not started
    const { gameBoard } = this.state;
    if (gameBoard === null) {
      return null
    }

    // Rendering game board
    return (
      <View style={style.boardView}>
        {
          gameBoard.map((value, row) => (
            <View style={style.row} key={row}>
              {
                value.map((value, column) =>
                  <Box text={gameBoard[row][column]} key={column}
                    onPress={() => this.boxOnPress(row, column)} />
                )
              }
            </View>
          ))
        }
      </View>
    )
  }
}

export default Game