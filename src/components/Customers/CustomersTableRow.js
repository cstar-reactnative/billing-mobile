import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import accounting from 'accounting';

import { CUSTOMER_AR_STATUS } from '../../constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
    flexDirection: 'row',
    padding: 12,
  },
  column: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  moreIndicator: {
    position: 'absolute',
    right: 9,
  },
  text: {
    color: '#4A4A4A'
  },
  customerName: {
    fontWeight: 'bold'
  },
  arValue: {
    fontSize: 12
  },
  arStatus: {
    backgroundColor: '#6EBA22',
    height: 4,
    marginTop: 3,
    width: 40,
  },
  arStatusNeardue: { backgroundColor: '#FDE700' },
  arStatusOverdue: { backgroundColor: '#FC000D' },
});

export default ({ customerName, arValue, arStatus, onPressCustomerName, onPressSendReminder, onPressInvoice }) => {
  let arStatusView = null;

  if (arValue > 0) {
    switch (arStatus) {
      case CUSTOMER_AR_STATUS.OK:
        arStatusView = <View style={styles.arStatus} />;
        break;
      case CUSTOMER_AR_STATUS.NEAR_DUE:
        arStatusView = <View style={[styles.arStatus, styles.arStatusNeardue]} />;
        break;
      case CUSTOMER_AR_STATUS.OVERDUE:
        arStatusView = (
          <View style={{ alignItems: 'center' }}>
            <View style={[styles.arStatus, styles.arStatusOverdue]} />
            <TouchableOpacity style={{ marginTop: 10 }} onPress={onPressSendReminder}>
              <Text style={{ fontSize: 10, color: '#9B9B9B' }}>Send Reminder</Text>
            </TouchableOpacity>
          </View>
        );
        break;
    }
  } else {
    arStatusView = <Text>None</Text>;
  }

  return (
    <View style={styles.container}>
      <Grid>
        <Col style={styles.column}>
          <TouchableOpacity onPress={onPressCustomerName}>
            <Text style={[styles.text, styles.customerName]}>{customerName}</Text>
          </TouchableOpacity>
        </Col>
        <Col style={styles.column}>
          {arValue > 0 ? <Text style={[styles.text, styles.arValue]}>{accounting.formatMoney(arValue, '$', 2)}</Text> : null}
          {arStatusView}
        </Col>
        <Col style={styles.column}>
          <TouchableOpacity onPress={onPressInvoice}>
            <Image source={require('../../assets/images/dollar-circle.png')} />
          </TouchableOpacity>
        </Col>
      </Grid>
      <Image source={require('../../assets/images/arrow-right.png')} style={styles.moreIndicator} />
    </View>
  );
};
