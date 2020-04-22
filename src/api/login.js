import instance from '../utils/request.js';

function tologin(data) {
  return instance({
    url: '/login',
    method: 'post',
    data
  });
}

export { tologin };
