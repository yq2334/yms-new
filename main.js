import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import uView from '@/uni_modules/uview-ui'
import './permission' // permission
import DictData from '@/components/dict/init'
import DictTag from '@/components/dict/DictTag'
Vue.use(plugins)
Vue.use(uView)
Vue.component('DictTag', DictTag)
Vue.config.productionTip = false
Vue.prototype.$store = store
DictData.install()

App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()