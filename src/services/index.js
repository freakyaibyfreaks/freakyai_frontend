import axios from 'axios';
import { API_BASE } from '../config/config';

// import { userPool } from './auth/index'

const base = API_BASE;// || 'https://api.swifterhq.com'; // Fail-safe fallback to prod URL

// Request interceptor 
// axios.interceptors.request.use(async (config) => { 

//     return new Promise((resolve, reject) => {

//       const userObject = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : {}

//       // access token of the user
//       let currentAccessToken = userObject.accessToken

//       // accessing the accessToken if it's present there
//       if (userObject) {

//         // getting current time
//         // 60 is for making current time forward by 60 secs
//         const current_time = Date.now() / 1000 + 60;

//         // decoding the token
//         const decoded = jwt_decode(userObject.accessToken);
        
//         // if token has expired
//         if (current_time > decoded.exp) {

//           // for refreshing the token the used userPool
//           const cognitoUser = userPool.getCurrentUser()
          
//           // gettting the new access token 
//           return cognitoUser.getSession((err, data) => {
//             if (err) {
//               reject(err)
//             } else {
              
//               const cognitoUserSession = data;
//               const yourIdToken = cognitoUserSession.getIdToken().jwtToken;
//               const yourAccessToken = cognitoUserSession.getAccessToken().jwtToken;
              
//               // creating user object
//               const user = {
//                 token: yourIdToken,
//                 details: data.idToken.payload,
//                 accessToken: yourAccessToken
//               }
              
//               // setting the current token
//               currentAccessToken = user.accessToken;
              
//               // setting new user details in the localstorage for future references
//               localStorage.setItem('user', JSON.stringify(user))
//             }
//             // Assigning the token in the Authorization key
//             config.headers['Authorization'] = 'Bearer ' + currentAccessToken;
//             return resolve(config);
//           });
//         } else {

//           // Assigning the token in the Authorization key
//           config.headers['Authorization'] = 'Bearer ' + currentAccessToken;

//           return resolve(config)
//         }
//       }}
//   )
// },
// error => {
//     Promise.reject(error)
// }); 

// get request wrapper
const get = async (url, data) => {
  const options = { withCredentials: true };
  return axios
    .get(`${base}${url}`, { params: data, ...options })
    .then((res) => res.data)
    .catch((err) => err.response);
};

// post request wrapper
const post = async (url, data) => {
  const options = { "headers": {
    "content-type": "application/json",
  }};
  return axios.post(`${base}${url}`, data, options);
};

// put request wrapper
const put = async (url, data) => {
  const options = { withCredentials: true };
  return axios
    .put(`${base}${url}`, data, options)
    .then((res) => res.data)
    .catch((err) => err.response);
};

// remove request wrapper
const remove = async (url, data) => {
  const options = { withCredentials: true };
  return axios.delete(`${base}${url}`, data, options);
};

const api = {
  base,
  post,
  get,
  put,
  remove,
};

export default api;
