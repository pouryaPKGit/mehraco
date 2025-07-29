import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 400) {
      toast.error("درخواست نامعتبر است.");
    } else if (status === 404) {
      toast.error("موردنظر یافت نشد.");
    } else if (status >= 500) {
      toast.error("خطای سرور رخ داده است.");
    } else {
      if (error.code === "ECONNABORTED") {
        toast.error("درخواست بیش از حد طول کشید.");
      } else if (!error.response) {
        toast.error("خطا در ارتباط با سرور. لطفا اتصال اینترنت را چک کنید.");
      } else {
        toast.error("خطایی غیرمنتظره رخ داد.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


