import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modalbox';
import accounting from 'accounting';
import moment from 'moment';
import CustomButton from '../CustomButton';
import CustomTextInput from '../CustomTextInput';
import { sendReminderMessageToCustomer } from '../../api';

class InvoiceReminderFinalModal extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.invoiceData !== nextProps.invoiceData) {
      this.setState({
        message: `Hi! Just a friendly reminder that we have not received payment for your invoice in the amount of ${accounting.formatMoney(nextProps.invoiceData.amount, '$', 2)} that was due on ${moment(nextProps.invoiceData.due_date).format('M/D/YY')}.\n\nCloudMobileBilling`
      });
    }
  }

  render() {
    const { isOpen, onClosed, authToken, customerData, onPressSend } = this.props;

    return (
      <Modal position="center" isOpen={isOpen} swipeToClose={false} style={styles.modal} onClosed={onClosed}>
        <KeyboardAwareScrollView style={styles.modalView} automaticallyAdjustContentInsets={false}>
          <CustomTextInput
            multiline inputStyle={[styles.text, styles.message]} value={this.state.message}
            onChangeText={message => this.setState({ message })}
          />
          <CustomButton
            title="Send Message" style={styles.button}
            onPress={() => onPressSend(authToken, customerData, this.state.message)}
          />
          {/*<Text style={[styles.text, { fontSize: 13, marginTop: 19 }]}>
            Click here to customize this message
          </Text>*/}
          <TouchableOpacity onPress={onClosed}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }
};

const mapStateToProps = state => ({
  ...state.invoiceReminderFinalModal,
  authToken: state.auth.token,
  customerData: state.invoiceReminderModal.customerData
});

const mapDispatchToProps = dispatch => ({
  onClosed: () => dispatch({ type: 'CLOSE_INVOICE_REMINDER_FINAL_MODAL' }),
  onPressSend: (authToken, customerData, message) => {
    sendReminderMessageToCustomer(dispatch, authToken, customerData, { confirmationText: message });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceReminderFinalModal);

const styles = StyleSheet.create({
  modal: {
    borderRadius: 8,
    height: 333,
    width: '82.5%',
  },
  modalView: {
    paddingBottom: 19,
    paddingLeft: 19,
    paddingRight: 19,
    paddingTop: 25,
  },
  text: {
    color: '#4A4A4A',
    fontSize: 14,
    textAlign: 'center'
  },
  message: {
    lineHeight: 20,
    height: 160
  },
  button: {
    alignSelf: 'center',
    height: 36,
    marginTop: 14.5,
    width: '68.05%'
  },
  cancelButton: {
    alignSelf: 'center',
    color: '#9B9B9B',
    fontSize: 13,
    marginTop: 25
  }
});
