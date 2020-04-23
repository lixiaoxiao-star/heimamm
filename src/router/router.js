import VueRouter from 'vue-router';
import Vue from 'vue';
// import App from '../App.vue';
import login from '../views/login/login.vue';
import layout from '../views/home/layout.vue';
import chart from '@/views/home/chart/chart.vue';
import question from '@/views/home/question/question.vue';
import userList from '@/views/home/userList/userList.vue';
import business from '@/views/home/business/business.vue';
import subject from '@/views/home/subject/subject.vue';

// 进度条
import NProgress from 'nprogress';
// 进度条样式
import 'nprogress/nprogress.css';
// 注册路由
Vue.use(VueRouter);
// 实例化
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: login,
       meta: { title: '首页' }

    },
    {
      path: '/home',
      // redirect: '/home/subject', //设置路由重定向默认跳转到某个页面,就是进入home的时候默认选中第几个
       meta: { title: '登录页' },
      component: layout, //进入到layout的子组件内,一定会显示layout主组件,因为子组件是依赖主组件存在的

      children: [
        { path: 'chart', component: chart, meta: { title: '数据概览' } },
        { path: 'userList', component: userList, meta: { title: '用户列表' } },
        { path: 'question', component: question, meta: { title: '题库列表' } },
        { path: 'business', component: business, meta: { title: '企业列表' } },
        { path: 'subject', component: subject, meta: { title: '学科列表' } }
      ]
    }
  ]
});

// 路由拦截器
// 进入前拦截
router.beforeEach((to, from, next) => {
  NProgress.start(); //进入下一个路由前开始进度条
  next();
});

// 进入后拦截
router.afterEach((to) => {
  NProgress.done(); //进入路由后结束进度条
  document.title = to.meta.title; //to相当于$route信息
});
export default router;
