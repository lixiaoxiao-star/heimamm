// 保存token
function setToken(val, name = 'token') {
  window.localStorage.setItem(name, val);
}

// 获取token
function getToken(name = 'token') {
  return window.localStorage.getItem(name);
}

// 删除Token
function removeToken(name = 'token') {
  window.localStorage.removeItem(name);
}

export { setToken, getToken, removeToken };
