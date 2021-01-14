import React from 'react';
import {StyleSheet, View} from 'react-native';

import InputField from './Input';

interface Props {}
interface State {
  activeLabelFontSize: number;
  labelFontSize: number;
  padding: number;
}
class App extends React.Component<Props, State> {
  state: State = {
    activeLabelFontSize: 12,
    labelFontSize: 16,
    padding: 30,
  };

  styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      justifyContent: 'center',
    },
  });

  render() {
    return (
      <View style={this.styles.container}>
        <InputField
          label="email or handle"
          activeLabelFontSize={this.state.activeLabelFontSize}
          labelFontSize={this.state.labelFontSize}
          padding={this.state.padding}
          secure={false}
        />
        <InputField
          label="password"
          activeLabelFontSize={this.state.activeLabelFontSize}
          labelFontSize={this.state.labelFontSize}
          padding={this.state.padding}
          secure={true}
        />
      </View>
    );
  }
}

export default App;
