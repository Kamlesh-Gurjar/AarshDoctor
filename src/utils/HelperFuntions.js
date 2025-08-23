import Toast from 'react-native-toast-message';

export const showToast = (type, text1, text2 = '') => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    visibilityTime: 3000,
    autoHide: true,
  });
};

const defaultOptions = {
  visibilityTime: 3000,
  autoHide: true,
};

export const showSuccessToast = (text1, text2 = '') => {
  Toast.show({
    type: 'success',
    text1,
    text2,
    ...defaultOptions,
  });
};

export const showErrorToast = (text1, text2 = '') => {
  Toast.show({
    type: 'error',
    text1,
    text2,
    ...defaultOptions,
  });
};

 
export const showInfoToast = (text1, text2 = '') => {
  Toast.show({
    type: 'info',
    text1,
    text2,
    ...defaultOptions,
  });
};
