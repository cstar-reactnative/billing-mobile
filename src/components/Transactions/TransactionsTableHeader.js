import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';

import sortIcon from '../../assets/images/sort.png';
import sortAscIcon from '../../assets/images/sort-asc.png';
import sortDescIcon from '../../assets/images/sort-desc.png';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
    height: 30,
    paddingLeft: 12,
    paddingRight: 12
  },
  column: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headingText: {
    color: '#9B9B9B',
    fontSize: 10
  },
  sortIcon: {
    marginLeft: 3
  }
});

const TransactionsTableHeader = ({ sort, onPressSortByName, onPressSortByAction, onPressSortByDate }) => (
  <Grid style={styles.container}>
    <Col style={styles.column}>
      <TouchableOpacity style={styles.heading} onPress={() => onPressSortByName(sort.direction)}>
        <Text style={styles.headingText}>Name</Text>
        {sort.column === 'business_name'
          ? <Image source={sort.direction === 'asc' ? sortAscIcon : sortDescIcon} style={styles.sortIcon} />
          : <Image source={sortIcon} style={styles.sortIcon} />}
      </TouchableOpacity>
    </Col>
    <Col style={styles.column}>
      <TouchableOpacity style={styles.heading} onPress={() => onPressSortByAction(sort.direction)}>
        <Text style={styles.headingText}>Action</Text>
        {sort.column === 'action'
          ? <Image source={sort.direction === 'asc' ? sortAscIcon : sortDescIcon} style={styles.sortIcon} />
          : <Image source={sortIcon} style={styles.sortIcon} />}
      </TouchableOpacity>
    </Col>
    <Col style={styles.column}>
      <TouchableOpacity style={styles.heading} onPress={() => onPressSortByDate(sort.direction)}>
        <Text style={styles.headingText}>Date</Text>
        {sort.column === 'created_at'
          ? <Image source={sort.direction === 'asc' ? sortAscIcon : sortDescIcon} style={styles.sortIcon} />
          : <Image source={sortIcon} style={styles.sortIcon} />}
      </TouchableOpacity>
    </Col>
  </Grid>
);

const mapStateToProps = state => ({
  sort: state.logsTableSort
});

const mapDispatchToProps = dispatch => ({
  onPressSortByName: (prevDir) => {
    dispatch({ type: 'SORT_LOGS', column: 'business_name', direction: prevDir === 'asc' ? 'desc' : 'asc' });
  },
  onPressSortByAction: (prevDir) => {
    dispatch({ type: 'SORT_LOGS', column: 'action', direction: prevDir === 'asc' ? 'desc' : 'asc' });
  },
  onPressSortByDate: (prevDir) => {
    dispatch({ type: 'SORT_LOGS', column: 'created_at', direction: prevDir === 'asc' ? 'desc' : 'asc' });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsTableHeader);
