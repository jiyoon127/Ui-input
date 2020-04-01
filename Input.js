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
  };
  constructor(props) {
    super(props);
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    );
    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
    }).start();
  }

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  render() {
    const {label, ...props} = this.props;
    // const {isFocused} = this.state;
    const styles = StyleSheet.create({
      container: {
        paddingTop: 18,
      },
      TextInput: {
        borderBottomColor: '#34bcff',
        borderBottomWidth: 2,
        height: 26,
        fontSize: 20,
        paddingBottom: 8,
        color: '#000',
      },
    });

    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, -10],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 12],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#fff', '#34bcff'],
      }),
    };

    return (
      <View style={styles.container}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={styles.TextInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
          placeholder="이메일 또는 아이디"
        />
      </View>
    );
  }
}

export default App;
