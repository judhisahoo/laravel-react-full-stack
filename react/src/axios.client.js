import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((AxiosRequestConfig) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    AxiosRequestConfig.headers.Authorization = `Bearer ${token}`;
    /*if (
        AxiosRequestConfig.method == "post" ||
        AxiosRequestConfig.method == "put"
    ) {
        AxiosRequestConfig.headers["Content-Type"] = "multipart/form-data";
    }*/
    return AxiosRequestConfig;
});

axiosClient.interceptors.response.use((response) => {
    return response
  }, (error) => {
    const {response} = error;
    if (response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN')
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }
  
    throw error;
  })

export default axiosClient;
