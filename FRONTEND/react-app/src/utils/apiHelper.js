import axios from "axios";

const getHeader = () => {
  const Token = localStorage.getItem("Token");
  console.log(Token);
  return {
    Authorization: Token ? `Bearer ${Token}` : "",
  };
};

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  // validateStatus: () => true
});


// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    const header = getHeader()
    config.headers = { ...header, ...config.headers}
    return config;
  },
  
  function (error) {
    return Promise.reject(error);
  }
);

export default instance