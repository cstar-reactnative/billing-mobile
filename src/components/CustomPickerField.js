import React from 'react';
import { StyleSheet, View, TextInput, Image, Text } from 'react-native';
import ModalPicker from 'react-native-modal-picker';

export default ({ value, label, data, onChange, style }) => {
  let labelComponent = null;
  let arrowStyle = styles.arrow;
  const textInputValue = value && value.label;

  if (label) {
    labelComponent = <Text style={[styles.genericColorText, styles.label]}>{label}</Text>;
    arrowStyle = [styles.arrow, styles.arrowPlanB];
  }

  return (
    <ModalPicker data={data} onChange={onChange} cancelText="Cancel">
      <View style={style}>
        {labelComponent}
        <TextInput editable={false} value={textInputValue} style={[styles.inputField, styles.genericColorText]} />
        <Image source={require('../assets/images/arrow-down.png')} style={arrowStyle} />
      </View>
    </ModalPicker>
  );
};

const styles = StyleSheet.create({
  genericColorText: {
    color: '#4A4A4A',
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  inputField: {
    backgroundColor: '#F6F6F6',
    borderColor: '#DBDBDB',
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 11,
    height: 30,
    padding: 6,
    paddingRight: 20,
  },
  arrow: {
    position: 'absolute',
    right: 8,
    top: '40%',
  },
  arrowPlanB: {
    top: '60%'
  }
});
