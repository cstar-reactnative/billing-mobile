import { API_BASE_URL } from 'react-native-dotenv';
import { CUSTOMER_NOTIFICATION, VENDOR_NOTIFICATION } from './constants';
import { alert } from './utils';

async function runApiCall(func) {
  try {
    await func();
  } catch (err) {
    console.log(err);
    alert('Error', 'An error occured while processing your request!');
  }
}

const authHeader = (authToken, isGet = true) => (Object.assign({}, {
  'Accept': 'application/json',
  'Authorization': `Bearer ${authToken}`
}, isGet ? {} : {
  'Content-Type': 'application/json'
}));

/*
GET
BASE_URL/customers
*/
const getCustomers = async (dispatch, authToken) => {
  dispatch({ type: 'SET_WIP_INDICATOR' });
  await runApiCall(async () => {
    const res = await fetch(`${API_BASE_URL}/customers`, {
      method: 'GET',
      headers: authHeader(authToken)
    });
    if (res.status === 200) {
      const body = await res.json();
      dispatch({ type: 'SET_CUSTOMERS', customers: body.customers });
      dispatch({ type: 'SORT_CUSTOMERS', column: null, direction: null });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  });
  dispatch({ type: 'CLEAR_WIP_INDICATOR' });
};

/*
POST
BASE_URL/customers/:customer_id/notification
*/
const sendMessageToCustomer = async (dispatch, authToken, customer, params) => {
  dispatch({ type: 'SET_WIP_INDICATOR' });
  await runApiCall(async () => {
    const res = await fetch(`${API_BASE_URL}/customers/${customer.id}/notification`, {
      method: 'POST',
      headers: authHeader(authToken, false),
      body: JSON.stringify(params)
    });
    if (res.status === 200) {
      const body = await res.json();
      const typeStrings = {
        [CUSTOMER_NOTIFICATION.EMAIL]: 'Email',
        [CUSTOMER_NOTIFICATION.SMS]: 'SMS'
      };
      if (body.success) {
        dispatch({ type: 'CLOSE_CUSTOMER_SEND_MESSAGE_MODAL' });
        alert('Success', `${typeStrings[params.type]} sent to customer ${customer.business_name}.`);
      } else {
        alert('Oops!', `We are sorry! We failed to deliver your message to customer ${customer.business_name}. Please try again later.`);
      }
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  });
  dispatch({ type: 'CLEAR_WIP_INDICATOR' });
};

/*
POST
BASE_URL/invoices/:invoice_id/remind
*/
const sendReminderMessageToCustomer = async (dispatch, authToken, customer, params) => {
  dispatch({ type: 'SET_WIP_INDICATOR' });
  await runApiCall(async () => {
    const res = await fetch(`${API_BASE_URL}/invoices/${customer.oldest_unpaid_invoice.id}/remind`, {
      method: 'POST',
      headers: authHeader(authToken, false),
      body: JSON.stringify(params)
    });
    if (res.status === 200) {
      const body = await res.json();
      if (body.is_sent) {
        dispatch({ type: 'CLOSE_INVOICE_REMINDER_FINAL_MODAL' });
        alert('Success', `Reminder email sent to customer ${customer.business_name}.`);
      } else {
        alert('Oops!', `We are sorry! We failed to deliver reminder email to customer ${customer.business_name}. Please try again later.`);
      }
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  });
  dispatch({ type: 'CLEAR_WIP_INDICATOR' });
};

/*
GET
BASE_URL/invoices/create
*/
const getNextInvoiceNumber = async (dispatch, authToken) => {
  dispatch({ type: 'SET_WIP_INDICATOR' });
  await runApiCall(async () => {
    const res = await fetch(`${API_BASE_URL}/invoices/create`, {
      method: 'GET',
      headers: authHeader(authToken)
    });
    if (res.status === 200) {
      const body = await res.json();
      dispatch({ type: 'SET_CREATE_INVOICE_MODAL_INVOICE_NUMBER', invoiceNumber: body.next_invoice_number });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  });
  dispatch({ type: 'CLEAR_WIP_INDICATOR' });
};

/*
GET
BASE_URL/products
*/
const getProducts = async (dispatch, authToken) => {
  dispatch({ type: 'SET_WIP_INDICATOR' });
  await runApiCall(async () => {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: authHeader(authToken)
    });
    if (res.status === 200) {
      const body = await res.json();
      dispatch({ type: 'SET_PRODUCTS', products: body.products });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  });
  dispatch({ type: 'CLEAR_WIP_INDICATOR' });
};

/*
POST
BASE_URL/invoices
*/
const createInvoice = async (dispatch, authToken, params) => {
  dispatch({ type: 'SET_WIP_INDICATOR' });
  await runApiCall(async () => {
    const res = await fetch(`${API_BASE_URL}/invoices`, {
      method: 'POST',
      headers: authHeader(authToken, false),
      body: JSON.stringify(params)
    });
    if (res.status === 200) {
      const body = await res.json();
      dispatch({ type: 'CLOSE_CREATE_INVOICE_MODAL' });
      dispatch({ type: 'OPEN_INVOICE_PREVIEW_MODAL', invoiceData: body });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  });
  dispatch({ type: 'CLEAR_WIP_INDICATOR' });
};

/*
POST
BASE_URL/invoices/:id/send
*/
const sendInvoiceViaEmail = async (dispatch, authToken, invoiceId, customerName) => {
  dispatch({ type: 'SET_WIP_INDICATOR' });
  await runApiCall(async () => {
    const res = await fetch(`${API_BASE_URL}/invoices/${invoiceId}/send`, {
      method: 'POST',
      headers: authHeader(authToken, false)
    });
    if (res.status === 200) {
      const body = await res.json();
      if (body.success) {
        dispatch({ type: 'CLOSE_INVOICE_PREVIEW_MODAL' });
        alert('Success', `Invoice sent by email to customer ${customerName}.`);
      } else {
        alert('Oops!', `We are sorry! We failed to deliver invoice by email to customer ${customerName}. Please try again later.`);
      }
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  });
  dispatch({ type: 'CLEAR_WIP_INDICATOR' });
};

/*
POST
BASE_URL/invoices/:id/text
*/
const sendInvoiceViaText = async (dispatch, authToken, invoiceId, customerName) => {
  dispatch({ type: 'SET_WIP_INDICATOR' });
  await runApiCall(async () => {
    const res = await fetch(`${API_BASE_URL}/invoices/${invoiceId}/text`, {
      method: 'POST',
      headers: authHeader(authToken, false)
    });
    if (res.status === 200) {
      const body = await res.json();
      if (body.success) {
        dispatch({ type: 'CLOSE_INVOICE_PREVIEW_MODAL' });
        alert('Success', `Invoice sent by text to customer ${customerName}.`);
      } else {
        alert('Oops!', `We are sorry! We failed to deliver invoice by text to customer ${customerName}. Please try again later.`);
      }
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  });
  dispatch({ type: 'CLEAR_WIP_INDICATOR' });
};

/*
GET
BASE_URL/vendors
*/
const getVendors = async (dispatch, authToken) => {
  dispatch({ type: 'SET_WIP_INDICATOR' });
  await runApiCall(async () => {
    const res = await fetch(`${API_BASE_URL}/vendors`, {
      method: 'GET',
      headers: authHeader(authToken)
    });
    if (res.status === 200) {
      const body = await res.json();
      dispatch({ type: 'SET_VENDORS', vendors: body.vendors });
      dispatch({ type: 'SORT_VENDORS', column: null, direction: null });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  });
  dispatch({ type: 'CLEAR_WIP_INDICATOR' });
};

/*
POST
BASE_URL/vendors/:vendor_id/notification
*/
const sendMessageToVendor = async (dispatch, authToken, vendor, params) => {
  dispatch({ type: 'SET_WIP_INDICATOR' });
  await runApiCall(async () => {
    const res = await fetch(`${API_BASE_URL}/vendors/${vendor.id}/notification`, {
      method: 'POST',
      headers: authHeader(authToken, false),
      body: JSON.stringify(params)
    });
    if (res.status === 200) {
      const body = await res.json();
      const typeStrings = {
        [VENDOR_NOTIFICATION.EMAIL]: 'Email',
        [VENDOR_NOTIFICATION.SMS]: 'SMS'
      };
      if (body.success) {
        dispatch({ type: 'CLOSE_VENDOR_SEND_MESSAGE_MODAL' });
        alert('Success', `${typeStrings[params.type]} sent to vendor ${vendor.business_name}.`);
      } else {
        alert('Oops!', `We are sorry! We failed to deliver your message to vendor ${vendor.business_name}. Please try again later.`);
      }
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  });
  dispatch({ type: 'CLEAR_WIP_INDICATOR' });
};

/*
GET
BASE_URL/logs
*/
const getLogs = async (dispatch, authToken) => {
  dispatch({ type: 'SET_WIP_INDICATOR' });
  await runApiCall(async () => {
    const res = await fetch(`${API_BASE_URL}/logs`, {
      method: 'GET',
      headers: authHeader(authToken)
    });
    if (res.status === 200) {
      const body = await res.json();
      dispatch({ type: 'SET_LOGS', logs: body.logs });
      dispatch({ type: 'SORT_LOGS', column: null, direction: null });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  });
  dispatch({ type: 'CLEAR_WIP_INDICATOR' });
};

export {
  getCustomers,
  sendMessageToCustomer,
  sendReminderMessageToCustomer,
  getNextInvoiceNumber,
  getProducts,
  createInvoice,
  sendInvoiceViaEmail,
  sendInvoiceViaText,
  getVendors,
  sendMessageToVendor,
  getLogs,
};
