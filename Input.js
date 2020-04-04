import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Animated, Dimensions} from 'react-native';

class App extends Component {
  state = {
    text: '',
    isFocused: false,
    placeholder: this.props.label,
    lineColor: '#aaa',
    borderBottomColor: 'transparent',
    fontColor: '#add',
    activeFontSize: 16,
    labelFontSize: 20,
    width: Dimensions.get('window').width,
    padding: 30,
  };

  handleTextChange = (value) => {
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
      placeholder: this.props.label,
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
        paddingBottom: this.state.padding * 2,
      },
      text: {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    });

    const containerStyle = {
      position: 'absolute',
      includeFontPadding: false,
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
      color: this.state.fontColor,
      paddingTop: `${this.state.labelFontSize}` * 0.25 - 2,
    };

    const TextInputStyle = {
      borderBottomColor: this.state.lineColor,
      borderBottomWidth: 1,
      paddingBottom: 7,
      lineHeight: 24,
      padding: 0,
      // height: 34,
      // justifyContents: 'center',
      includeFontPadding: false,
      // fontSize: 20,
      backgroundColor: 'red',
      // color: 'red',
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
          <Animated.View>
            <TextInput
              {...props}
              multiline={false}
              style={TextInputStyle}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              blurOnSubmit
              placeholder={this.state.placeholder}
              clearButtonMode="always"
            />
          </Animated.View>
          <Animated.View style={lineStyle} />
        </View>
      </>
    );
  }
}

export default App;
