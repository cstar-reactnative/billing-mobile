import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import CustomTabbar from './CustomTabbar';
import CustomersScreen from './Customers/CustomersScreen';
import VendorsScreen from './Vendors/VendorsScreen';
import TransactionsScreen from './Transactions/TransactionsScreen';
import CreateInvoiceModal from './Customers/CreateInvoiceModal';

import { getCustomers, getVendors, getLogs } from '../api';

const apiFuncs = {
  Customers: getCustomers,
  Vendors: getVendors,
  Transactions: getLogs
};
const tabScreens = {
  Customers: <CustomersScreen />,
  Vendors: <VendorsScreen />,
  Transactions: <TransactionsScreen />
};

class SecuredScreen extends React.Component {
  constructor() {
    super();
    this.initialDataLoaded = {
      Customers: false,
      Vendors: false,
      Transactions: false
    };
  }

  async componentDidMount() {
    const { dispatch, authToken, currentTab } = this.props;
    await apiFuncs[currentTab](dispatch, authToken);
    this.initialDataLoaded[currentTab] = true;
  }

  componentWillReceiveProps(nextProps) {
    const { currentTab, dispatch, authToken } = nextProps;
    if (this.props.currentTab !== currentTab && this.initialDataLoaded[currentTab] === false) {
      apiFuncs[currentTab](dispatch, authToken);
      this.initialDataLoaded[currentTab] = true;
    }
  }

  render() {
    const { onLogoutPress, currentTab, spinnerVisible } = this.props;

    return (
      <View>
        <CustomTabbar />
        {tabScreens[currentTab]}
        <CreateInvoiceModal />
        <Spinner visible={spinnerVisible} />
      </View>
    );
  }
}

SecuredScreen.propTypes = {
  currentTab: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  currentTab: state.tabbar.page,
  spinnerVisible: state.workInProgress,
  authToken: state.auth.token
});

export default connect(mapStateToProps)(SecuredScreen);
