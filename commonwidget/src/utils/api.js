import axios from "axios";
import FormData from "form-data";

export function postFormData(url, params, headers) {
  var formData = new FormData();
  for (let key in params) {
    formData.append(key, params[key]);
  }
  var config = {
    method: "post",
    url: url,
    headers: headers,
    data: formData,
  };
  return axios(config);
}

export function postJsonData(url, params, headers) {
  var config = {
    method: "post",
    url: url,
    headers: { ...headers, "Content-Type": "application/json" },
    data: JSON.stringify(params),
  };
  return axios(config)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((error) => {
      console.error("POST API ERR: ", error);
      return {
        error: true,
        errMsg: error.toString(),
        errorResp: error.response.data,
      };
    });
}
