import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { theme } from '../../infra/color';

interface TextInputProps extends RNTextInputProps {
  errorMessage?: string;
}

const getBorderBottomColor = (isFocused: boolean, isError: boolean) => {
  if (isError) {
    return theme['color-danger-500'];
  }

  if (isFocused) {
    return theme['color-primary-500'];
  }

  return 'black';
};

const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  (props, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const onFocus = () => {
      setIsFocused(true);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    return (
      <View>
        <RNTextInput
          ref={ref}
          autoCorrect={false}
          {...props}
          placeholderTextColor={theme['color-gray-500']}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[
            props.style,
            {
              borderBottomColor: getBorderBottomColor(
                isFocused,
                !!props.errorMessage,
              ),
              fontSize: props.value ? 19 : 16,
              height: 40,
              borderBottomWidth: 1,
            },
          ]}>
          {props.children}
        </RNTextInput>
        {props.errorMessage && (
          <Text
            style={{
              color: theme['color-danger-500'],
              fontSize: 16,
              marginTop: 8,
            }}>
            {props.errorMessage}
          </Text>
        )}
      </View>
    );
  },
);

export default TextInput;
