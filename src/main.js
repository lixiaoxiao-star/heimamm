import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from '@/store/store.js';

// 1:导入element
import ElementUI from 'element-ui';
// import VueRouter from 'vue-router';
// 2:导入element样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;

// 3:注册element
Vue.use(ElementUI);

// 注入到实例中
new Vue({
  router,
  store,
  render: (h) => h(App) //把App这个组件渲染到页面上作为根组件
}).$mount('#app');
