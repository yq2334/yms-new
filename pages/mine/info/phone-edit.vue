<template>
	<view class="u-page">

		<view class="u-demo-block">

			<view class="u-demo-block__content">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="left" :model="model1" ref="form1">
					<u-form-item labelWidth="0" prop="userInfo.phone" borderBottom ref="item1">
						<u--input v-model="model1.userInfo.name" placeholder="原手机号：133****4567" placeholderStyle>
						</u--input>
					</u-form-item>
					<u-form-item label="" prop="code" labelWidth="0" borderBottom>
						<u-row  justify="space-between">
							<u-col span="7">
								<u--input v-model="model1.code" placeholder="请输入验证码"></u--input>
								
							</u-col>
							<u-col span="4">
								<u-button  @tap="getCode" :text="tips" type="primary" size="mid"
									:disabled="disabled1"></u-button>
							</u-col>
						</u-row>
					</u-form-item>
				</u--form>
				<u-button type="primary" text="确认更换" customStyle="margin-top: 50px" @click="submit"></u-button>
				<u-code ref="uCode" @change="codeChange" seconds="20" @start="disabled1 = true" startText="发送验证码"
					@end="disabled1 = false"></u-code>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disabled1: false,
				tips: '发送验证码',
				value: '',
				model1: {
					userInfo: {
						phone: '',

					},
					code: ''
				},
				rules: {
					'userInfo.name': [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return uni.$u.test.chinese(value);
						},
						message: "姓名必须为中文",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}],
					code: {
						type: 'string',
						required: true,
						len: 4,
						message: '请填写4位验证码',
						trigger: ['blur']
					},

				},

			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		methods: {

			navigateBack() {
				uni.navigateBack()
			},

			change(e) {
				// console.log(e);
			},
			formatter(day) {
				const d = new Date()
				let month = d.getMonth() + 1
				const date = d.getDate()
				if (day.month == month && day.day == date + 3) {
					day.bottomInfo = '有优惠'
					day.dot = true
				}
				return day
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

			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form1.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			reset() {
				const validateList = ['userInfo.name',
					'code',
				]
				this.$refs.form1.resetFields()
				this.$refs.form1.clearValidate()
				setTimeout(() => {
					this.$refs.form1.clearValidate(validateList)
					// 或者使用 this.$refs.form1.clearValidate()
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
