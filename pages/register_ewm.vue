<template>
	<view class="register">
		<u-navbar leftText="" :fixed="false" bgColor="#fff" title="" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<view class="register-title text-black text-M text-center">
			手机号登录 注册
		</view>
		<view class="register-sub-title text-black text-center">
			「加入翼秘书 畅想支付人生」
		</view>
		<view class="register-form">
			<u--form :model="form" ref="form">
				<!-- <u-form-item label="" prop="userName" class="input-item margin-bottom-m">
					<u-input v-model="form.userName" placeholder="请输入真实姓名" fontSize="20" color="#181818" shape="circle"
						border="none" clearable>
					</u-input>

				</u-form-item> -->
				<u-form-item label="" prop="contact" class="input-item margin-bottom-m">
					<u-input v-model="form.contact" placeholder="请输入联系人" fontSize="20" color="#181818" shape="circle"
						border="none" clearable>
					</u-input>
				</u-form-item>
				<u-form-item label="" prop="mobile" class="input-item margin-bottom-m">
					<u-input v-model="form.mobile" placeholder="请输入手机号" fontSize="20" color="#181818" shape="circle"
						border="none" clearable>
					</u-input>
				</u-form-item>
				<u-form-item label="" prop="validate" class="input-item margin-bottom-m">
					<u-input v-model="form.validate" placeholder="请输入验证码" fontSize="20" color="#181818" shape="circle"
						border="none" clearable>
						<view class="" slot="suffix">
							<u-button @tap="getCode" :text="tips" type="text" size="mid" shape="circle"
								:disabled="disabled1"></u-button>
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="" prop="password" class="input-item margin-bottom-m">
					<u-input :type="show.password ? 'text' : 'password'  " v-model="form.password" border="none"
						fontSize="20" color="#181818" shape="circle" placeholder="请输入密码">
						<view class="" slot="suffix">
							<u--image v-if="show.password" @click="show.password = false" class="opne-eyes"
								mode="aspectFit" :showLoading="true" src="/static/images/show-icon.png" width="22px"
								height="22px"></u--image>

							<u--image v-else @click="show.password = true" class="close-eyes" mode="aspectFit"
								:showLoading="true" src="/static/images/hide-icon.png" width="22px"
								height="22px"></u--image>

						</view>

					</u-input>
				</u-form-item>
				<u-form-item label="" prop="confirmPwd" class="input-item margin-bottom-m">
					<u-input :type="show.confirmPwd ? 'text' : 'password'  " v-model="form.confirmPwd" border="none"
						fontSize="20" color="#181818" shape="circle" placeholder="请确认密码">
						<view class="" slot="suffix">
							<u--image v-if="show.confirmPwd" @click="show.confirmPwd = false" class="opne-eyes"
								mode="aspectFit" :showLoading="true" src="/static/images/show-icon.png" width="22px"
								height="22px"></u--image>

							<u--image v-else @click="show.confirmPwd = true" class="close-eyes" mode="aspectFit"
								:showLoading="true" src="/static/images/hide-icon.png" width="22px"
								height="22px"></u--image>

						</view>

					</u-input>
				</u-form-item>
			</u--form>
			
			<view class="action-btn">

				<u-button   @click="submit" :loading="loading" :loadingText="loading?'注册中..':''"
					:customStyle="{'border-radius': '10rpx'}" size="large" type="primary" text="点击注册">
				</u-button>
			</view>
		</view>
		<view class="xieyi text-center">
		
			<uni-data-checkbox v-model="checked" multiple :localdata="agree" @change="change" />
			<!-- <text class="text-grey1">登录即代表同意</text> -->
			<text @click="handleUserAgrement" class="text-orange">《移动应用端合作伙伴注册协议》</text>
			<text @click="handlePrivacy" class="text-orange">《隐私协议》</text>
		</view>
		<u-code ref="uCode" @change="codeChange" seconds="60" @start="disabled1 = true" 
			@end="disabled1 = false"></u-code>
	</view>

</template>

<script>
	import {getVerifyCode, register} from '@/api/login.js';
	
	export default {
		data() {
			return {
				form: {
					userName: '',
					contact: '',
					mobile: '',
					password: '',
					confirmPwd: '',
					validate: ''
				},
				rules: {
				
					"contact": [{
						required: true,
						message: '请输入联系人',
						trigger: ['blur', 'change']
					}],
					"mobile": [{
						required: true,
						message: '请输入手机号',
						trigger: ['blur', 'change']
					}, {
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// uni.$u.test.mobile()就是返回true或者false的
							return uni.$u.test.mobile(value);
						},
						message: '请输入正确的手机号',
						// 触发器可以同时用blur和change
						trigger: ['blur', 'change'],
					}],
					"password": [{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}],
					"validate": [{
						required: true,
						message: '请输入验证码',
						trigger: ['blur', 'change']
					}],
					"confirmPwd": [{
							required: true,
							message: '请确认密码',
							trigger: ['blur']
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return this.form.password == value;
							},
							message: '请确认密码正确',
							// 触发器可以同时用blur和change
							trigger: ['blur', 'change'],
						}
					],
				},
				checked: [],
				disabled1: false,
				tips: "获取验证码",
				show: {
					password: false,
					confirmPwd: false
				},
				loading: false,
				agree: [{
					text: "我已阅读并同意",
					value: 0,
				}, ],
				sj: ''
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		onLoad(option) {
			if(option.sj) {
				this.sj = option.sj
				console.log(this.sj)
			}
		},
		methods: {
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					getVerifyCode({
					  mobile: this.form.mobile,
					  type: 'reg'
					}).then((res) => {
					 
					  if (res.code == '00') {
					    uni.hideLoading();
					    // 这里此提示会被this.start()方法中的提示覆盖
					    uni.$u.toast("验证码已发送");
						
					    // 通知验证码组件内部开始倒计时
					    this.$refs.uCode.start();
					  }else{
						    uni.$u.toast(res.msg);
					  }
					});
				} else {
					uni.$u.toast("倒计时结束后再发送");
				}
			},
			codeChange(text) {
				console.log(text)
			  this.tips = text;
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
			submit() {
				if(!this.checked.length) {
					this.$toast("请先勾选用户协议!");
					return;
				}
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(res => {
					// uni.$u.toast('校验通过')
					register({
						uesid: this.form.mobile,
						uescode: this.form.validate,
						uespwd: this.form.password,
						mingcheng: this.form.contact,
						shangji: this.sj
					}).then((res) => {
						if(res.code == '00') {
							uni.showToast({
								title: '注册成功',
								icon: 'success'
							})
							this.$tab.redirectTo('/pages/login')
							this.reset()
						}
					})
					
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			reset() {
				const validateList = ['oldPwd', 'newPwd', 'confirmPwd']
				this.$refs.form.resetFields()
				this.$refs.form.clearValidate()
				setTimeout(() => {
					this.$refs.form.clearValidate(validateList)
					// 或者使用 this.$refs.form1.clearValidate()
				}, 10)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.register {
		&-title {
			font-size: 48rpx;
			padding-top: 250rpx;
			line-height: 1;
		}

		&-sub-title {
			font-size: 24rpx;
			opacity: 0.7;
			padding-top: 30rpx;
			line-height: 1;
		}

		&-form {
			width: 568rpx;
			margin: 106rpx auto 0 auto;

			.input-item {
				/deep/ .u-input__content__prefix-icon {
					margin-right: 18rpx;
				}

				/deep/ .u-icon {
					// width: 80rpx;
				}

				/deep/ .u-input {
					height: 85rpx;
					font-size: 36rpx !important;
					padding: 0 47rpx !important;
					background: #EEEFF3;
				}

				/deep/ .input-placeholder {
					font-size: 36rpx;
					color: #C7CBD2;
				}

				/deep/ .u-form-item__body {
					padding: 0;
				}
			}

			/deep/ .u-button--text .u-button__text {
				color: #FA8E1C;
				font-size: 28rpx;
				font-family: 'AlibabaPuHuiTiR';
			}
		}

	
	}

	.xieyi{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
		font-size: 28rpx;
		margin-top: 150rpx;
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
	/deep/ .uni-data-checklist .checklist-group .checklist-box .checklist-content .checklist-text{
		color: #9A9FAF;
	}
	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checklist-text[data-v-84d5d996] {
		color: #333;
	
	}
</style>

<style lang="scss">
	/deep/ .u-input__content__prefix-icon {
		margin-right: 18rpx;
	}
		
	/deep/ .u-icon {
		// width: 80rpx;
	}
		
	/deep/ .u-input { 
		height: 85rpx !important;
		font-size: 36rpx !important;
		padding: 0 47rpx !important;
		background: #EEEFF3 !important;
	}
	/deep/ .u-input__content__field-wrapper__field {
		height: 85rpx !important;
	
	}	
	/deep/ .input-placeholder {
		font-size: 36rpx;
		color: #C7CBD2;
	}
		
	/deep/ .u-form-item__body {
		padding: 0;
	}
	.uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checklist-text {
	  color: #333 !important;
	}
</style>