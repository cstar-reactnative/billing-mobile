import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import TabbarItem from './TabbarItem';

const CustomTabbar = () => (
  <View style={styles.wrapper}>
    <TabbarItem title="Customers" />
    <TabbarItem title="Vendors" />
    <TabbarItem title="Transactions" />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#64afdf',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-around',
  }
});

export default connect()(CustomTabbar);
