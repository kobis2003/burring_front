import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:9660",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
