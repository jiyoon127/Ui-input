import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import Input1 from './Input';

class InputWrapper extends Component {
  state = {
    value: '',
  };

  handleTextChange = (text) => {
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

export default InputWrapper;
