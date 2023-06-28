import request from '@/utils/request'
// 获取版本更新
export function getVersionUpdates() {
  return request({
    'url': '/CmSettings/GetVersionUpdates',
    'method': 'get'
  })
}

// 发送新手机号验证码
export function sendNewCode(data) {
  return request({
    'url': '/CmSettings/SendNewCode',
    // header: {
    // 	"Content-Type": "application/x-www-form-urlencoded"
    // },
    method: 'post',
    timeout: 20000,
    data: data,
  })
}

// 验证新手机号验证码
export function verifyNewPhone(data) {
  return request({
    'url': '/CmSettings/VerifyNewPhone',
    method: 'post',
    timeout: 20000,
    data: data,
  })
}

// 获取个人编辑资料
export function getPersonalInfo() {
  return request({
    'url': '/CmSettings/GetPersonalInfo',
    'method': 'get'
  })
}

// 个人资料编辑
export function updatePersonalInfo(data) {
  return request({
    'url': '/CmSettings/UpdatePersonalInfo',
    method: 'post',
    timeout: 20000,
    data: data,
  })
}

// 获取家庭共享列表
export function getFamilyShareList() {
  return request({
    'url': '/CmSettings/GetFamilyShareList',
    'method': 'get'
  })
}

// 添加家庭共享列表
export function addFamilyMember(data) {
  return request({
    'url': '/CmSettings/AddFamilyMember',
    method: 'post',
    timeout: 20000,
    data: data,
  })
}

export function deleteFamilyMember(id) {
  return request({
    'url': '/CmSettings/DeleteFamilyMember?id='+id,
    method: 'post',
    timeout: 20000,
  })
}

// 获取信用服务状态
export function getCmStatus() {
  return request({
    'url': '/CmSettings/GetCmStatus',
    'method': 'get'
  })
}
// 开启信用服务
export function openCm() {
  return request({
    'url': '/CmSettings/OpenCm',
    method: 'post',
    timeout: 20000,

  })
}

// 关闭信用服务
export function closeCm() {
  return request({
    'url': '/CmSettings/CloseCm',
    method: 'post',
    timeout: 20000,
  })
}