<template>
	<view class="add">
		<u--form labelPosition="left" :model="form" ref="uForm" :rules="rules">
			<u-form-item labelWidth="180" label="姓名" prop="name" borderBottom ref="item1">
				<u--input v-model="form.name" border="none" placeholder="请输入姓名 ">
				</u--input>
			</u-form-item>
			<u-form-item labelWidth="180" label="身份证" prop="idNo" borderBottom ref="item1">
				<u--input v-model="form.idNo" border="none" placeholder="请输入身份证号码 ">
				</u--input>
			</u-form-item>

			<u-form-item labelWidth="180" label="与本人关系" prop="relation" borderBottom
				@click="showRelative = true; hideKeyboard()" ref="item1">
				<u--input v-model="form.relation" disabled placeholder="请选择与本人关系" border="none"></u--input>
				<u-icon slot="right" name="arrow-down"></u-icon>
			</u-form-item>
			<u-form-item labelWidth="180" label="联系电话" prop="phone" borderBottom ref="item1">
				<u--input v-model="form.phone" border="none" placeholder="请输入联系电话 ">
				</u--input>
			</u-form-item>
		</u--form>
		<u-action-sheet :show="showRelative" :actions="actions" title="请选择与本人关系" @close="showRelative = false"
			@select="relativeSelect">
		</u-action-sheet>
		</u--form>
		<u-button @tap="submit" type="primary" color="#388CEB" size="large" text="确认添加">
		</u-button>
		<u-popup :show="showPop" mode="bottom" >
			<view class="auth-page">
				<view class="auth">
					<view class="auth-user">
						<text>授权人：</text>
						<text class="fs">ｘxx </text>
					</view>
					<view class="auth-user">
						<text>被授权人：</text>
						<text class="fs">ｘxx </text>
					</view>
					<view class="auth-content">
						<text>授权内容：</text>
						<text class="fs">ｘxx </text>
					</view>
				</view>
				<view class="checkbox">
					<!-- <u-checkbox v-model="checked" activeColor="#1296DB"  labelSize="10"  labelColor="#000"  shape="circle" label="已阅读并同意以上条款"></u-checkbox> -->
					<uni-data-checkbox v-model="checked" multiple :localdata="agree" @change="change" />
				</view>
				<view class="btn-box">
					<u-button @tap="showPop = false" type="primary" color="#388CEB"  text="拒签">
					</u-button>
					<u-button @tap="agreeSign" type="primary" color="#388CEB" text="同意签署">
					</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		addFamilyMember,
	} from '@/api/setting/index.js'
	export default {
		data() {
			return {
				form: {
					name: "",
					idNo: "",
					phone: "",
					relation: "",

				},
				showRelative: false,
				showPop: true,
				checked: [0],
				agree: [{
					text: '已阅读并同意以上条款',
					value: 0
				}, ],
				actions: [{
						name: '本人',
					},
					{
						name: '妻子',
					},
					{
						name: '父母',
					},
					{
						name: '子女',
					},
				],
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
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.idCard(value);
							},
							message: '身份证号不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],
					relation: [{
						type: 'string',
						required: true,
						message: '请选择关系',
						trigger: ['blur', 'change']
					}],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					]

				},
			}
		},
		methods: {
			relativeSelect(e) {
				this.form.relation = e.name
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					this.showPop = true
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			agreeSign() {
				if(this.checked.length == 0) {
					uni.$u.toast('请先勾选同意协议')
					return;
				}
				this.showPop = false
				this.add()
			},
			add() {
				addFamilyMember(this.form).then((res) => {
					this.$modal.msgSuccess("添加成功")
					uni.navigateBack()
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.add {}

	/deep/ .u-form-item__body {
		padding: 20rpx 30rpx;
	}

	.uni-input-placeholder {
		color: #707070 !important;
		font-size: 33rpx;
	}

	/deep/ .u-form-item__body__left__content__label {
		font-size: 33rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #000000;
	}

	.uni-input-input:disabled {
		background: #fff !important;
	}

	/deep/ .u-button--large {

		margin-top: 120rpx;
		height: 91rpx;
		background: #388CEB;
		border-radius: 7rpx;
		color: #FFFCFC;
		font-size: 27rpx;
		width: 606rpx;

	}
	.auth-page{
		height: 100vh;
	}
	.auth{
		background: #FFFFFF;
		border: 1px solid #315ACE;
		border-radius: 7rpx;
		margin: 30rpx;
		&-user{
			font-size: 33rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #000000;
			padding: 5rpx 30rpx;
			border-bottom: 1rpx solid #315ACE;
			
		}
		&-content{
			font-size: 33rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #000000;
			padding: 5rpx 30rpx;
			height: 60vh;
		}
		.fs{
			color: #388CEB;
		}
		
	}
	.checkbox{
		padding: 0rpx 30rpx;
	}
	.btn-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 30rpx;
	}
	/deep/ .u-button{
		width: 300.67rpx;
		height: 91.33rpx;
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
