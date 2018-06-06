import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import accounting from 'accounting';

import { VENDOR_AP_STATUS } from '../../constants';

export default ({ vendorName, apValue, apStatus, billPayable, onPressVendorName, onPressPayButton }) => {
  let apStatusView = null;

  switch (apStatus) {
    case VENDOR_AP_STATUS.OK:
      apStatusView = <View style={styles.apStatus} />;
      break;
    case VENDOR_AP_STATUS.NEAR_DUE:
      apStatusView = <View style={[styles.apStatus, styles.apStatusNeardue]} />;
      break;
    case VENDOR_AP_STATUS.OVERDUE:
      apStatusView = <View style={[styles.apStatus, styles.apStatusOverdue]} />;
      break;
  }

  return (
    <View style={styles.container}>
      <Grid>
        <Col style={styles.column}>
          <TouchableOpacity onPress={onPressVendorName}>
            <Text style={[styles.text, styles.vendorName]}>{vendorName}</Text>
          </TouchableOpacity>
        </Col>
        <Col style={styles.column}>
          <Text style={[styles.text, styles.apValue]}>{accounting.formatMoney(apValue, '$', 2)}</Text>
          {apStatusView}
        </Col>
        <Col style={styles.column}>
          <TouchableOpacity onPress={onPressPayButton} disabled={!billPayable}>
            <View style={billPayable ? styles.payButton : [styles.payButton, styles.payButtonDisabled]}>
              <Text style={styles.payButtonText}>Pay</Text>
            </View>
          </TouchableOpacity>
        </Col>
      </Grid>
      <Image source={require('../../assets/images/arrow-right.png')} style={styles.moreIndicator} />
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
  vendorName: {
    fontWeight: 'bold'
  },
  apValue: {
    fontSize: 12
  },
  payButton: {
    alignItems: 'center',
    backgroundColor: '#b8e986',
    height: 27,
    justifyContent: 'center',
    width: 49,
  },
  payButtonDisabled: { opacity: 0.3 },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  apStatus: {
    backgroundColor: '#6EBA22',
    height: 4,
    marginTop: 3,
    width: 40,
  },
  apStatusNeardue: { backgroundColor: '#FDE700' },
  apStatusOverdue: { backgroundColor: '#FC000D' },
});
