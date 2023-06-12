<template>
	<view class="container">
		<view class="example">
			<uni-forms ref="form" border :model="user" labelWidth="160px">
				<uni-forms-item label="证件类型" name="nickName" required>
					<uni-data-select v-model="user.creditType" :localdata="cardType" @change="change" :clear="false"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="证件号" name="nickName" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.nickName"
						:placeholderClass="'placeholder-input'" placeholder="请输入身份证号" />
				</uni-forms-item>
				<uni-forms-item label="民族" name="nickName" required>
					<uni-data-select v-model="user.creditType" :localdata="mingzuList" @change="change" :clear="false"></uni-data-select>
					
				</uni-forms-item>
				<uni-forms-item label="社保卡号" name="nickName" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.nickName" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="工作单位名称" name="nickName" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.nickName" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="单位联系电话" name="nickName" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.nickName" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="现住址所在地区" name="nickName" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.nickName" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="现住址详细地址" name="nickName" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.nickName" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="现住址联系电话" name="nickName" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.nickName" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="联系人姓名" name="nickName" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.nickName" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="联系人关系" name="nickName" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.nickName" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="联系人电话号码" name="phonenumber">
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.phonenumber"
						:placeholderClass="'placeholder-input'" placeholder="请输入手机号码" />
				</uni-forms-item>
			</uni-forms>
			
		</view>
		<view class="tips">
			说明:若您在医院未建立过档案，平台将自动为您建档默认您
			的身份类别未“一般人员”，费用类别未“医保”,如您需要
			修改请前往医院窗口进行更新。
		</view>
		<u-button type="primary"  @click="submit" text="保存"></u-button>
	</view>
</template>

<script>
	import {
		getUserProfile,
		updateUserProfile
	} from "@/api/system/user"
	import mingzu from '@/static/json/mz.json'
	export default {
		data() {
			return {
				mingzu,
				user: {
					nickName: "",
					phonenumber: "",
					email: "",
					sex: "",
					creditType: 0
				},

				cardType: [{
						value: 0,
						text: "身份证"
					},
					{
						value: 1,
						text: "港澳通行证"
					},

				],
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}],
				mingzuList: [],
				rules: {
					nickName: {
						rules: [{
							required: true,
							errorMessage: '用户昵称不能为空'
						}]
					},
					phonenumber: {
						rules: [{
							required: true,
							errorMessage: '手机号码不能为空'
						}, {
							pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
							errorMessage: '请输入正确的手机号码'
						}]
					},
					email: {
						rules: [{
							required: true,
							errorMessage: '邮箱地址不能为空'
						}, {
							format: 'email',
							errorMessage: '请输入正确的邮箱地址'
						}]
					}
				},
				
			}
		},
		onLoad() {
			this.getUser()
			
			this.getMingZuList()
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			getUser() {
				getUserProfile().then(response => {
					this.user = response.data.user
				})
			},
			getMingZuList() {
				this.mingzu.forEach((item, index) => {
					console.log(item)
					this.mingzuList.push({
						text: item,
						value: index
					})
				})
									
			},
			submit(ref) {
				this.$refs.form.validate().then(res => {
					updateUserProfile(this.user).then(response => {
						this.$modal.msgSuccess("修改成功")
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}
	.container{
		padding-bottom: 50rpx;
	}
	.example {
		padding: 0 15px ;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
		flex: 1;
	}
	.tips{
		padding: 0 22rpx;
		font-size: 27rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #388CEB;
		line-height: 47rpx;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		line-height: 35px;
		
		
	}
	/deep/ .u-button{
		width: 607.33rpx;
		margin: 48rpx auto;
		
	}

	/deep/ .uni-forms-item--border {
		padding: 10rpx 0;
	}

	/deep/ .uni-forms-item__label {
		font-size: 33rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #000000;
	}

	/deep/ .uni-easyinput {
		text-align: right;
		font-size: 33rpx;
	}

	/deep/ .uni-select {
		border: 0;
	}

	/deep/ .uni-select__input-placeholder {
		text-align: right;
		font-size: 33rpx;
		color: #707070;
	}
	/deep/ .uni-select__input-text{
		text-align: right;
		font-size: 33rpx;
		padding-right: 10rpx;
	}
	/deep/ .uni-easyinput__placeholder-class{
		color: #707070;
		font-size: 33rpx
	}
	.placeholder-input{
		color: #707070; 
		font-size: 33rpx
	}
</style>
