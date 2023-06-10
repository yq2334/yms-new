import { getToken } from '@/utils/auth'

// 登录页面
const loginPage = "/pages/login"
const indexPage = "/pages/index"
// 页面白名单
const whiteList = [
  '/pages/index', '/pages/login', '/pages/common/webview/index','/pages/mine/index','/pages/setting/index', '/'
]

// 检查地址白名单
function checkWhite(url) {
	
  const path = url.split('?')[0]
  return whiteList.indexOf(path) !== -1
}

// 页面跳转验证拦截器
let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"]
list.forEach(item => {
  uni.addInterceptor(item, {
    invoke(to) {
		return true;
      if (getToken()) {
        if (to.path === loginPage) {
          uni.reLaunch({ url: "/" })
        }
        return true
      } else {
		  
        if (checkWhite(to.url)) {
          return true
        }
        uni.reLaunch({ url: loginPage })
        return false
      }
    },
    fail(err) {
      console.log(err)
    }
  })
})
