import axios from "axios";

/**
 * Axios HTTP client with default configuration
 */
const httpClient = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
