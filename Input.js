/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';

class App extends Component {
  state = {
    text: '',
    isFocused: false,
    placeholder: '',
    lineColor: '#aaa',
    borderBottomColor: 'transparent',
    fontColor: '#aaa',
    activeFontSize: 15,
    labelFontSize: 20,
    width: Dimensions.get('window').width,
    padding: 30,
  };

  handleTextChange = value => {
    this.setState({
      text: value,
    });
  };

  constructor(props) {
    super(props);
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    );
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 250,
    }).start();
  }

  handleFocus = () =>
    this.setState({
      isFocused: true,
      placeholder: '이메일 또는 아이디',
      lineColor: 'transparent',
      borderBottomColor: '#34bcff',
      fontColor: '#34bcff',
    });
  handleBlur = () =>
    this.setState({
      isFocused: false,
      placeholder: '',
      lineColor: '#aaa',
      borderBottomColor: 'transparent',
      fontColor: '#aaa',
    });

  render() {
    const {label, ...props} = this.props;

    const styles = StyleSheet.create({
      container: {
        position: 'relative',
        left: 0,
        // marginLeft: 30,
        paddingBottom: this.state.padding * 2,
      },
      text: {
        textAlign: 'left',
        includeFontPadding: false,
        textAlignVertical: 'top',
      },
    });

    const containerStyle = {
      position: 'absolute',
      paddingTop: `${this.state.labelFontSize}` * 0.25 + 2,
      transform: [
        {
          translateY: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -this.state.labelFontSize * 1.75],
          }),
        },
      ],
    };

    const textStyle = {
      lineHeight: 20,
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [this.state.labelFontSize, this.state.activeFontSize],
      }),
      // paddingTop: 2,
      color: this.state.fontColor,
    };

    const TextInputStyle = {
      borderBottomColor: this.state.lineColor,
      borderBottomWidth: 1,
      // paddingBottom: 8,
      height: 34,
      fontSize: 20,
      // color: '#000',
    };

    const lineStyle = {
      borderBottomColor: this.state.borderBottomColor,
      borderBottomWidth: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
      }),
      width: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [0, this.state.width - this.state.padding * 2],
      }),
    };

    return (
      <>
        <View style={styles.container}>
          <Animated.View style={containerStyle}>
            <Animated.Text style={[styles.text, textStyle]}>
              {label}
            </Animated.Text>
          </Animated.View>
          <TextInput
            {...props}
            style={TextInputStyle}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blurOnSubmit
            placeholder={this.state.placeholder}
            clearButtonMode="always"
          />
          <Animated.View style={lineStyle} />
        </View>
      </>
    );
  }
}

export default App;
