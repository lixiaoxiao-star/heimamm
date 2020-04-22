import axios from 'axios';
import router from '@/router/router.js';
import { Message } from 'element-ui';
import { getToken, removeToken } from '@/utils/token.js';

// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true //跨域照样携带cookie
});

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // 发送请求头,判断getToken是否存在,存在就把获取的值发送给请求头
    if (getToken()) {
      config.headers.token = getToken(); //当前发送请求的请求头加上一条token
    }
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
    } else if (response.data.code == 206) {
      // 提示错误信息
      Message.error('登录信息已过期,请重新登录');
      // 跳转到登录页面
      router.push('/');
      // 删除本地保存的token
      removeToken();
      // 返回错误信息
      return Promise.reject('error');
    } else {
      // 对响应错误做点什么
      Message.error(response.data.message);
      return Promise.reject('error'); //返回错误一定要是promise.reject里面,axios封装好的定义
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
