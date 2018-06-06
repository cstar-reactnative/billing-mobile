import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import Modal from 'react-native-modalbox';
import accounting from 'accounting';
import moment from 'moment';
import CustomButton from '../CustomButton';

const InvoiceReminderModal = ({ isOpen, customerData, onClosed, onPressSendReminder }) => {
  const invoice = customerData.oldest_unpaid_invoice || {};

  return (
    <Modal position="center" isOpen={isOpen} swipeToClose={false} style={styles.modal} onClosed={onClosed}>
      <ScrollView style={styles.modalView}>
        <Text style={[styles.text, styles.textBold, styles.customerName]}>{customerData.business_name}</Text>
        <View style={styles.hr} />
        <View style={[styles.flexRow, styles.regularSection, { paddingTop: 10 }]}>
          <Text style={[styles.text, styles.textBold]}>INVOICE #{invoice.invoice_no}</Text>
        </View>
        <View style={[styles.flexRow, styles.regularSection, { paddingTop: 7 }]}>
          <Text style={[styles.text, styles.textBold]}>Amount: </Text>
          <Text style={[styles.text]}>{accounting.formatMoney(invoice.amount, '$', 2)}</Text>
        </View>
        <View style={[styles.flexRow, styles.regularSection, { paddingTop: 7 }]}>
          <Text style={[styles.text, styles.textBold]}>Due Date: </Text>
          <Text style={[styles.text]}>{moment(invoice.due_date).format('M/D/YY')}</Text>
        </View>
        <View style={[styles.flexRow, styles.regularSection, { paddingTop: 7 }]}>
          <Text style={[styles.text, styles.textBold]}>Description: </Text>
          <ScrollView style={{ height: 65 }}>
            <Text style={[styles.text, { flex: 1 }]}>
              {invoice.lines && invoice.lines.map(line => line.description).join(' ')}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Send Reminder"
            iconSrc={require('../../assets/images/clock.png')}
            style={styles.button}
            onPress={() => onPressSendReminder(invoice)}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

const mapStateToProps = state => state.invoiceReminderModal;

const mapDispatchToProps = dispatch => ({
  onClosed: () => dispatch({ type: 'CLOSE_INVOICE_REMINDER_MODAL' }),
  onPressSendReminder: invoiceData => {
    dispatch({ type: 'CLOSE_INVOICE_REMINDER_MODAL' });
    dispatch({ type: 'OPEN_INVOICE_REMINDER_FINAL_MODAL', invoiceData });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceReminderModal);

const styles = StyleSheet.create({
  modal: {
    borderRadius: 8,
    height: 284,
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
    justifyContent: 'center',
    marginTop: 17.37,
  },
  button: {
    height: 43.63,
    paddingLeft: 19.75,
    paddingRight: 19.75
  },
  flexRow: { flexDirection: 'row' },
  regularSection: { paddingLeft: 10 }
});
