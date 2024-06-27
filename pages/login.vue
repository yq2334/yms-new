<template>
	<view class="login-container">
		<view class="login-title">
			<u--image class="logo" :showLoading="true"  src="/static/images/logo.png" width="250rpx"
				height="250rpx"></u--image>
		</view>
		<!-- <view class="login-sub-title">翼秘书伙伴</view> -->
	
		<view class="login-item">
			<u-input v-model="userInfo.userName" placeholder="请输入帐号" fontSize="20" color="#181818" border="bottom"
				clearable>
				<u--image :showLoading="true" slot="prefix" src="/static/images/user.png" width="18px"
					height="18px"></u--image>
			</u-input>
		</view>
		<view class="login-item">
			<u-input v-model="userInfo.password" type="password" placeholder="请输入密码" fontSize="20" color="#181818"
				border="bottom" clearable>
				<u--image :showLoading="true" slot="prefix" src="/static/images/password.png" width="18px"
					height="18px"></u--image>
			</u-input>
		</view>
		<!-- 	<view class="login-item login-code">
			<u--input v-model="userInfo.verificationCode" placeholder="请输入验证码" prefixIcon="scan" shape="circle"
				border="bottom" clearable prefixIconStyle="font-size: 22px;color: #909399"></u--input>
			<image class="img" @click="getVierificationCode" :src="codeSrc"></image>
		</view> -->
		<view class="flex align-center justify-between margin-top">
			<view class="remember">
				<u-checkbox-group v-model="checkedRemenber" @change="checkboxChange">
					<u-checkbox activeColor="#FA8E1C" label="记住我" name="记住我"></u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="tips">
				还没有账号？<text @click="navTo('/pages/register')">立即注册</text>
			</view>
		</view>
		<view class="login-btn">
			<u-button @click="login"  :loading="loading"
				:loadingText="loading?'登录中..':''" :customStyle="{'border-radius': '10rpx'}" size="large" type="primary"
				text="登录">
			</u-button>
		</view>
		<view class="login-mobile">
			<text @click="navTo('/packageC/pages/auth/mobile-login')">手机快捷登录</text> <text class="split"></text> <span
				@click="navTo('/packageC/pages/auth/find-password')">忘记密码？</span>
		</view>
		<view class="xieyi text-center">

			<uni-data-checkbox v-model="checked" multiple :localdata="agree" />
			<!-- <text class="text-grey1">登录即代表同意</text> -->
			<text @click="handleUserAgrement" class="text-orange">《移动应用端合作伙伴注册协议》</text>
			<text @click="handlePrivacy" class="text-orange">《隐私协议》</text>
		</view>
		<!-- <view style="margin-top: -20rpx;">
			<vol-alert type="primary">
				<view>演示帐号：admin666 密码：123456</view>
				<view>本地帐号：admin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码：123456</view>
			</vol-alert>
		</view> -->
		<!-- <u-divider text="其他方式登陆"></u-divider>
		<view class="login-other">
			<view class="login-other-item"></view>
			<view>
				<image @click="wechatLogin" class="img" :key="index" v-for="(src,index) in icons" :src="src"></image>

			</view>
			<view class="login-other-item"></view>
		</view> -->
	</view>
</template>

<script>
	import {
		getVierificationCode,
		login
	} from '@/api/login.js'
	export default {
		data() {
			return {
				loading: false,
				codeSrc: "",
				userInfo: {

					userName: "", //test1
					password: "", //888888
					UUID: "",
					verificationCode: ""
				},
				icons: [],
				checked: [],
				checkedRemenber: [],
				agree: [{
					text: "我已阅读并同意",
					value: 0,
				}, ],
			}
		},
		methods: {
			login() {
				// uni.switchTab({
				// 	url: "/pages/home/home"
				// })
				// return;
				console.log(this.checked)
				if(!this.checked.length) {
					this.$toast("请先勾选用户协议!");
					return;
				}
				if (this.base.isEmpty(this.userInfo.userName))
					return this.$toast("请输入用户名");
				if (this.base.isEmpty(this.userInfo.password))
					return this.$toast("请输入密码");
				// if (this.base.isEmpty(this.userInfo.verificationCode))
				// 	return this.$toast("请输入验证码");
				this.userInfo.userName = this.userInfo.userName.trim();
				this.userInfo.password = this.userInfo.password.trim();
				this.userInfo.verificationCode = this.userInfo.verificationCode.trim();
				this.loading = true;
				login({
					fid: this.globalConfig.api.fid,
					fkey: this.globalConfig.api.fkey,
					apiname: 'yhh.login',
					uesid: this.userInfo.userName,
					uespwd: this.userInfo.password,
				}).then((result) => {
					if (result.code != '00') {
						this.loading = false;
						// this.getVierificationCode();
						return this.$toast(result.msg);
					}
					if(this.checkedRemenber.length > 0) {
						uni.setStorageSync('userName', this.userInfo.userName)
						uni.setStorageSync('password', this.userInfo.password)
					}
					this.loading = false;
					this.$toast("登录成功,正在跳转!");
					
					// this.$store.commit("SET_USERINFO", result.data);
					this.$store.commit("SET_TOKEN", result.token);
					this.$store.commit("SET_NAME", this.userInfo.userName);
					uni.switchTab({
						url: "/pages/home/home"
					})
				});

			},
			checkboxChange(n) {
				console.log('change', n);
				// if(n.length > 0) {
				// 	uni.setStorageSync('userName', this.userInfo.userName)
				// 	uni.setStorageSync('password', this.userInfo.password)
				// }
			},
			getVierificationCode() {
				getVierificationCode().then(x => {
					this.codeSrc = "data:image/png;base64," + x.img;
					this.userInfo.UUID = x.uuid;
				});

			},
			handlePrivacy() {
				let site = this.globalConfig.appInfo.agreements[0];
				this.$tab.navigateTo(
					`/pages/common/webview/index?title=${site.title}&url=${site.url}`
				);
			},
			// 用户协议
			handleUserAgrement() {
				let site = this.globalConfig.appInfo.agreements[1];
				this.$tab.navigateTo(
					`/pages/common/webview/index?title=${site.title}&url=${site.url}`
				);
			},
			wechatLogin() {},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		},
		onShow() {
			let _userName = uni.getStorageSync('userName')
			let _password = uni.getStorageSync('password')
			console.log(_userName, _password)
			if(_userName) {
				this.userInfo.userName = _userName
				this.checkedRemenber = ['记住我']
			}
			if(_password) {
				this.userInfo.password = _password
				this.checkedRemenber = ['记住我']
			}
		}
	}
</script>
<style lang="scss" scoped>
	.login-container {
		height: auto;

		.login-title {
			text-align: center;
			font-size: 70rpx;
			line-height: 85rpx;
			color: #303030;
			margin-bottom: 86rpx;
			padding-top: 120rpx;
			display: flex;
			justify-content: center;
		}

		.login-sub-title {
			padding-left: 20rpx;
			font-size: 70rpx;
			text-align: center;
			color: #FA8E1C;
			line-height: 85rpx;
			font-weight: bold;
			;
			margin-bottom: 100rpx;
		}

		padding: 80rpx 60rpx 0 60rpx;

		.login-item {

			// padding: 12rpx 0;
			// border-bottom: 1px solid #eee;
			// margin-bottom: 20rpx;
			/deep/ .u-input__content__prefix-icon {
				margin-right: 18rpx;
			}

			/deep/ .u-icon {
				// width: 80rpx;
			}

			/deep/ .u-input {
				font-size: 36rpx !important;
				padding: 45rpx 18rpx !important;
			}

			/deep/ .input-placeholder {
				font-size: 36rpx;
				color: #C7CBD2;
			}
		}

		.tips {
			// margin-top: 36rpx;
			color: #181818;
			font-size: 27rpx;

			text {
				color: #FA8E1C;
			}
		}

		.login-code {
			border-bottom: none;
			display: flex;

			.img {
				width: 120rpx;
				height: 54rpx;
			}
		}

		.login-btn {
			padding-top: 69rpx;

			.u-button--primary {
				background: linear-gradient(90deg, #FA8E1C, #FABF5A);
				border-radius: 47rpx !important;
				color: #FFFFFF;
				font-size: 36rpx !important;
				border: 0 !important;
				font-weight: bold;
				;
			}

			margin: 50rpx 0 50rpx 0;
		}

		.login-mobile {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #181818;
			font-size: 27rpx;

			.split {
				width: 1rpx;
				height: 20rpx;
				background: #C7CBD2;
				margin: 0 22rpx;
			}

			text {
				color: #FA8E1C;
			}
		}
	}

	.login-other {
		display: flex;

		.login-other-item {
			flex: 1;
			margin: 0 25rpx;
		}

		.img {
			width: 50px;
			height: 50px;
			margin: 0 30rpx;
		}

		.img:first-child {
			margin-left: 0;
		}
	}

	.xieyi {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		margin-top: 157rpx;
		// position: fixed;
		// width: 100%;
		// left: 0;
		// bottom: 30rpx;
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
		border-color: #FA8E1C;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checkbox__inner .checkbox__inner-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: #FA8E1C;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		width: 10px;
		height: 10px;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box .checklist-content .checklist-text {
		color: #9A9FAF;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checklist-text[data-v-84d5d996] {
		color: #333;

	}
</style>

<style lang="scss">
	.uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checklist-text {
	  color: #333 !important;
	}
</style>