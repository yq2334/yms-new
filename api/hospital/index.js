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

export function getAllHospital() {
  return request({
    'url': '/CmHospital/GetAllHospital',
    'method': 'get'
	
  })
}



export function getDepartment() {
  return request({
    'url': '/CmHospital/GetDepartment',
    'method': 'get'
	
  })
}

export function getDoctor(params) {
  return request({
    'url': '/CmHospital/GetDoctor',
    'method': 'get',
	 data: params,
  })
}



export function getDoctorScheduleTime(params) {
  return request({
    'url': '/CmHospital/GetDoctorScheduleTime',
    'method': 'get',
	 data: params,
  })
}


export function postAppointmentOrder(data) {
  return request({
    'url': '/CmHospital/AppointmentOrder',
    'method': 'post',
	 timeout: 20000,
	 data: data,
  })
}

export function getAppointmentRecordDetail(params) {
  return request({
    'url': '/CmHospital/GetAppointmentRecordDetail',
    'method': 'get',
	 data: params,
  })
}



export function postAppointmentPay(data) {
  return request({
    'url': '/CmHospital/AppointmentPay',
    'method': 'post',
	 timeout: 20000,
	 data: data,
  })
}


// /Cm/CmHospital/GetAppointmentRecordList
export function getAppointmentRecordList(params) {
  return request({
    'url': '/CmHospital/GetAppointmentRecordList',
    'method': 'get',
	 data: params,
  })
}


///Cm/CmHospital/GetBillRecordList

export function getBillRecordList(data) {
  return request({
    'url': '/CmHospital/GetBillRecordList',
   'method': 'post',
    timeout: 20000,
    params: data,
  })
}

///Cm/CmHospital/GetBillRecordDetail
export function getBillRecordDetail(params) {
  return request({
    'url': '/CmHospital/GetBillRecordDetail',
    'method': 'get',
	 data: params,
  })
}

//CmHospital/GetAllDoctor
export function getAllDoctor() {
  return request({
    'url': '/CmHospital/GetAllDoctor',
    'method': 'get',
	
  })
}

export function getInpCostDailyFacilityList(params) {
  return request({
    'url': '/CmHospitalInp/GetInpCostDailyFacilityList',
    'method': 'get',
	 data: params,
  })
}



export function getInpCostDailyItemTotal(params) {
  return request({
    'url': '/CmHospitalInp/GetInpCostDailyItemTotal',
    'method': 'get',
	 data: params,
  })
}



export function getInpCostDailyItemList(params) {
  return request({
    'url': '/CmHospitalInp/GetInpCostDailyItemList',
    'method': 'get',
	 data: params,
  })
}

export function getInpCostDailyItemDetail(params) {
  return request({
    'url': '/CmHospitalInp/GetInpCostDailyItemDetail',
    'method': 'get',
	 data: params,
  })
}

export function getInpAdmisList(params) {
  return request({
    'url': '/CmHospitalInp/GetInpAdmisList',
    'method': 'get',
	 data: params,
  })
}



export function getInpAdmisListDetail(params) {
  return request({
    'url': '/CmHospitalInp/GetInpAdmisListDetail',
    'method': 'get',
	 data: params,
  })
}



export function getInpAdmisListDetailMore(params) {
  return request({
    'url': '/CmHospitalInp/GetInpAdmisListDetailMore',
    'method': 'get',
	 data: params,
  })
}