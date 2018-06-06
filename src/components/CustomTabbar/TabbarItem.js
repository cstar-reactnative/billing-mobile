import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: '#1e599d',
    fontWeight: 'bold'
  },
  current: {
    color: '#ffffff'
  }
});

const TabbarItem = ({ title, currentTab, setCurrentTab }) => {
  const style = currentTab == title ? [styles.text, styles.current] : styles.text;
  return (
    <TouchableOpacity onPress={setCurrentTab}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  currentTab: state.tabbar.page
});

const mapDispatchToProps = (dispatch, { title }) => ({
  setCurrentTab: () => dispatch({ type: 'SET_TAB', tab: title })
});

export default connect(mapStateToProps, mapDispatchToProps)(TabbarItem);
