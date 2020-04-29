import instance from '@/utils/request.js';

// 打开页面获取数据列表
function getsubjectlist(params) {
  return instance({
    url: '/subject/list',
    method: 'get',
    params
  });
}

// 状态按钮
function setsubjectstatus(data) {
  return instance({
    url: '/subject/status',
    method: 'post',
    data
  });
}

// 删除
function delsubjectdata(data) {
  return instance({
    url: '/subject/remove',
    method: 'post',
    data
  });
}

// 新增
function addsubjectdata(data) {
  return instance({
    url: '/subject/add',
    method: 'post',
    data
  });
}

// 编辑
function editsubjectdata(data) {
  return instance({
    url: '/subject/edit',
    method: 'post',
    data
  });
}
export {
  getsubjectlist,
  setsubjectstatus,
  delsubjectdata,
  addsubjectdata,
  editsubjectdata
};
