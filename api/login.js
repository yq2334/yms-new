import request from '@/utils/request'

// 登录方法
export function login(phone, code) {
	const data = {
		phone,
		code,
	}
	return request({
		'url': '/CmLogin/login',
		headers: {
			isToken: false
		},
		'method': 'post',
		'data': data
	})
}
export function weiXinlogin(code, appid) {
	return request({
		'url': '/CmLogin/WeixinAuthCallBack?code=' + code + '&state=state&appid=' +appid, 
		// headers: {
		// 	isToken: false
		// },
		'method': 'post',

	})
}
// 获取appId
export function getWxAppId() {
	return request({
		'url': '/CmLogin/GetWxAppId',
		'method': 'get'
	})
}
// 获取用户详细信息
export function getInfo() {
	return request({
		'url': '/CmUser/GetUserInfo',
		'method': 'get'
	})
}

// 退出方法
export function logout() {
	return request({
		'url': '/logout',
		'method': 'post'
	})
}

// 发送验证码
export function sendCode(data) {
	return request({
		'url': '/CmLogin/SendCode',
		headers: {
			isToken: false,

		},
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		method: 'post',
		timeout: 20000,
		data: data,
	})
}

///Cm/CmLogin/BindIdCard 绑定身份证
export function bindIdCard(data) {
	return request({
		'url': '/CmLogin/BindIdCard',
		method: 'post',
		timeout: 20000,
		data: data,
	})
}
// 获取验证码
export function getCodeImg() {
	return request({
		'url': '/captchaImage',
		headers: {
			isToken: false
		},
		method: 'get',
		timeout: 20000
	})
}

//小程序登录
export function miniLogin(data) {
	return request({
		url: '/miniLogin',
		headers: {
			isToken: false
		},
		method: 'post',
		data: data
	})
}