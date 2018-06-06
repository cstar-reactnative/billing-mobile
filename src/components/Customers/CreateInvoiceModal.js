import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modalbox';
import accounting from 'accounting';
import moment from 'moment';
import CustomButton from '../CustomButton';
import CustomPickerField from '../CustomPickerField';
import CustomDatePickerField from '../CustomDatePickerField';
import CustomTextInput from '../CustomTextInput';
import { getProducts, createInvoice } from '../../api';
import { INVOICE_PAYMENT_MODAL_PICKER_OPTIONS } from '../../constants';

const recurringOptions = [{ key: 1, label: 'Yes' }, { key: 0, label: 'No' }];

class CreateInvoiceModal extends React.Component {
  componentDidMount() {
    const { dispatch, authToken } = this.props;
    getProducts(dispatch, authToken);
  }

  render() {
    const {
      isOpen, customer, invoiceDate, dueDate, invoiceNo, wireOnly, quantity, product, description,
      price, customers, products, onClosed, onChangeCustomer, onChangeInvoiceDate, onChangeDueDate,
      onChangeInvoiceNo, onChangeWireOnly, onChangeQuantity, onChangeProduct, onChangeDescription,
      onChangePrice, onPressCreate, authToken
    } = this.props;
    const totalPrice = parseInt(quantity, 10) * parseFloat(price);

    return (
      <Modal position="center" isOpen={isOpen} swipeToClose={false} style={styles.modal} onClosed={onClosed}>
        <KeyboardAwareScrollView style={styles.modalView} automaticallyAdjustContentInsets={false}>
          <Text style={[styles.text, styles.textBold, { fontSize: 19, marginLeft: 4 }]}>
            Create an Invoice
          </Text>

          <CustomPickerField
            style={{ marginTop: 7 }}
            value={customer}
            data={customers
              .map(customer => ({ key: customer.id, label: customer.business_name }))
              .sort((a, b) => a.label.localeCompare(b.label))}
            onChange={item => onChangeCustomer(item)}
          />

          <View style={styles.twoColWrapper}>
            <View style={{ width: '49%' }}>
              <CustomDatePickerField
                label="Invoice Date" style={{ marginTop: 10 }} date={invoiceDate}
                onChange={date => onChangeInvoiceDate(date)}
              />
            </View>
            <View style={{ width: '49%' }}>
              <CustomDatePickerField
                label="Due Date" style={{ marginTop: 10 }} date={dueDate}
                onChange={date => onChangeDueDate(date)}
              />
            </View>
          </View>

          <View style={styles.twoColWrapper}>
            <View style={{ width: '49%' }}>
              <CustomTextInput
                label="Invoice #" value={invoiceNo} style={{ marginTop: -2 }} keyboardType="numbers-and-punctuation"
                onChangeText={text => onChangeInvoiceNo(text)}
              />
            </View>
            <View style={{ width: '49%' }}>
              <CustomPickerField
                value={recurringOptions[0]}
                data={recurringOptions}
                label="Recurring?"
                style={{ marginTop: -2 }}
              />
            </View>
          </View>

          <View style={styles.twoColWrapper}>
            <View style={{ width: '49%' }}>
              <CustomPickerField
                data={INVOICE_PAYMENT_MODAL_PICKER_OPTIONS}
                value={wireOnly}
                label="Payments Accepted"
                style={{ marginTop: 10 }}
                onChange={item => onChangeWireOnly(item)}
              />
            </View>
          </View>

          <View style={styles.hr} />

          <View style={styles.twoColWrapper}>
            <View style={{ width: '24%' }}>
              <CustomTextInput
                label="Quantity" style={{ marginTop: 7 }} keyboardType="numeric" value={quantity}
                onChangeText={text => onChangeQuantity(text)}
              />
            </View>
            <View style={{ width: '74%' }}>
              <CustomPickerField
                label="Product"
                style={{ marginTop: 7 }}
                value={product}
                data={products
                  .map(product => ({ key: product.id, label: product.name }))
                  .sort((a, b) => a.label.localeCompare(b.label))}
                onChange={item => onChangeProduct(item)}
              />
            </View>
          </View>

          <CustomTextInput
            label="Description"
            style={{ marginTop: 7 }}
            multiline
            inputStyle={{ height: 50 }}
            value={description}
            onChangeText={text => onChangeDescription(text)}
          />

          <View style={styles.twoColWrapper}>
            <View style={{ width: '49%' }}>
              <CustomTextInput
                label="Price"
                style={{ marginTop: 7 }}
                keyboardType="numeric"
                value={price}
                onChangeText={text => onChangePrice(text)}
              />
            </View>
            <View style={{ width: '49%', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
              <Text style={{ fontSize: 10 }}>Total for Invoice</Text>
              <Text style={{ fontSize: 17 }}>{accounting.formatMoney(totalPrice, '$', 2)}</Text>
            </View>
          </View>

          <View style={[styles.twoColWrapper, { marginTop: 7 }]}>
            <View style={{ width: '49%' }}>
              
            </View>
            <View style={{ width: '49%', alignItems: 'center', justifyContent: 'center' }}>
              <CustomButton
                title="Create Invoice" iconTextAlign="vertical" style={styles.button}
                onPress={() => {
                  onPressCreate(authToken, {
                    customer, invoiceNo, invoiceDate, dueDate, wireOnly,
                    quantity, product, description, price
                  })
                }}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  ...state.createInvoiceModal,
  authToken: state.auth.token,
  customers: state.customers,
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  onClosed: () => dispatch({ type: 'CLOSE_CREATE_INVOICE_MODAL' }),
  onChangeCustomer: customer => dispatch({ type: 'SET_CREATE_INVOICE_MODAL_CUSTOMER', customer }),
  onChangeInvoiceDate: invoiceDate => dispatch({ type: 'SET_CREATE_INVOICE_MODAL_INVOICE_DATE', invoiceDate }),
  onChangeDueDate: dueDate => dispatch({ type: 'SET_CREATE_INVOICE_MODAL_DUE_DATE', dueDate }),
  onChangeInvoiceNo: invoiceNumber => dispatch({ type: 'SET_CREATE_INVOICE_MODAL_INVOICE_NUMBER', invoiceNumber }),
  onChangeWireOnly: wireOnly => dispatch({ type: 'SET_CREATE_INVOICE_MODAL_WIREONLY', wireOnly }),
  onChangeQuantity: quantity => dispatch({ type: 'SET_CREATE_INVOICE_MODAL_QUANTITY', quantity }),
  onChangeProduct: product => dispatch({ type: 'SET_CREATE_INVOICE_MODAL_PRODUCT', product }),
  onChangeDescription: description => dispatch({ type: 'SET_CREATE_INVOICE_MODAL_DESCRIPTION', description }),
  onChangePrice: price => dispatch({ type: 'SET_CREATE_INVOICE_MODAL_PRICE', price }),
  onPressCreate: (authToken, { customer, invoiceNo, invoiceDate, dueDate, wireOnly, quantity, product, description, price }) => {
    createInvoice(dispatch, authToken, {
      customer_id: customer.key,
      invoice_no: invoiceNo,
      invoice_date: moment(invoiceDate).format('YYYY-MM-DD'),
      due_date: moment(dueDate).format('YYYY-MM-DD'),
      wire_only: wireOnly.key,
      lines: [{
        quantity,
        description,
        price,
        product_id: product.key
      }]
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateInvoiceModal);

const styles = StyleSheet.create({
  modal: {
    borderRadius: 8,
    height: 468,
    width: '82.5%',
  },
  modalView: {
    padding: 13,
    paddingTop: 10,
  },
  twoColWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hr: {
    backgroundColor: '#D8D8D8',
    height: 4,
    marginTop: 8,
  },
  text: { color: '#4A4A4A' },
  textBold: { fontWeight: 'bold'},
  button: { height: 27 },
});
