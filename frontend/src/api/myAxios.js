import axios from 'axios'

const axiosInstance = (function () {
    let token = "";
    axios.defaults.baseURL = 'http://localhost:4000';

    const setBearerToken = (newToken) => {
        token = newToken;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;        
    };

    return {
        setBearerToken,
        axios
    };
})();

export default axiosInstance.axios

export const setBearerToken = axiosInstance.setBearerToken;