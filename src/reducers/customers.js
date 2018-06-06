import {
  CUSTOMER_NOTIFICATION,
  INVOICE_PAYMENT_MODAL_PICKER_OPTIONS
} from '../constants';

// Customer data
const customers = (state = [], action) => {
  switch (action.type) {
    case 'SET_CUSTOMERS':
      return action.customers;
    case 'SORT_CUSTOMERS':
      const dir = action.direction === 'asc' ? 1 : -1;
      if (action.column === 'business_name') {
        return state.concat().sort(
          (a, b) => dir * (a.business_name.localeCompare(b.business_name))
        );
      } else if (action.column === 'arValue') {
        return state.concat().sort(
          (a, b) => {
            let result = 0;
            if (a.sum_unpaid_invoices < b.sum_unpaid_invoices) {
              result = -1;
            } else if (a.sum_unpaid_invoices > b.sum_unpaid_invoices) {
              result = 1;
            } else {
              if (a.invoice_status < b.invoice_status) {
                result = -1;
              } else if (a.invoice_status > b.invoice_status) {
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

// Customers table sort status
const initialCustomersTableSortState = {
  column: null,
  direction: null
};
const customersTableSort = (state = initialCustomersTableSortState, action) => {
  switch (action.type) {
    case 'SORT_CUSTOMERS':
      return { ...state, column: action.column, direction: action.direction };
    default:
      return state;
  }
};

// Customer modal state
const initialCustomerModalState = {
  isOpen: false,
  customerData: {}
};
const customerModal = (state = initialCustomerModalState, action) => {
  switch (action.type) {
    case 'OPEN_CUSTOMER_MODAL':
      return { ...state, isOpen: true, customerData: action.customerData };
    case 'CLOSE_CUSTOMER_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

// Customer send message modal state
const initialCustomerSendMessageModalState = {
  isOpen: false,
  deliveryMethod: CUSTOMER_NOTIFICATION.EMAIL
};
const customerSendMessageModal = (state = initialCustomerSendMessageModalState, action) => {
  switch (action.type) {
    case 'OPEN_CUSTOMER_SEND_MESSAGE_MODAL':
      return { ...state, isOpen: true, deliveryMethod: action.deliveryMethod };
    case 'CLOSE_CUSTOMER_SEND_MESSAGE_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

// Invoice reminder modal state
const initialInvoiceReminderModalState = {
  isOpen: false,
  customerData: {}
};
const invoiceReminderModal = (state = initialInvoiceReminderModalState, action) => {
  switch (action.type) {
    case 'OPEN_INVOICE_REMINDER_MODAL':
      return { ...state, isOpen: true, customerData: action.customerData };
    case 'CLOSE_INVOICE_REMINDER_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

// Invoice reminder final modal state
const initialInvoiceReminderFinalModalState = {
  isOpen: false,
  invoiceData: {}
};
const invoiceReminderFinalModal = (state = initialInvoiceReminderFinalModalState, action) => {
  switch (action.type) {
    case 'OPEN_INVOICE_REMINDER_FINAL_MODAL':
      return { ...state, isOpen: true, invoiceData: action.invoiceData };
    case 'CLOSE_INVOICE_REMINDER_FINAL_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

// Create invoice modal state
const initialCreateInvoiceModalState = {
  isOpen: false,
  customer: {},
  invoiceDate: new Date(),
  dueDate: new Date(),
  invoiceNo: null,
  wireOnly: INVOICE_PAYMENT_MODAL_PICKER_OPTIONS[0],
  quantity: '1',
  product: {},
  description: '',
  price: '0',
};
const createInvoiceModal = (state = initialCreateInvoiceModalState, action) => {
  switch (action.type) {
    case 'OPEN_CREATE_INVOICE_MODAL':
      return {
        ...state,
        ...initialCreateInvoiceModalState,
        isOpen: true,
        customer: { key: action.customerData.id, label: action.customerData.business_name },
        invoiceDate: new Date(),
        dueDate: new Date()
      };
    case 'CLOSE_CREATE_INVOICE_MODAL':
      return { ...state, isOpen: false };
    case 'SET_CREATE_INVOICE_MODAL_INVOICE_NUMBER':
      return { ...state, invoiceNo: action.invoiceNumber };
    case 'SET_CREATE_INVOICE_MODAL_CUSTOMER':
      return { ...state, customer: action.customer };
    case 'SET_CREATE_INVOICE_MODAL_INVOICE_DATE':
      return { ...state, invoiceDate: action.invoiceDate };
    case 'SET_CREATE_INVOICE_MODAL_DUE_DATE':
      return { ...state, dueDate: action.dueDate };
    case 'SET_CREATE_INVOICE_MODAL_WIREONLY':
      return { ...state, wireOnly: action.wireOnly };
    case 'SET_CREATE_INVOICE_MODAL_QUANTITY':
      return { ...state, quantity: action.quantity };
    case 'SET_CREATE_INVOICE_MODAL_PRODUCT':
      return { ...state, product: action.product };
    case 'SET_CREATE_INVOICE_MODAL_DESCRIPTION':
      return { ...state, description: action.description };
    case 'SET_CREATE_INVOICE_MODAL_PRICE':
      return { ...state, price: action.price };
    default:
      return state;
  }
};

// Invoice preview modal state
const initialInvoicePreviewModalState = {
  isOpen: false,
  invoiceData: {}
};
const invoicePreviewModal = (state = initialInvoicePreviewModalState, action) => {
  switch (action.type) {
    case 'OPEN_INVOICE_PREVIEW_MODAL':
      return { ...state, isOpen: true, invoiceData: action.invoiceData };
    case 'CLOSE_INVOICE_PREVIEW_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export {
  customers,
  customersTableSort,
  customerModal,
  customerSendMessageModal,
  invoiceReminderModal,
  invoiceReminderFinalModal,
  createInvoiceModal,
  invoicePreviewModal,
};
