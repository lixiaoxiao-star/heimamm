import Vue from 'vue';
import App from './App.vue';
import router from "./router/router.js"

// 1:导入element
import ElementUI from 'element-ui';
// import VueRouter from 'vue-router';
// 2:导入element样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;

// 3:注册element
Vue.use(ElementUI);
// 注册路由
// Vue.use(VueRouter);

// const router = new VueRouter({
//   routes: [
//     {
//       path: '/',
//       component: HelloWorld
//     }
//   ]
// });

new Vue({
  router,
  render: (h) => h(App)  //把App这个组件渲染到页面上作为根组件

}).$mount('#app');
