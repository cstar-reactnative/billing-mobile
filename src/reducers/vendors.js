import { VENDOR_NOTIFICATION } from '../constants';

// Vendors data
const vendors = (state = [], action) => {
  switch (action.type) {
    case 'SET_VENDORS':
      return action.vendors;
    case 'SORT_VENDORS':
      const dir = action.direction === 'asc' ? 1 : -1;
      if (action.column === 'business_name') {
        return state.concat().sort(
          (a, b) => dir * (a.business_name.localeCompare(b.business_name))
        );
      } else if (action.column === 'apValue') {
        return state.concat().sort(
          (a, b) => {
            let result = 0;
            if (a.ap < b.ap) {
              result = -1;
            } else if (a.ap > b.ap) {
              result = 1;
            } else {
              if (a.bill_status < b.bill_status) {
                result = -1;
              } else if (a.bill_status > b.bill_status) {
                result = 1;
              }
            }
            return dir * result;
          }
        );
      } else {
        return state;
      }
    default:
      return state;
  }
};

// Vendors table sort status
const initialVendorsTableSortState = {
  column: null,
  direction: null
};
const vendorsTableSort = (state = initialVendorsTableSortState, action) => {
  switch (action.type) {
    case 'SORT_VENDORS':
      return { ...state, column: action.column, direction: action.direction };
    default:
      return state;
  }
};

// Vendor modal state
const initialVendorModalState = {
  isOpen: false,
  vendorData: {}
};
const vendorModal = (state = initialVendorModalState, action) => {
  switch (action.type) {
    case 'OPEN_VENDOR_MODAL':
      return { ...state, isOpen: true, vendorData: action.vendorData };
    case 'CLOSE_VENDOR_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

// Vendor send message modal state
const initialVendorSendMessageModalState = {
  isOpen: false,
  deliveryMethod: VENDOR_NOTIFICATION.EMAIL
};
const vendorSendMessageModal = (state = initialVendorSendMessageModalState, action) => {
  switch (action.type) {
    case 'OPEN_VENDOR_SEND_MESSAGE_MODAL':
      return { ...state, isOpen: true, deliveryMethod: action.deliveryMethod };
    case 'CLOSE_VENDOR_SEND_MESSAGE_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

// Vendor payment modal state
const initialVendorPaymentModalState = {
  isOpen: false,
  vendorData: {},
  billData: {}
};
const vendorPaymentModal = (state = initialVendorPaymentModalState, action) => {
  switch (action.type) {
    case 'OPEN_VENDOR_PAYMENT_MODAL':
      return { ...state, isOpen: true, vendorData: action.vendorData, billData: action.billData };
    case 'CLOSE_VENDOR_PAYMENT_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

// Vendor payment final modal state
const initialVendorPaymentFinalModalState = {
  isOpen: false,
  vendorData: {},
  billData: {},
  paymentMethod: 'paypal'
};
const vendorPaymentFinalModal = (state = initialVendorPaymentFinalModalState, action) => {
  switch (action.type) {
    case 'OPEN_VENDOR_PAYMENT_FINAL_MODAL':
      return {
        ...state,
        isOpen: true,
        vendorData: action.vendorData,
        billData: action.billData,
        paymentMethod: action.paymentMethod
      };
    case 'CLOSE_VENDOR_PAYMENT_FINAL_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export {
  vendors,
  vendorsTableSort,
  vendorModal,
  vendorSendMessageModal,
  vendorPaymentModal,
  vendorPaymentFinalModal,
};
