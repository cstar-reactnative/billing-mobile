import React, { PropTypes } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

const CustomButton = ({ title, iconSrc, iconTextAlign = 'horizontal', style, onPress }) => {
  const icon = iconSrc ? <Image source={iconSrc} style={styles.icon} /> : null;
  const containerStyle = iconTextAlign === 'horizontal' ? [styles.container, { flexDirection: 'row' }] : styles.container;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[containerStyle, style]}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string,
  iconSrc: PropTypes.number,
  iconTextAlign: PropTypes.oneOf(['horizontal', 'vertical']),
  style: View.propTypes.style,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3E83D4',
    padding: 6.63,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold'
  },
  icon: {
    marginRight: 3
  }
});

export default CustomButton;
