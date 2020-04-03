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
import React, {Component} from 'react';
import Input1 from './Input';

class InputWrapper extends Component {
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
      <View>
        <Input1
          label={this.props.label}
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

export default InputWrapper;
