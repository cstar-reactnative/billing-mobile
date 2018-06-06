import { StackNavigator } from 'react-navigation';

import Header from '../components/Header';
import SecuredScreen from '../components/SecuredScreen';
import SettingsScreen from '../components/SettingsScreen';

export default StackNavigator({
  Secured: { screen: SecuredScreen },
  Settings: { screen: SettingsScreen }
}, {
  navigationOptions: { header: Header }
});
