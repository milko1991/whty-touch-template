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
    console.log(err);
    return Promise.reject(err);
  }
);

/**
 *
 * @param {*Object} dataConfig
 * {
 *   url: String 请求路径
 *   method: String 请求类型
 *   payload: Object 请求参数
 * }
 * @return {*Promise} 返回Promise对象、可在then中处理结果，在catch中捕捉错误
 */
const apiRequestHandler = function(dataConfig) {
  return new Promise((resolve, reject) => {
    /**
     * 默认axios配置
     * 1.根路径
     * 2.超时时间
     * 3.请求路径（这里的url等于 根路径baseURL加上传入的路径）
     */
    let DEFAULT_AXIOS_CONFIG = {
      url: dataConfig.url,
      method: dataConfig.method,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    };
    /**
     *
     * 1.t 请求时间戳、防止浏览器缓存，保证获取到最新数据
     */
    let DEFAULT_PARAMS = {
      t: +new Date()
    };

    /**
     * 区别get和post请求 做不同配置
     * 1.get  携带参数写法为：params:{}
     * 2.post 携带参数写法为：data：{}
     */
    if (dataConfig.method.toLowerCase() === 'get' || dataConfig.method.toLowerCase() === 'delete') {
      let params = Object.assign({}, DEFAULT_PARAMS, dataConfig.payload);
      DEFAULT_AXIOS_CONFIG = Object.assign({}, DEFAULT_AXIOS_CONFIG, {
        params
      });
    } else {
      let data = Object.assign({}, DEFAULT_PARAMS, dataConfig.payload);
      DEFAULT_AXIOS_CONFIG = Object.assign({}, DEFAULT_AXIOS_CONFIG, {
        data
      });
    }

    AxiosInstance(DEFAULT_AXIOS_CONFIG)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default apiRequestHandler;
