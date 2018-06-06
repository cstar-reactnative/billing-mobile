const HEADER_HEIGHT = 88;
const TABBAR_HEIGHT = 50;

const CUSTOMER_AR_STATUS = {
  OK: 1,
  OVERDUE: 2,
  NEAR_DUE: 3
};

const INVOICE_STATUS = {
  DRAFT: 1,
  SENT: 2,
  PAID: 3,
  OVERDUE: 4,
  CANCELED: 5,
  NEAR_DUE: 6,
  COPIED_FOR_RECURRING: 10
};

const INVOICE_STATUS_LABEL = {
  1: 'Draft',
  2: 'Sent',
  3: 'Paid',
  4: 'Overdue',
  5: 'Canceled',
  6: 'Near due',
  10: 'Copied for refurring'
};

const VENDOR_AP_STATUS = {
  OK: 1,
  OVERDUE: 2,
  NEAR_DUE: 3
};

const BILL_STATUS = {
  OVERDUE: 1,
  RECEIVED: 2,
  PAID: 3,
  NEAR_DUE: 4,
  CANCELED: 5
};

const BILL_STATUS_LABEL = {
  1: 'Overdue',
  2: 'Received',
  3: 'Paid',
  4: 'Near due',
  5: 'Canceled'
};

const CUSTOMER_NOTIFICATION = {
  EMAIL: 1,
  SMS: 2
};

const INVOICE_PAYMENT_MODAL_PICKER_OPTIONS = [
  { key: 0, label: 'All payment types' },
  { key: 1, label: 'Wire transfer only' },
  { key: 2, label: 'Credit card/ACH/Paypal' },
];

const VENDOR_NOTIFICATION = CUSTOMER_NOTIFICATION;

export {
  HEADER_HEIGHT,
  TABBAR_HEIGHT,
  CUSTOMER_AR_STATUS,
  INVOICE_STATUS,
  INVOICE_STATUS_LABEL,
  VENDOR_AP_STATUS,
  BILL_STATUS,
  BILL_STATUS_LABEL,
  CUSTOMER_NOTIFICATION,
  INVOICE_PAYMENT_MODAL_PICKER_OPTIONS,
  VENDOR_NOTIFICATION,
};
