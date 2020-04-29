import instance from '@/utils/request.js';
// 打开页面显示企业列表
function getBusinessData(params) {
  return instance({
    url: 'enterprise/list',
    method: 'get',
    params
  });
}

// 新增功能请求数据
function addBusinessData(data) {
  return instance({
    url: 'enterprise/add',
    method: 'post',
    data
  });
}

// 删除功能请求数据
function delBusinessData(data) {
  return instance({
    url: 'enterprise/remove',
    method: 'post',
    data
  });
}

// 更改状态setstatus
function setBusinesststus(data) {
  return instance({
    url: 'enterprise/status',
    method: 'post',
    data
  });
}

// 编辑数据修改
function editBusinesData(data) {
  return instance({
    url: 'enterprise/edit',
    method: 'post',
    data
  });
}
export { getBusinessData ,addBusinessData,delBusinessData,setBusinesststus,editBusinesData};
