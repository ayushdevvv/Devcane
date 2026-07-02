import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://api.brevo.com/v3",
  headers: {
    "api-key": process.env.BREVO_API_KEY,
    "content-type": "application/json",
  },
});

export default apiInstance;