<template>
	<view class="u-page">

		<view class="u-demo-block">

			<view class="u-demo-block__content">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="left" :model="form" ref="uForm" :rules="rules">
					<u-form-item labelWidth="0" prop="mobile" borderBottom ref="item1">
						<u--input v-model="form.mobile" :placeholder="`原手机号：${userInfo.phone},请输入新手机号`">
						</u--input>
					</u-form-item>
					<u-form-item label="" prop="code" labelWidth="0" borderBottom>
						<u-row justify="space-between">
							<u-col span="7">
								<u--input v-model="form.code" placeholder="请输入验证码"></u--input>

							</u-col>
							<u-col span="4">
								<u-button @tap="getCode" :text="tips" type="primary" size="mid" :disabled="disabled1">
								</u-button>
							</u-col>
						</u-row>
					</u-form-item>
				</u--form>
				<u-button type="primary" text="确认更换" customStyle="margin-top: 50px" @click="submit"></u-button>
				<u-code ref="uCode" @change="codeChange" seconds="60" @start="disabled1 = true" startText="发送验证码"
					@end="disabled1 = false"></u-code>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		sendNewCode,
		verifyNewPhone
	} from '@/api/setting/index.js'
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				disabled1: false,
				tips: '发送验证码',
				value: '',
				form: {
					mobile: '',
					code: ''
				},
				rules: {
					mobile: [{
						required: true,
						message: '请填写手机号',
						trigger: ['blur', 'change']
					}, {
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// uni.$u.test.mobile()就是返回true或者false的
							return uni.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur'],
					}],
					code: [{
						required: true,
						message: '请填写验证码',
						trigger: ['blur']
					}, ]
				}
				// rules: {
				// 	'form.mobile': {
				// 		type: 'string',
				// 		required: true,
				// 		message: '请填写手机号',
				// 		trigger: ['blur', 'change']
				// 	},
				// 	'form.code': {
				// 		type: 'string',
				// 		required: true,
				// 		message: '请填写验证码',
				// 		trigger: ['blur']
				// 	},
				// },


			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			// this.$refs.uForm.setRules(this.rules)
		},
		methods: {

			navigateBack() {
				uni.navigateBack()
			},

			change(e) {
				// console.log(e);
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
					sendNewCode({
						mobile: this.form.mobile
					}).then(res => {
						const {
							code,
							data
						} = res
						if (code == 200) {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							uni.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}

					})

				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},

			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				console.log(this.$refs.uForm)
				this.$refs.uForm.validate().then(res => {
					// uni.$u.toast('校验通过')
					this.changeMoble()
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			changeMoble() {
				verifyNewPhone(this.form).then(res => {
					uni.$u.toast('更换手机号成功')
					this.$store.dispatch('GetInfo')
					uni.navigateBack()
				}).catch(() => {

				})
			},
			reset() {
				const validateList = ['userInfo.name',
					'code',
				]
				this.$refs.uForm.resetFields()
				this.$refs.uForm.clearValidate()
				setTimeout(() => {
					this.$refs.uForm.clearValidate(validateList)
					// 或者使用 this.$refs.uForm.clearValidate()
				}, 10)
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
		padding: 68rpx;
	}

	/deep/ .u-border {
		border-color: #2060F0 !important;
	}

	// /deep/ .u-form-item__body__right__content__slot[data-v-067e4733]{
	// 	width: 60%;
	// }
</style>
