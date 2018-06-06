import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import Modal from 'react-native-modalbox';
import { Grid, Col } from 'react-native-easy-grid';
import accounting from 'accounting';
import moment from 'moment';
import CustomButton from '../CustomButton';
import { BILL_STATUS, BILL_STATUS_LABEL, VENDOR_NOTIFICATION } from '../../constants';

const BillRow = ({ bill }) => {
  const textStyle = bill.status === BILL_STATUS.OVERDUE ? [styles.text, { color: '#D0011B' }] : styles.text;
  return (
    <Grid style={{ marginTop: 7 }}>
      <Col size={30}><Text style={textStyle}>{accounting.formatMoney(bill.invoice_amount, '$', 2)}</Text></Col>
      <Col size={25}><Text style={textStyle}>{BILL_STATUS_LABEL[bill.status]}</Text></Col>
      <Col size={35}><Text style={textStyle}>{moment(bill.due_date).format('M/D/YY')}</Text></Col>
    </Grid>
  );
};

const VendorModal = ({ isOpen, vendorData, onClosed, onPressSendByText, onPressSendByEmail }) => (
  <Modal position="center" isOpen={isOpen} swipeToClose={false} style={styles.modal} onClosed={onClosed}>
    <ScrollView style={styles.modalView}>
      <Text style={[styles.text, styles.textBold, styles.vendorName]}>{vendorData.business_name}</Text>
      <View style={styles.hr} />
      <View style={[styles.flexRow, styles.regularSection, { paddingTop: 10 }]}>
        <Text style={[styles.text, styles.textBold]}>Expenses YTD: </Text>
        <Text style={[styles.text]}>{accounting.formatMoney(vendorData.ytd, '$', 2)}</Text>
      </View>
      <View style={[styles.flexRow, styles.regularSection, { paddingTop: 7 }]}>
        <Text style={[styles.text, styles.textBold]}>A/P Balance: </Text>
        <Text style={[styles.text]}>{accounting.formatMoney(vendorData.ap, '$', 2)}</Text>
      </View>
      <View style={styles.hr} />
      <View style={[styles.flexRow, styles.regularSection, { paddingTop: 10 }]}>
        <Text style={[styles.text, styles.textBold]}>Last 5 Bills: </Text>
      </View>
      <View style={styles.regularSection}>
        {vendorData.bills && vendorData.bills
          .filter(bill => bill.status !== BILL_STATUS.CANCELED)
          .slice(0, 5)
          .map((bill, i) => (
            <BillRow key={i} bill={bill} />
        ))}
      </View>
      <Grid style={styles.buttonsContainer}>
        <Col size={48}>
          <CustomButton
            title="Text Vendor" iconTextAlign="vertical"
            iconSrc={require('../../assets/images/message.png')} style={styles.button}
            onPress={onPressSendByText}
          />
        </Col>
        <Col size={4} />
        <Col size={48}>
          <CustomButton
            title="Email Vendor" iconTextAlign="vertical"
            iconSrc={require('../../assets/images/email.png')} style={styles.button}
            onPress={onPressSendByEmail}
          />
        </Col>
      </Grid>
    </ScrollView>
  </Modal>
);

const mapStateToProps = state => state.vendorModal;

const mapDispatchToProps = dispatch => ({
  onClosed: () => dispatch({ type: 'CLOSE_VENDOR_MODAL' }),
  onPressSendByText: () => {
    dispatch({ type: 'CLOSE_VENDOR_MODAL' });
    dispatch({ type: 'OPEN_VENDOR_SEND_MESSAGE_MODAL', deliveryMethod: VENDOR_NOTIFICATION.SMS });
  },
  onPressSendByEmail: () => {
    dispatch({ type: 'CLOSE_VENDOR_MODAL' });
    dispatch({ type: 'OPEN_VENDOR_SEND_MESSAGE_MODAL', deliveryMethod: VENDOR_NOTIFICATION.EMAIL });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorModal);

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
  vendorName: {
    fontSize: 19,
    marginLeft: 14,
  },
  hr: {
    backgroundColor: '#D5D5D5',
    height: 1,
    marginTop: 10,
  },
  buttonsContainer: { marginTop: 32.37 },
  button: { height: 48.63 },
  flexRow: { flexDirection: 'row' },
  regularSection: { paddingLeft: 10 }
});
