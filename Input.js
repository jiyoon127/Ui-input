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

class App extends Component {
  state = {
    text: '',
    isFocused: false,
    placeholder: '이메일 ',
    lineColor: '#aaa',
  };

  constructor(props) {
    super(props);
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    );
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
    }).start();
  }

  handleFocus = () =>
    this.setState({
      isFocused: true,
      placeholder: '이메일 또는 아이디',
      lineColor: 'transparent',
    });
  handleBlur = () =>
    this.setState({isFocused: false, placeholder: '', lineColor: '#aaa'});

  render() {
    const {label, ...props} = this.props;
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        left: 0,
        marginLeft: 30,
        paddingBottom: 10,
      },
      text: {
        textAlign: 'left',
        includeFontPadding: false,
        textAlignVertical: 'top',
      },
    });

    const containerStyle = {
      transform: [
        {
          scale: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.7],
          }),
        },
        {
          translateY: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -40],
          }),
        },
        {
          translateX: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -30],
          }),
        },
      ],
    };

    const TextInputStyle = {
      borderBottomColor: this.state.lineColor,
      borderBottomWidth: 1,
      paddingBottom: 8,
      height: 36,
      fontSize: 20,
      color: '#000',
    };

    const textStyle = {
      lineHeight: 30,
      fontSize: 20,
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#34bcff'],
      }),
    };

    const lineStyle = {
      color: 'transparent',
      top: 22,
      borderColor: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', '#34bcff'],
      }),

      borderWidth: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
      }),
      transform: [
        {
          scaleX: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 90],
          }),
        },
        {
          translateX: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 2],
          }),
        },
      ],
      // borderh,
    };

    return (
      <>
        <View style={styles.container} pointerEvents="none">
          <Animated.View style={[lineStyle]} />
        </View>
        <Animated.View style={[styles.container, containerStyle]}>
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
      </>
    );
  }
}

export default App;
