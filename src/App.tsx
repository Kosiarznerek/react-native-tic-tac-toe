import React from 'react';
import { View, StyleSheet } from 'react-native';
import Game from './views/Game';
import Header from './views/Header';
import Menu from './views/Menu';

const style = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: '#ffffff'
  }
})

type Props = {}

type State = {
  selectedOption: number | null
}

export default class App extends React.Component<Props, State> {

  public readonly menuOptions: Array<{
    val: number;
    text: string;
  }>

  constructor(props: Props) {
    super(props);

    // Available menu options
    this.menuOptions = [
      { val: 3, text: '3x3' },
      { val: 4, text: '4x4' },
      { val: 5, text: '5x5' }
    ];

    // Application sate
    this.state = {
      selectedOption: null //Currently selected option from menu
    }
  }

  /**
   * Triggered when user clicks on any button from menu
   * @param {number} val Value of clicked button
   */
  private onMenuSelect = (val?: number): void => {
    this.setState({ selectedOption: val ?? null })
  };

  public render(): JSX.Element {
    return (
      <View style={style.view}>
        <Header />
        <Menu options={this.menuOptions} onSelect={this.onMenuSelect} />
        <Game mode={this.state.selectedOption} />
      </View>
    );
  }
}