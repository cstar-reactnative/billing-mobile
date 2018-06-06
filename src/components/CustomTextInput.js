import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default ({ label, style, inputStyle, keyboardType, multiline, value, onChangeText }) => {
  const labelComponent = label
    ? <Text style={[styles.genericColorText, styles.label]}>{label}</Text>
    : null;

  return (
    <View style={style}>
      {labelComponent}
      <TextInput
        style={[styles.input, styles.genericColorText, styles.genericFontSizeText, inputStyle]}
        keyboardType={keyboardType}
        multiline={multiline}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  genericColorText: {
    color: '#4A4A4A',
  },
  genericFontSizeText: {
    fontSize: 11,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderColor: '#DBDBDB',
    borderRadius: 4,
    borderWidth: 1,
    height: 30,
    padding: 6,
  },
});
