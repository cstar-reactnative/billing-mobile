import { Alert } from 'react-native';

const alert = (...args) => {
  setTimeout(() => {
    Alert.alert(...args);
  }, 100);
};

export {
  alert,
};
