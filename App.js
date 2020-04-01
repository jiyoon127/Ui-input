/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';

import Input from './Input';

class App extends Component {
  state = {
    value: '',
  };

  handleTextChange = text =>
    this.setState({
      value: text,
    });

  render() {
    return (
      <View style={styles.container}>
        <Input
          label="이메일 또는 아이디"
          value={this.state.value}
          onChangeText={this.handleTextChange}
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
