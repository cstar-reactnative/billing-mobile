import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default ({ label, date, style, onChange }) => {
  const labelComponent = label
    ? <Text style={[styles.genericColorText, styles.label]}>{label}</Text>
    : null;

  return (
    <View style={style}>
      {labelComponent}
      <DatePicker
        style={{ width: '100%', marginTop: -2 }}
        date={date}
        mode="date"
        placeholder="Choose date.."
        format="M/D/YY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateInput: styles.dateInput,
          dateText: [styles.genericColorText, styles.genericFontSizeText],
          placeholderText: styles.genericFontSizeText
        }}
        onDateChange={onChange}
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
  },
  dateInput: {
    alignItems: 'baseline',
    backgroundColor: '#F6F6F6',
    borderColor: '#DBDBDB',
    borderRadius: 4,
    borderWidth: 1,
    height: 30,
    padding: 6,
  },
});
