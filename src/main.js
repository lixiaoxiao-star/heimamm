import Vue from 'vue'
import App from './App.vue'
// 1:导入element
import ElementUI from 'element-ui';
// 2:导入element样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

// 3:使用element
Vue.use(ElementUI);



new Vue({
  render: h => h(App),
  

}).$mount('#app')
