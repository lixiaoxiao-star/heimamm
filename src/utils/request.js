import axios from 'axios';

import { Message } from 'element-ui';

// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true //跨域照样携带cookie
});

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.data.code == 200) {
      return response.data;
    } else {
      // 对响应错误做点什么
      Message.error(response.data.message);
      return Promise.reject('error');  //返回错误一定要是promise.reject里面,axios封装好的定义

    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;