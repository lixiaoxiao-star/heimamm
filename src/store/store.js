/* 
1:下载
2:导入
3:注册
4:实例化
5:注入到new vue实例
6:使用
*/
// 2:导入
import Vue from 'vue';
import Vuex from 'vuex';

// 注册
Vue.use(Vuex);

// 实例化
const store = new Vuex.Store({
  // 共享数据
  state: {
    userInfo: ''
  }
});

export default store;
