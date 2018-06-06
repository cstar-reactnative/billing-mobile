import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import moment from 'moment';

export default ({ data }) => {
  return (
    <View style={styles.container}>
      <Grid>
        <Col style={styles.column}>
          <Text style={[styles.text]}>
            {data.customer_id
              ? data.customer && data.customer.business_name
              : data.vendor && data.vendor.business_name}
          </Text>
        </Col>
        <Col style={[styles.column, { paddingLeft: 5 }]}>
          <Text style={[styles.text]}>{data.action.replace('Invoice #', `Invoice #${data.invoice_id}`)}</Text>
        </Col>
        <Col style={[styles.column, { alignItems: 'center' }]}>
          <Text style={[styles.text]}>{moment(data.created_at).format('M/D/YY')}</Text>
        </Col>
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
    flexDirection: 'row',
    padding: 12,
  },
  column: {
    alignSelf: 'center'
  },
  text: {
    color: '#4A4A4A',
    fontSize: 12
  }
});
