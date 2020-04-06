import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Animated, Dimensions} from 'react-native';

class App extends Component {
  state = {
    isFocused: false,
    placeholder: '',
    lineColor: '#aaa',
    borderBottomColor: 'transparent',
    fontColor: '#aaa',
    width: Dimensions.get('window').width,
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
      duration: 350,
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
    const {
      label,
      activeLabelFontSize,
      labelFontSize,
      padding,
      ...props
    } = this.props;

    const styles = StyleSheet.create({
      container: {
        position: 'relative',
        paddingBottom: padding * 2,
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
            outputRange: [
              4,
              -labelFontSize * (1 + activeLabelFontSize / labelFontSize),
            ],
          }),
        },
      ],
    };

    const textStyle = {
      lineHeight: labelFontSize,
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [labelFontSize, activeLabelFontSize],
      }),
      color: this.state.fontColor,
    };

    const TextInputStyle = {
      borderBottomColor: this.state.lineColor,
      borderBottomWidth: 1,
      paddingBottom: (labelFontSize - activeLabelFontSize) * 2,
      lineHeight: labelFontSize + 4,
      fontSize: labelFontSize,
    };

    const lineStyle = {
      borderBottomColor: this.state.borderBottomColor,
      borderBottomWidth: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
      }),
      width: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [0, this.state.width - padding * 2],
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
