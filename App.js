import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Input1 from './InputWrapper';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Input1 label="email" />
        <Input1 label="password" />
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
