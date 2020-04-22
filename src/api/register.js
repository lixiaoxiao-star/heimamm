// import instance from "@/utils/request.js"
 import instance from "../utils/request.js"
// 确定注册按钮发送请求
function register(data) {
  return instance({
    url: '/register',
    method: 'post',
    data
  });
}

function getPhoneCode(data) {
  return instance({
    url: '/sendsms',
    method: 'post',
    data
  });
}

// export default getPhoneCode;  //一个js只能输出一个,并且看不出来用了那个接口

export { getPhoneCode, register };
