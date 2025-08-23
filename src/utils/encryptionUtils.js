// encryptionUtils.js

import 'react-native-get-random-values';
import CryptoJS from 'crypto-js';

// const secretKey =
//   'fhadkhfdashlkdshaihadcnyrisdvnglfohdtuhmsrgdmlisthdviuamijraeniupwoivuewriou';

const secretKey =
  'fhadkhfdashlkdshaihadcnyrisdvnglfohdtuhmsrgdmlisthdviuamijraeniupwoivuewriou';

// 🔐 Encrypt data before sending to API
export const encryptData = data => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey,
  ).toString();
  console.log('Encrypted Data:', encrypted);
  return encrypted;
};

// 🧪 (Optional) Decrypt data for testing/debug
export const decryptData = encryptedData => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};
