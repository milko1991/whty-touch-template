import axios from 'axios';

/* 实例化axios */
let AxiosInstance = axios.create({});

/* api接口地址 */
const DEV_BASEURL = `http://dev.com`;
const PRO_BASEURL = `http://pro.com`;
const IS_DEV = process.env.NODE_ENV !== 'production';

/* 实例对象默认配置 */
AxiosInstance.defaults.baseURL = IS_DEV ? DEV_BASEURL : PRO_BASEURL; // 基础路径
AxiosInstance.defaults.responseType = 'json'; // 返回数据类型json
AxiosInstance.defaults.timeout = 20000; // 超时时间

/**
 * 请求拦截器
 */
AxiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
AxiosInstance.interceptors.response.use(
  response => {
    // 自定义返回码 作不同处理
    return response;
  },
  err => {
    return Promise.reject(err);
  }
);

export default AxiosInstance;
