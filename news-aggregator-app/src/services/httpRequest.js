import axios from "axios";
import cogoToast from "cogo-toast";
const apiUrl = process.env.REACT_APP_API_URL_SOURCE_ONE;

/* Setting default request headers*/
axios.defaults.baseURL = apiUrl;

axios.interceptors.request.use(
  // Do something before request is sent
  (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    const apiError = (error.response.code = "apiKeyInvalid");
    if (apiError) {
      cogoToast.error(
        error.message,
        { position: "top-right" },
        { hideAfter: 10 }
      );
    } else if (
      error?.response?.status === 404 ||
      error?.response?.status === "error"
    ) {
      console.log("Unexpected error occured: ", error);
      cogoToast.error(
        error.message,
        { position: "top-right" },
        { hideAfter: 10 }
      );
    }
    return Promise.reject(error);
  }
);

const requestObj = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default requestObj;
