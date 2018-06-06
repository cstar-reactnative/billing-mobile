import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import Modal from 'react-native-modalbox';
import accounting from 'accounting';
import moment from 'moment';
import CustomButton from '../CustomButton';
import { sendInvoiceViaEmail, sendInvoiceViaText } from '../../api';

const InvoicePreviewModal = ({ isOpen, invoiceData, customer, onClosed, authToken, onPressSendByText, onPressSendByEmail }) => (
  <Modal position="center" isOpen={isOpen} swipeToClose={false} style={styles.modal} onClosed={onClosed}>
    <ScrollView style={styles.modalView}>
      <Text style={[styles.text, styles.textBold, styles.customerName]}>{customer.label}</Text>
      <View style={styles.hr} />
      <View style={[styles.flexRow, styles.regularSection, { paddingTop: 10 }]}>
        <Text style={[styles.text, styles.textBold]}>INVOICE #{invoiceData.invoice_no}</Text>
      </View>
      <View style={[styles.flexRow, styles.regularSection, { paddingTop: 7 }]}>
        <Text style={[styles.text, styles.textBold]}>Amount: </Text>
        <Text style={[styles.text]}>{accounting.formatMoney(invoiceData.amount, '$', 2)}</Text>
      </View>
      <View style={[styles.flexRow, styles.regularSection, { paddingTop: 7 }]}>
        <Text style={[styles.text, styles.textBold]}>Due Date: </Text>
        <Text style={[styles.text]}>{moment(invoiceData.due_date).format('M/D/YY')}</Text>
      </View>
      <View style={[styles.flexRow, styles.regularSection, { paddingTop: 7 }]}>
        <Text style={[styles.text, styles.textBold]}>Description: </Text>
        <ScrollView style={{ height: 65 }}>
          <Text style={[styles.text, { flex: 1 }]}>
            {invoiceData.lines && invoiceData.lines.map(line => line.description).join(' ')}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton
          title="Send via Text" iconTextAlign="vertical"
          iconSrc={require('../../assets/images/message.png')} style={styles.button}
          onPress={() => onPressSendByText(authToken, invoiceData, customer)}
        />
        <CustomButton
          title="Send via Email" iconTextAlign="vertical"
          iconSrc={require('../../assets/images/email.png')} style={styles.button}
          onPress={() => onPressSendByEmail(authToken, invoiceData, customer)}
        />
      </View>
    </ScrollView>
  </Modal>
);

const mapStateToProps = state => ({
  ...state.invoicePreviewModal,
  customer: state.createInvoiceModal.customer,
  authToken: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onClosed: () => dispatch({ type: 'CLOSE_INVOICE_PREVIEW_MODAL' }),
  onPressSendByEmail: (authToken, invoiceData, customer) => {
    sendInvoiceViaEmail(dispatch, authToken, invoiceData.id, customer.label);
  },
  onPressSendByText: (authToken, invoiceData, customer) => {
    sendInvoiceViaText(dispatch, authToken, invoiceData.id, customer.label);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePreviewModal);

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
    justifyContent: 'space-around',
    marginTop: 17.37,
  },
  button: {
    height: 43.63,
    paddingLeft: 10.75,
    paddingRight: 10.75
  },
  flexRow: { flexDirection: 'row' },
  regularSection: { paddingLeft: 10 }
});
