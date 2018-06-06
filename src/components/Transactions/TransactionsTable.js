import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import TransactionsTableHeader from './TransactionsTableHeader';
import TransactionsTableRow from './TransactionsTableRow';

const styles = StyleSheet.create({
  table: {
    backgroundColor: 'white',
  }
});

const TransactionsTable = ({ logs }) => (
  <View style={styles.table}>
    <TransactionsTableHeader />
    {logs.map(log => <TransactionsTableRow key={log.id} data={log} />)}
  </View>
);

const mapStateToProps = state => ({
  logs: state.logs
});

export default connect(mapStateToProps)(TransactionsTable);
