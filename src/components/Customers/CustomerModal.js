import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import Modal from 'react-native-modalbox';
import { Grid, Col } from 'react-native-easy-grid';
import accounting from 'accounting';
import moment from 'moment';
import CustomButton from '../CustomButton';
import { INVOICE_STATUS, INVOICE_STATUS_LABEL, CUSTOMER_NOTIFICATION } from '../../constants';

const InvoiceRow = ({ invoice }) => {
  const textStyle = invoice.status === INVOICE_STATUS.OVERDUE ? [styles.text, { color: '#D0011B' }] : styles.text;
  return (
    <Grid style={{ marginTop: 7 }}>
      <Col size={30}><Text style={textStyle}>{accounting.formatMoney(invoice.amount, '$', 2)}</Text></Col>
      <Col size={25}><Text style={textStyle}>{INVOICE_STATUS_LABEL[invoice.status]}</Text></Col>
      <Col size={35}><Text style={textStyle}>{moment(invoice.due_date).format('M/D/YY')}</Text></Col>
    </Grid>
  );
};

const CustomerModal = ({ isOpen, customerData, onClosed, onPressSendByText, onPressSendByEmail }) => (
  <Modal position="center" isOpen={isOpen} swipeToClose={false} style={styles.modal} onClosed={onClosed}>
    <ScrollView style={styles.modalView}>
      <Text style={[styles.text, styles.textBold, styles.customerName]}>{customerData.business_name}</Text>
      <View style={styles.hr} />
      <View style={[styles.flexRow, styles.regularSection, { paddingTop: 10 }]}>
        <Text style={[styles.text, styles.textBold]}>Sales YTD: </Text>
        <Text style={[styles.text]}>{accounting.formatMoney(customerData.ytd, '$', 2)}</Text>
      </View>
      <View style={[styles.flexRow, styles.regularSection, { paddingTop: 7 }]}>
        <Text style={[styles.text, styles.textBold]}>A/R Balance: </Text>
        <Text style={[styles.text]}>{accounting.formatMoney(customerData.sum_unpaid_invoices, '$', 2)}</Text>
      </View>
      <View style={styles.hr} />
      <View style={[styles.flexRow, styles.regularSection, { paddingTop: 10 }]}>
        <Text style={[styles.text, styles.textBold]}>Last 5 Invoices: </Text>
      </View>
      <View style={styles.regularSection}>
        {customerData.invoices && customerData.invoices
          .filter(invoice => invoice.status !== INVOICE_STATUS.CANCELED)
          .slice(0, 5)
          .map((invoice, i) => (
            <InvoiceRow key={i} invoice={invoice} />
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton
          title="Text Customer" iconTextAlign="vertical"
          iconSrc={require('../../assets/images/message.png')} style={styles.button}
          onPress={onPressSendByText}
        />
        <CustomButton
          title="Email Customer" iconTextAlign="vertical"
          iconSrc={require('../../assets/images/email.png')} style={styles.button}
          onPress={onPressSendByEmail}
        />
      </View>
    </ScrollView>
  </Modal>
);

const mapStateToProps = state => state.customerModal;

const mapDispatchToProps = dispatch => ({
  onClosed: () => dispatch({ type: 'CLOSE_CUSTOMER_MODAL' }),
  onPressSendByText: () => {
    dispatch({ type: 'CLOSE_CUSTOMER_MODAL' });
    dispatch({ type: 'OPEN_CUSTOMER_SEND_MESSAGE_MODAL', deliveryMethod: CUSTOMER_NOTIFICATION.SMS });
  },
  onPressSendByEmail: () => {
    dispatch({ type: 'CLOSE_CUSTOMER_MODAL' });
    dispatch({ type: 'OPEN_CUSTOMER_SEND_MESSAGE_MODAL', deliveryMethod: CUSTOMER_NOTIFICATION.EMAIL });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerModal);

const styles = StyleSheet.create({
  modal: {
    borderRadius: 8,
    height: 360,
    width: '82.5%',
  },
  modalView: {
    paddingBottom: 20,
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 25,
  },
  text: {
    color: '#4A4A4A',
    fontSize: 12,
  },
  textBold: { fontWeight: 'bold'},
  customerName: {
    fontSize: 19,
    marginLeft: 14,
  },
  hr: {
    backgroundColor: '#D5D5D5',
    height: 1,
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32.37,
  },
  button: { height: 48.63 },
  flexRow: { flexDirection: 'row' },
  regularSection: { paddingLeft: 10 }
});
