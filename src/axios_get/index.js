import React from "react";
import Axios from "axios";
const axios = url => {
  Axios.get(url)
    .then(res => {})
    .catch(error => {
      console.log(error.message);
    });
};
export default axios;
