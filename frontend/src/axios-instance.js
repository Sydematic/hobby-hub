// src/axios-instance.js
// axios-instance.js
import axios from "axios";

export default function getAxiosClient() {
  return axios.create({
    baseURL: "http://localhost:5000", // your backend URL
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}



