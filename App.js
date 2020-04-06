import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Input1 from './InputWrapper';

class App extends Component {
  state = {
    activeLabelFontSize: 12,
    labelFontSize: 16,
    padding: 30,
  };
  render() {
    return (
      <View style={styles.container}>
        <Input1
          label="이메일 또는 아이디"
          activeLabelFontSize={this.state.activeLabelFontSize}
          labelFontSize={this.state.labelFontSize}
          padding={this.state.padding}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
});

export default App;
