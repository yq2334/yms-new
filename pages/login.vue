<template>
	<view class="normal-login-container align-center">
		<view class="logo-content">
			<image :src="globalConfig.appInfo.logo" mode="widthFix">
			</image>
			<image class="logo-title" :src="'../static/images/logo-title.png'" mode="widthFix">
			</image>
			<!-- <text class="title"> {{appName}}</text> -->
		</view>
		<view class="login-form-content">
			<view class="input-item flex align-center">
				<view class=" icon-phone icon"></view>
				<input v-model="loginForm.phone" class="input" type="text" placeholder="请输入手机号" maxlength="30" />
			</view>
			<!-- <view class="input-item flex align-center">
				<view class="iconfont icon-password icon"></view>
				<input v-model="loginForm.password" type="password" class="input" placeholder="请输入密码" maxlength="20"
					@keyup.enter="handleLogin" />
			</view> -->
			<u-row justify="space-between">
				<u-col span="7">
					<view class="input-item flex align-center" v-if="captchaEnabled != 'off'">
						<view class=" icon-validate icon"></view>
						<input v-model="loginForm.code" class="input" placeholder="请输入验证码" maxlength="6"
							@keyup.enter="handleLogin" />

					</view>

				</u-col>
				<u-col span="4">
					<u-button @tap="getCode" :text="tips" type="primary" size="mid" shape="circle"
						:disabled="disabled1"></u-button>
				</u-col>
			</u-row>
			<view class="xieyi text-center">
				<!-- 	<u-checkbox v-model="loginForm.checked" activeColor="#1296DB" labelSize="10" labelColor="#000"
					shape="circle" label=""></u-checkbox> -->

				<uni-data-checkbox v-model="loginForm.checked" multiple :localdata="agree" @change="change" />
				<!-- <text class="text-grey1">登录即代表同意</text> -->
				<text @click="handleUserAgrement" class="text-blue">《用户协议》</text>
				<text @click="handlePrivacy" class="text-blue">《隐私协议》</text>
			</view>
			<view class="action-btn">
				<button @click="handleLogin" class="login-btn cu-btn block bg-blue lg round">登录</button>
			</view>
			<u-code ref="uCode" @change="codeChange" seconds="20" @start="disabled1 = true" startText="发送验证码"
				@end="disabled1 = false"></u-code>
		</view>



		<view class="other-login">
			<!-- #ifdef MP-WEIXIN -->
			<!-- <button type="default" open-type="getUserInfo" @getuserinfo="weChatLogin" class="wxLoginBtn">
        <view class="loginType">
          <view class="item">
            <view class="icon">
              <u-icon size="60" name="weixin-fill" color="rgb(83,194,64)"></u-icon>
            </view>
            微信
          </view>
        </view>
      </button> -->
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import {
		getCodeImg
	} from '@/api/login'

	export default {
		data() {
			return {
				checked: 0,
				disabled1: false,
				tips: '发送验证码',
				codeUrl: "",
				captchaEnabled: true,
				globalConfig: getApp().globalData.config,
				loginForm: {
					username: "admin",
					password: "123456",
					phone: '',
					code: "",
					uuid: '',
					checked: [0]
				},
				agree: [{
					text: '已阅读并同意',
					value: 0
				}, ],
			}
		},
		computed: {
			appName() {
				return uni.getSystemInfoSync().appName
			},
		},
		created() {
			
			// 绑定监听事件
			window.addEventListener("keydown", this.keyDown);
		},
		methods: {
			change(e){
							console.log('e:',e);
						},
			// 隐私协议
			handlePrivacy() {
				let site = this.globalConfig.appInfo.agreements[0]
				this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
			},
			// 用户协议
			handleUserAgrement() {
				let site = this.globalConfig.appInfo.agreements[1]
				this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			// 获取图形验证码
			// getCode() {
			// 	getCodeImg().then(res => {
			// 		this.captchaEnabled = res.data.captchaOff
			// 		if (this.captchaEnabled != 'off') {
			// 			this.codeUrl = 'data:image/gif;base64,' + res.data.img
			// 			this.loginForm.uuid = res.data.uuid
			// 		}
			// 	})
			// },
			// 登录方法
			async handleLogin() {
				this.$tab.reLaunch('/pages/index')
				return;
				if (this.loginForm.username === "") {
					this.$modal.msgError("请输入您的账号")
				} else if (this.loginForm.password === "") {
					this.$modal.msgError("请输入您的密码")
				} else if (this.loginForm.code === "" && this.captchaEnabled) {
					this.$modal.msgError("请输入验证码")
				} else {
					this.$modal.loading("登录中，请耐心等待...")
					this.pwdLogin()
				}
			},
			// 密码登录
			async pwdLogin() {
				this.$store.dispatch('Login', this.loginForm).then(() => {
					this.$modal.closeLoading()
					this.loginSuccess()
				}).catch(() => {
					if (this.captchaEnabled) {
						this.getCode()
					}
				})
			},
			// 登录成功后，处理函数
			loginSuccess(result) {
				// 设置用户信息
				this.$store.dispatch('GetInfo').then(res => {
					this.$tab.reLaunch('/pages/index')
				})
			},
			weChatLogin(e) {
				this.$modal.msgError("后端请自行实现")
				return
				if (e.detail) {
					uni.showLoading({
						title: "登录中....",
						mask: true
					})
					var userInfo = e.detail.userInfo
					uni.login({
						provider: 'weixin',
						success: (loginRes) => {
							// console.log(loginRes, userInfo);
							this.$store.dispatch('MiniLogin', {
								code: loginRes.code,
								...userInfo
							}).then(() => {
								this.$modal.closeLoading()
								this.loginSuccess()
							}).catch(() => {

							})
						}
					});
				} else {
					this.$modal.msgError("登录失败")
				}
			},
			// 点击回车键登录
			keyDown(e) {
				// 回车则执行登录方法 enter键的ASCII是13
				if (e.keyCode === 13) {
					this.handleLogin(); // 定义的登录方法
				}
			}
		},
		
		destroyed() {
			// 销毁事件
			window.removeEventListener("keydown", this.keyDown, false);
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #ffffff;
	}

	.normal-login-container {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		flex-direction: column;

		.logo-content {
			width: 100%;
			font-size: 21px;
			text-align: center;
			padding-top: 50rpx;

			image {
				border-radius: 4px;
				width: 416rpx;
				height: 302.67rpx;
				vertical-align: middle;
			}

			.title {
				margin-left: 10px;
			}

			.logo-title {
				width: 497.33rpx;
				margin-top: 32rpx;
			}
		}

		.login-form-content {
			text-align: center;
			margin: 20px auto;
			margin-top: 5%;
			width: 80%;

			.input-item {
				margin: 15px auto;
				background-color: transparent;
				height: 45px;
				border-radius: 20px;
				border: 1rpx solid #94C9FF;

				.icon {
					font-size: 38rpx;
					margin-left: 10px;
					color: #999;
				}

				.input {
					width: 100%;
					font-size: 14px;
					line-height: 20px;
					text-align: left;
					padding-left: 15px;
				}

			}

			.icon-phone {
				background: url(@/static/images/phone.png) no-repeat;
				background-size: 100% 100%;
				width: 42rpx;
				height: 54rpx;
			}

			.icon-validate {
				background: url(@/static/images/validate.png) no-repeat;
				background-size: 100% 100%;
				width: 46rpx;
				height: 54.67rpx;
			}

			.login-btn {
				// margin-top: 40px;
				height: 45px;
			}

			.xieyi {
				color: #333;
				margin-top: 58px;
				margin-bottom: 30rpx;
				display: flex;
				align-items: center;
			}
		}

		.easyinput {
			width: 100%;
		}
	}

	.login-code-img {
		height: 45px;
	}

	.other-login {
		padding-top: 115rpx;

		.wxLoginBtn {
			background: transparent !important;
			border: none;
		}

		.wxLoginBtn::after {
			border: none;
		}

		.loginType {
			display: flex;
			// padding: 140rpx 0;
			justify-content: center;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: skyblue;
				font-size: 22rpx;
			}
		}
	}


	/deep/ .uni-data-checklist .checklist-group .checklist-box {
		margin-right: 0px;
	}

	/deep/ .uni-data-checklist {
		flex: none;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box .checkbox__inner {
		border-radius: 50%;
		width: 16px;
		height: 16px;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checkbox__inner {
		background-color: #fff;
		border-color: #1296DB;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checkbox__inner .checkbox__inner-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: #1296DB;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		width: 10px;
		height: 10px;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checklist-text[data-v-84d5d996] {
		color: #000;
	}
</style>
