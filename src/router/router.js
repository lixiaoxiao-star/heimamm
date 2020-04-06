import VueRouter from 'vue-router';
import Vue from 'vue';
// import App from '../App.vue';
import login from '../views/login/login.vue';
// 注册路由
Vue.use(VueRouter);
// 实例化
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: login
    }
  ]
});

export default router;
