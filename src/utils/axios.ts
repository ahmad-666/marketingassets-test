import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    //axios automatically throw error for any 4XX,5XX status code so we only need to wrap axios around try/catch
    return Promise.reject(error);
  }
);

export default axiosInstance;
