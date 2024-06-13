<script>
	import config from './config'
	import store from '@/store'
	import storage from '@/utils/storage'
	import {
		getToken
	} from '@/utils/auth'

	export default {
		onLaunch: function() {
			this.initApp()
			uni.getSystemInfo({
				success: (e) => {

					let barHeight = 44;
					// #ifdef APP-PLUS
					if (e.platform == 'android') {

						barHeight = e.statusBarHeight + 44

						
					} else {

						barHeight = e.statusBarHeight + 44
					}
					// #endif


					// #ifdef MP-WEIXIN  
					let custom = uni.getMenuButtonBoundingClientRect()
					barHeight = custom.bottom + custom.top - e.statusBarHeight
					// #endif  

					// #ifdef MP-ALIPAY  
					barHeight = e.statusBarHeight + e.titleBarHeight
					// #endif

					// 本地缓存
					uni.setStorageSync('barH', barHeight); //设置
					uni.setStorageSync('statusBarHeight',  e.statusBarHeight);
					uni.getStorageSync('statusBarHeight');
					console.log(uni.getStorageSync('barH'))
				}
			})
		},
		methods: {
			// 初始化应用
			initApp() {
				// 初始化应用配置
				this.initConfig()
				// 检查用户登录状态
				//#ifdef H5
				// this.checkLogin()
				//#endif
			},
			initConfig() {
				this.globalData.config = config
			},
			checkLogin() {
				if (!getToken()) {
					console.log('app.vue login')
					this.$tab.reLaunch('/pages/login')
				}
			}
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import '@/static/scss/index.scss'
</style>