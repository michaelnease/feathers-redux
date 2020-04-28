import { isFunction } from "../value/value";
import axios from "axios";

/*
* The baseUrl for the api, and a token to pass in.
* Optionally a responseInterceptor can be used to change the
* response. Here is an example for a response interceptor:

* const rInterceptor = (response) => {
*   const data = response.data;
*   const d = {};
*   for (const [_, key] of Object.keys(data).entries()) {
*       d[key.toLowerCase()] = data[key];
*   }
*   return d;
* }

*/
const newClient = (baseUrl, token, responseInterceptor) => {
  const twoSeconds = 2e3;
  const config = {
    baseURL: baseUrl,
    timeout: twoSeconds,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const client = axios.create(config);

  if (isFunction(responseInterceptor)) {
    client.interceptors.response.use(responseInterceptor);
  }

  return client;
};

export { newClient };
