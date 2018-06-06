import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import CustomersTableHeader from './CustomersTableHeader';
import CustomersTableRow from './CustomersTableRow';
import { getNextInvoiceNumber } from '../../api';

const styles = StyleSheet.create({
  table: {
    backgroundColor: 'white',
  }
});

const CustomersTable = ({ customers, authToken, onPressCustomerName, onPressSendReminder, onPressInvoice }) => (
  <View style={styles.table}>
    <CustomersTableHeader />
    {customers.map(customer => (
      <CustomersTableRow
        key={customer.id}
        customerName={customer.business_name}
        arValue={customer.sum_unpaid_invoices}
        arStatus={customer.invoice_status}
        onPressCustomerName={() => onPressCustomerName(customer)}
        onPressSendReminder={() => onPressSendReminder(customer)}
        onPressInvoice={() => onPressInvoice(customer, authToken)}
      />
    ))}
  </View>
);

const mapStateToProps = state => ({
  customers: state.customers,
  authToken: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onPressCustomerName: customerData => dispatch({ type: 'OPEN_CUSTOMER_MODAL', customerData }),
  onPressSendReminder: customerData => dispatch({ type: 'OPEN_INVOICE_REMINDER_MODAL', customerData }),
  onPressInvoice: (customerData, authToken) => {
    getNextInvoiceNumber(dispatch, authToken);
    dispatch({ type: 'OPEN_CREATE_INVOICE_MODAL', customerData });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomersTable);
