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
import { getUserInfo } from '@/api/home.js';
// 注册
Vue.use(Vuex);

// 实例化
const store = new Vuex.Store({
  //  严格模式,如果开启,不能在mutations外修改state的值
  strict: true,
  // 共享数据
  state: {
    userInfo: ''
  },
  // 修改state的值
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data;
    }
  },
  // 获取某些属性
  getters: {
    vuexGetUserName(state) {
      return state.userInfo.avatar; //把avater返出去,调用这个方法可以直接获取到
      //可以做一些复杂业务计算,例如:判断头像是否存在,或者需要更改,地址前拼接之类的处理
    }
  },
  // 用于做异步操作,
  actions: {
    asyncGetData(context) {
      // context约等于$store
      getUserInfo().then((res) => {
        res.data.avatar = process.env.VUE_APP_URL + '/' + res.data.avatar;
        context.commit('setUserInfo', res.data);
      });
    }
  }
});

export default store;
