<template>
	<view class="auth-identy">
		<u--form labelPosition="left" :model="form" :rules="rules" ref="uForm">
			<u-form-item label="姓名" labelWidth="100" prop="name" ref="item1">
				<u--input v-model="form.name" border="none" placeholder="请输入姓名"></u--input>
			</u-form-item>
			<u-form-item label="身份证号" labelWidth="100" prop="idNo" ref="item1">
				<u--input v-model="form.idNo" border="none" placeholder="请输入身份证号"></u--input>
			</u-form-item>
		</u--form>
		<view class="btn-box">
			<u-button @tap="submit()" :loading="loading" type="primary" shape="circle" color="#388CEB" text="确认">
			</u-button>

		</view>
	</view>
</template>

<script>
	import {
		bindIdCard
	} from '@/api/login'
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				form: {
					name: '',
					idNo: ''
				},
				rules: {
					name: [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}],
					idNo: [{
						required: true,
						message: '请填写身份证号',
						trigger: ['blur', 'change']
					}, {
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// uni.$u.test.mobile()就是返回true或者false的
							return uni.$u.test.idCard(value);
						},
						message: '身份证号不正确',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur'],
					}],
				},

				// rules: {
				// 	'form.name': {
				// 		type: 'string',
				// 		required: true,
				// 		message: '请填写姓名',
				// 		trigger: ['blur', 'change']
				// 	},
				// 	'form.idNo': {
				// 		type: 'string',
				// 		required: true,
				// 		message: '请填写身份证号',
				// 		trigger: ['blur', 'change']
				// 	},
				// },
				loading: false
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad() {
			this.form.name = this.userInfo.name
			this.form.idNo = this.userInfo.idNo
		},
		methods: {
			submit() {
				this.$refs.uForm.validate().then(res => {
					this.bind()
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			bind() {
				this.loading = true
				bindIdCard(this.form).then(res => {
					const {
						code,
						data
					} = res

					if (code == 200) {
						uni.hideLoading();
						uni.$u.toast('绑定身份证成功！')
						this.$tab.reLaunch('/pages/hospital/index')
					}

				}).catch(() => {
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.auth-identy {
		padding: 40rpx;
	}

	/deep/ .uni-input-input {
		text-align: right;

		color: #010101;
	}

	/deep/ .uni-input-placeholder {
		text-align: right;
		font-size: 27rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #878787;
	}

	/deep/ .u-form-item__body__left__content__label[data-v-067e4733] {
		font-size: 27rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #010101;
	}

	/deep/ .u-form-item__body__right__message {
		text-align: right;
	}

	.btn-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 430rpx;
	}

	/deep/ .u-button {
		width: 600.67rpx;
		height: 83.33rpx;
	}
</style>
