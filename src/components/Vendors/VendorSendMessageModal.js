import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modalbox';
import CustomButton from '../CustomButton';
import CustomTextInput from '../CustomTextInput';
import { sendMessageToVendor } from '../../api';

class VendorSendMessageModal extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ''
    };
  }

  render() {
    const { isOpen, deliveryMethod, onClosed, authToken, vendorData, onPressSend } = this.props;

    return (
      <Modal position="center" isOpen={isOpen} swipeToClose={false} style={styles.modal} onClosed={onClosed}>
        <KeyboardAwareScrollView style={styles.modalView} automaticallyAdjustContentInsets={false}>
          <Text style={[styles.text, { fontSize: 19, fontWeight: 'bold', marginBottom: 10 }]}>
            Message to Vendor
          </Text>
          <CustomTextInput
            multiline inputStyle={[styles.text, styles.message]} value={this.state.message}
            onChangeText={message => this.setState({ message })}
          />
          <CustomButton
            title="Send" style={styles.button}
            onPress={() => onPressSend(deliveryMethod, authToken, vendorData, this.state.message)}
          />
          <TouchableOpacity onPress={onClosed}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }
};

const mapStateToProps = state => ({
  ...state.vendorSendMessageModal,
  authToken: state.auth.token,
  vendorData: state.vendorModal.vendorData
});

const mapDispatchToProps = dispatch => ({
  onClosed: () => dispatch({ type: 'CLOSE_VENDOR_SEND_MESSAGE_MODAL' }),
  onPressSend: (deliveryMethod, authToken, vendorData, message) => {
    sendMessageToVendor(dispatch, authToken, vendorData, {
      type: deliveryMethod,
      text: message
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorSendMessageModal);

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
