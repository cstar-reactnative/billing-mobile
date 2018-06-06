// Log data (a.k.a transactions)
const logs = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOGS':
      return action.logs;
    case 'SORT_LOGS':
      const dir = action.direction === 'asc' ? 1 : -1;
      const business_name = data => (
        data.customer_id
        ? data.customer && data.customer.business_name || ''
        : data.vendor && data.vendor.business_name || ''
      );
      if (action.column === 'business_name') {
        return state.concat().sort(
          (a, b) => dir * (business_name(a).localeCompare(business_name(b)))
        );
      } else if (action.column === 'action') {
        return state.concat().sort(
          (a, b) => dir * (a.action.localeCompare(b.action))
        );
      } else if (action.column === 'created_at') {
        return state.concat().sort(
          (a, b) => dir * (a.created_at.localeCompare(b.created_at))
        );
      } else {
        return state;
      }
    default:
      return state;
  }
};

// Logs table sort status
const initialLogsTableSortState = {
  column: null,
  direction: null
};
const logsTableSort = (state = initialLogsTableSortState, action) => {
  switch (action.type) {
    case 'SORT_LOGS':
      return { ...state, column: action.column, direction: action.direction };
    default:
      return state;
  }
};

export {
  logs,
  logsTableSort,
};