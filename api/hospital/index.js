import request from '@/utils/request'

// 获取医院列表
export function getRegionList() {
  return request({
    'url': '/CmHospital/GetRegionList',
    'method': 'get'
  })
}

export function getHospitalById(params) {
  return request({
    'url': '/CmHospital/GetHospitalById',
    'method': 'get',
	 data: params,
  })
}

export function selectHospital(params) {
  return request({
    'url': '/CmHospital/SelectHospital',
    'method': 'get',
	 data: params,
  })
}