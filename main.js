import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import uView from '@/uni_modules/uview-ui'
import './permission' // permission
import common from './utils/base.js'
import DictData from '@/components/dict/init'
import DictTag from '@/components/dict/DictTag'
import $mHelper from '@/utils/helper'
import globalConfig from './config'
// import commonView from './components/view.vue'
// 小程序分享的封装
import share from "@/utils/share.js"

import globalPopup from '@/components/globalPopup/globalPopup.js';

// 微信需要全局注册组件
// #ifdef MP-WEIXIN 
import popup from '@/components/globalPopup/globalPopup.vue' 
Vue.component('popup',popup);
// #endif

Vue.use(globalPopup);

Vue.mixin(share)
Vue.prototype.$mHelper = $mHelper
Vue.prototype.globalConfig = globalConfig
Vue.use(plugins)
Vue.use(uView)
Vue.component('DictTag', DictTag)
// Vue.component('commonView', commonView)
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.base=common;
DictData.install()
Vue.prototype.$toast = function(message,duration) {
	uni.showToast({
		icon: "none",
		title: message,
		duration:duration||2000
	})
}
App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()