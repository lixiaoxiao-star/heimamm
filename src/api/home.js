// 登录后的账号信息
import instance from '../utils/request.js';

// 获取用户信息
function getUserInfo(params) {
  console.log('getuserinfo');
  return instance({
    url: '/info',
    method: 'get',
    params
  });
}

// 退出登录请求
function exitLogin(params) {
  console.log('getuserinfo');
  return instance({
    url: '/logout',
    method: 'get',
    params
  });
}

export { getUserInfo,exitLogin };

// 不加大括号的导出
// export let getUserInfo = function(params) {
//   return instance({
//     url: '/info',
//     method: 'get',
//     params
//   });
// };
