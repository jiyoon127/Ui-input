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
  Animated,
} from 'react-native';

import Input1 from './InputWrapper';

class App extends Component {
  state = {
    value: '',
  };

  handleTextChange = text => {
    this.setState({
      value: text,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Input1 label="아이디 또는 이메일" />
        <Input1 label="비밀번호" />
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
