import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modalbox';
import accounting from 'accounting';
import CustomButton from '../CustomButton';

const PaymentFinalModal = ({ isOpen, vendorData, billData, paymentMethod, onClosed }) => {
  return (
    <Modal position="center" isOpen={isOpen} swipeToClose={false} style={styles.modal} onClosed={onClosed}>
      <View style={styles.modalView}>
        <Text style={[styles.text, styles.vendorName, styles.boldText]}>{vendorData.business_name}</Text>
        <ScrollView style={{ height: 68, marginTop: 3 }}>
          <Text style={[styles.text, styles.message]}></Text>
        </ScrollView>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={[styles.text, { fontSize: 16 }]}>Amount Due: </Text>
          <Text style={[styles.invoiceAmount, styles.boldText]}>{accounting.formatMoney(billData.invoice_amount, '$', 2)}</Text>
        </View>
        <CustomButton title="Make Payment" style={styles.buttonPayment} />
        <CustomButton title="Don't Make Payment" style={[styles.buttonPayment, styles.buttonNoPayment]} />
        <TouchableOpacity onPress={onClosed}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const mapStateToProps = state => state.vendorPaymentFinalModal;

const mapDispatchToProps = dispatch => ({
  onClosed: () => dispatch({ type: 'CLOSE_VENDOR_PAYMENT_FINAL_MODAL' })
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentFinalModal);

const styles = StyleSheet.create({
  modal: {
    borderRadius: 8,
    height: 396,
    width: '82.5%',
  },
  modalView: {
    paddingBottom: 19,
    paddingLeft: 19,
    paddingRight: 19,
    paddingTop: 35,
  },
  text: {
    color: '#4A4A4A',
    fontSize: 15
  },
  vendorName: {
    fontSize: 19
  },
  message: {
    lineHeight: 20
  },
  invoiceAmount: {
    color: '#F6A623',
    fontSize: 16
  },
  buttonPayment: {
    alignSelf: 'center',
    height: 46,
    marginTop: 45,
    width: '79.43%'
  },
  buttonNoPayment: {
    marginTop: 8
  },
  cancelButton: {
    alignSelf: 'center',
    color: '#9B9B9B',
    fontSize: 13,
    marginTop: 51
  },
  boldText: { fontWeight: 'bold' }
});

