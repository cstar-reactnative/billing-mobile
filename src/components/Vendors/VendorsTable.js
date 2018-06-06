import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';

import VendorsTableHeader from './VendorsTableHeader';
import VendorsTableRow from './VendorsTableRow';

const styles = StyleSheet.create({
  table: {
    backgroundColor: 'white',
  }
});

const VendorsTable = ({ vendors, onPressVendorName, onPressPayButton }) => (
  <View style={styles.table}>
    <VendorsTableHeader />
    {vendors.map(vendor => (
      <VendorsTableRow
        key={vendor.id}
        vendorName={vendor.business_name}
        apValue={vendor.ap}
        apStatus={vendor.bill_status}
        billPayable={!!vendor.last_bill}
        onPressVendorName={() => onPressVendorName(vendor)}
        onPressPayButton={() => onPressPayButton(vendor, vendor.last_bill || {})}
      />
    ))}
  </View>
);

const mapStateToProps = state => ({
  vendors: state.vendors
});

const mapDispatchToProps = dispatch => ({
  onPressVendorName: vendorData => dispatch({ type: 'OPEN_VENDOR_MODAL', vendorData }),
  onPressPayButton: (vendorData, billData) => dispatch({ type: 'OPEN_VENDOR_PAYMENT_MODAL', vendorData, billData })
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorsTable);
