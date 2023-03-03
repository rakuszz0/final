import axios from "axios"

export const API = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
  });
  
  
  //create api config
  export const setAuthToken = (token) => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common["Authorization"];
    }
  };