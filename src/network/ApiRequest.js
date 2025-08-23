// import axios from 'axios';
// import {encryptData} from '../utils/encryptionUtils';

// const ApiRequest = async ({BASEURL, method = 'POST', req}) => {
//   console.log('----------', BASEURL, method, req);
//   try {
//     const response = await axios({
//       url: BASEURL,
//       method: method,
//       headers: {
//         'Content-Type': 'text/plain',
//       },

//       data: {
//         data: encryptData(req),
//       },

//       authKey:
//         'U2FsdGVkX1+s7iaDHGXrA60BI1SaFnHfZI3Y6z89TSLi0wrWZ79rNOrHYJP89gns',
//     });

//     return {
//       status: response.status,
//       data: response.data,
//     };
//   } catch (error) {
//     console.error('API Error:', error?.response?.data || error.message);

//     return {
//       status: error?.response?.status || 500,
//       data: error?.response?.data || {message: error.message},
//     };
//   }
// };

// export default ApiRequest;

// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { encryptData } from '../utils/encryptionUtils';
 
// const ApiRequest = async ({BASEURL, method = 'POST', req}) => {
//   console.log('----------', BASEURL, method, req);
//   // const token = useSelector((state) => state?.UserData?.token); // Correct reducer key

//   try {
//     const encryptedBody = encryptData(req); // should return encrypted string

//     const response = await axios({
//       url: BASEURL,
//       method: method,
//       headers: {
//         'Content-Type': 'text/plain',
//         authKey:
//           'U2FsdGVkX1+s7iaDHGXrA60BI1SaFnHfZI3Y6z89TSLi0wrWZ79rNOrHYJP89gns',
//         Authorization: `Bearer ${token}`,
//       },
//       data: encryptedBody, // pass encrypted string directly
//     });

//     return {
//       status: response?.status,
//       data: response?.data,
//     };
//   } catch (error) {
//     console.error('API Error:', error?.response?.data || error.message);

//     return {
//       status: error?.response?.status || 500,
//       data: error?.response?.data || {message: error.message},
//     };
//   }
// };

// export default ApiRequest;



// ApiRequest.js
import axios from 'axios';
import { encryptData } from '../utils/encryptionUtils';

const ApiRequest = async ({ BASEURL, method = 'POST', req, token }) => {
  try {
    const encryptedBody = encryptData(req);

    const response = await axios({
      url: BASEURL,
      method,
      headers: {
        'Content-Type': 'text/plain',
        authKey:
          'U2FsdGVkX1+s7iaDHGXrA60BI1SaFnHfZI3Y6z89TSLi0wrWZ79rNOrHYJP89gns',
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      data: encryptedBody,
    });

    return {
      status: response?.status,
      data: response?.data,
    };
  } catch (error) {
    console.error('API Error:', error?.response?.data || error.message);
    return {
      status: error?.response?.status || 500,
      data: error?.response?.data || { message: error.message },
    };
  }
};

export default ApiRequest;
