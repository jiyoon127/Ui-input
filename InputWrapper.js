import {View} from 'react-native';
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
    const {activeLabelFontSize, labelFontSize, padding} = this.props;
    return (
      <View>
        <Input1
          label={this.props.label}
          value={this.state.value}
          activeLabelFontSize={activeLabelFontSize}
          labelFontSize={labelFontSize}
          padding={padding}
          onChangeText={this.handleTextChange}
        />
      </View>
    );
  }
}

export default InputWrapper;
