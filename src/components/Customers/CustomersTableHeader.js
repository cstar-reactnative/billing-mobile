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

const CustomersTableHeader = ({ sort, onPressSortByCustomers, onPressSortByAR }) => (
  <Grid style={styles.container}>
    <Col style={styles.column}>
      <TouchableOpacity style={styles.heading} onPress={() => onPressSortByCustomers(sort.direction)}>
        <Text style={styles.headingText}>Customers</Text>
        {sort.column === 'business_name'
          ? <Image source={sort.direction === 'asc' ? sortAscIcon : sortDescIcon} style={styles.sortIcon} />
          : <Image source={sortIcon} style={styles.sortIcon} />}
      </TouchableOpacity>
    </Col>
    <Col style={styles.column}>
      <TouchableOpacity style={styles.heading} onPress={() => onPressSortByAR(sort.direction)}>
        <Text style={styles.headingText}>A/R</Text>
        {sort.column === 'arValue'
          ? <Image source={sort.direction === 'asc' ? sortAscIcon : sortDescIcon} style={styles.sortIcon} />
          : <Image source={sortIcon} style={styles.sortIcon} />}
      </TouchableOpacity>
    </Col>
    <Col style={styles.column}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Invoice</Text>
      </View>
    </Col>
  </Grid>
);

const mapStateToProps = state => ({
  sort: state.customersTableSort
});

const mapDispatchToProps = dispatch => ({
  onPressSortByCustomers: (prevDir) => {
    dispatch({ type: 'SORT_CUSTOMERS', column: 'business_name', direction: prevDir === 'asc' ? 'desc' : 'asc' });
  },
  onPressSortByAR: (prevDir) => {
    dispatch({ type: 'SORT_CUSTOMERS', column: 'arValue', direction: prevDir === 'asc' ? 'desc' : 'asc' });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomersTableHeader);
