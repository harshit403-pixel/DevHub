import axios from "axios";

const api = axios.create({
  baseURL:
  "https://devhub-4p4x.onrender.com/api",
});

export default api;