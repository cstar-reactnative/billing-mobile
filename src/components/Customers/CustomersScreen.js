import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, StyleSheet, Dimensions, RefreshControl } from 'react-native';

import { HEADER_HEIGHT, TABBAR_HEIGHT } from '../../constants';
import SalesChart from './SalesChart';
import CustomersTable from './CustomersTable';
import CustomerModal from './CustomerModal';
import CustomerSendMessageModal from './CustomerSendMessageModal';
import InvoiceReminderModal from './InvoiceReminderModal';
import InvoiceReminderFinalModal from './InvoiceReminderFinalModal';
import InvoicePreviewModal from './InvoicePreviewModal';
import { getCustomers } from '../../api';

const { height: windowHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    height: windowHeight - HEADER_HEIGHT - TABBAR_HEIGHT
  },
  chartContainer: {
    backgroundColor: '#37a2e9',
    padding: 10
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});

class CustomersScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      refreshing: false
    };
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await getCustomers(this.props.dispatch, this.props.authToken);
    this.setState({ refreshing: false });
  }

  render() {
    const { refreshing } = this.state;

    return (
      <View>
        <ScrollView
          style={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />}
        >
          <View style={styles.chartContainer}>
            <Text style={styles.title}>Sales</Text>
            <SalesChart />
          </View>
          <CustomersTable />
        </ScrollView>
        <CustomerModal />
        <CustomerSendMessageModal />
        <InvoiceReminderModal />
        <InvoiceReminderFinalModal />
        <InvoicePreviewModal />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.token
});

export default connect(mapStateToProps)(CustomersScreen);
