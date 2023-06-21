<template>
	<view class="container">
		<view class="example">
			<uni-forms ref="form" border :model="user" labelWidth="160px" :rules="rules">
				<uni-forms-item label="证件类型" name="idType" required>
					<uni-data-select v-model="user.idType" :localdata="cardType" @change="change" :clear="false" disabled >
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="证件号" name="idNo" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.idNo"
						:placeholderClass="'placeholder-input'" placeholder="请输入身份证号" disabled   />
				</uni-forms-item>
				<uni-forms-item label="民族" name="nationality" required>
					<uni-data-select v-model="nationality" :localdata="mingzuList" @change="change" :clear="false">
					</uni-data-select>

				</uni-forms-item>
				<uni-forms-item label="社保卡号" name="socialCardNumber" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.socialCardNumber"
						placeholder="请输入" :placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="工作单位名称" name="employ" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.employ" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="单位联系电话" name="employTel" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.employTel" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="现住址所在地区" name="district" required>
					<u-picker :show="show" ref="uPicker" :columns="cityList" @confirm="confirm" @change="changeHandler">
					</u-picker>

					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.district" placeholder="请输入"
						@focus="show = true;hideKeyboard()" :placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="现住址详细地址" name="address" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.address" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="现住址联系电话" name="addressTel" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.addressTel" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="联系人姓名" name="contractName" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.contractName" placeholder="请输入"
						:placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="联系人关系" name="contractRelation" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.contractRelation"
						placeholder="请输入" :placeholderClass="'placeholder-input'" />
				</uni-forms-item>
				<uni-forms-item label="联系人电话号码" name="contractTel" required>
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="user.contractTel"
						:placeholderClass="'placeholder-input'" placeholder="请输入手机号码" />
				</uni-forms-item>
			</uni-forms>

		</view>
		<!-- <view class="tips">
			说明:若您在医院未建立过档案，平台将自动为您建档默认您
			的身份类别未“一般人员”，费用类别未“医保”,如您需要
			修改请前往医院窗口进行更新。
		</view> -->
		<u-button type="primary" @click="submit" text="保存"></u-button>
	</view>
</template>

<script>
	import {
		getPersonalInfo,
		updatePersonalInfo
	} from "@/api/setting/index.js"
	import mingzu from '@/static/json/mz.json'
	// import cityData from '@/static/json/pca.json'
	import cityData from '@/static/json/city.js'

	export default {
		data() {
			return {
				mingzu,
				cityData,
				nationality: '',
				user: {
					address: null,
					addressTel: null,
					contractName: null,
					contractRelation: null,
					contractTel: null,
					district: null,
					employ: null,
					employTel: null,
					idNo: "",
					idType: "",
					nationality: null,
					socialCardNumber: null,
				},
				show: false,
				cityList: [],
				cityLevel1: [],
				cityLevel2: [],
				cityLevel3: [],
				cardType: [{
						value: '身份证',
						text: "身份证"
					},
					{
						value: '港澳通行证',
						text: "港澳通行证"
					},

				],
				mingzuList: [],
				rules: {
					address: {
						rules: [{
							required: true,
							errorMessage: '现住址详细地址',
						}]
					},
					contractName: {
						rules: [{
							required: true,
							errorMessage: '联系人姓名',
						}]
					},
					contractRelation: {
						rules: [{
							required: true,
							errorMessage: '请输入联系人关系',
						}]
					},
					district: {
						rules: [{
							required: true,
							errorMessage: '请输入现住址所在地区',
						}]
					},
					employ: {
						rules: [{
							required: true,
							errorMessage: '请输入工作单位名称',
						}]
					},
					idNo: {
						rules: [{
							required: true,
							errorMessage: '请输入证件号',
						}]
					},
					idType: {
						rules: [{
							required: true,
							errorMessage: '请选择证件类型',
						}]
					},
					nationality: {
						rules: [{
							required: true,
							errorMessage: '请选择民族',
						}]
					},
					socialCardNumber: {
						rules: [{
							required: true,
							errorMessage: '请输入社保卡号',
						}]
					},
					employTel: {
						rules: [{
							required: true,
							errorMessage: '请输入单位联系电话',
						}]
					},
					addressTel: {
						rules: [{
							required: true,
							errorMessage: '请输入现住址联系电话',
						}]
					},
					contractTel: {
						rules: [{
								required: true,
								errorMessage: '请输入联系人电话号码',
							},
							// {
							// 	pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
							// 	errorMessage: '请输入正确的手机号码'
							// },
						]
					},
				},

			}
		},
		onLoad() {
			this.getUser()

			this.getMingZuList()
			this.initCityData()
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			getUser() {
				getPersonalInfo().then(response => {
					this.user = response.data
					this.nationality = response.data.nationality
				})
			},
			getMingZuList() {
				this.mingzu.forEach((item, index) => {
					// console.log(item)
					this.mingzuList.push({
						text: item,
						value: item
					})
				})

			},
			initCityData() {
				// 遍历城市js
				cityData.forEach((item1, index1) => {
					let temp2 = [];
					this.cityLevel1.push(item1.provinceName);

					let temp4 = [];
					let temp3 = [];
					// 遍历市
					item1.cities.forEach((item2, index2) => {
						temp2.push(item2.cityName);
						// 遍历区
						item2.counties.forEach((item3, index3) => {
							temp3.push(item3.countyName);
						})
						temp4[index2] = temp3;
						temp3 = [];
					})
					this.cityLevel3[index1] = temp4;

					this.cityLevel2[index1] = temp2;
				})
				// 选择器默认城市
				this.cityList.push(this.cityLevel1, this.cityLevel2[0], this.cityLevel3[0][0]);
			},
			// 选中时执行
			changeHandler(e) {
				const {
					columnIndex,
					index,
					indexs,
					value,
					values,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e;
				if (columnIndex === 0) { // 选择第一列数据时
					// 设置第二列关联数据
					picker.setColumnValues(1, this.cityLevel2[index]);
					// 设置第三列关联数据
					picker.setColumnValues(2, this.cityLevel3[index][columnIndex]);
				} else if (columnIndex === 1) { // 选择第二列数据时
					// 设置第三列关联数据
					picker.setColumnValues(2, this.cityLevel3[indexs[0]][index]);
				}
			},


			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log('confirm', e.value.toString())
				this.show = false
				this.user.district = e.value.toString()
			},
			change(index) {
				console.log(this.mingzu[index])
				this.user.nationality = this.mingzuList[index].text
			},
			submit(ref) {
				this.$refs.form.validate().then(res => {
					updatePersonalInfo(this.user).then(response => {
						this.$modal.msgSuccess("修改成功")
						this.getUser()
					})
				})
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.container {
		padding-bottom: 50rpx;
	}

	.example {
		padding: 0 15px;
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

	.tips {
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

	/deep/ .u-button {
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

	/deep/ .uni-select__input-text {
		text-align: right;
		font-size: 33rpx;
		padding-right: 10rpx;
	}

	/deep/ .uni-easyinput__placeholder-class {
		color: #707070;
		font-size: 33rpx
	}

	.placeholder-input {
		color: #707070;
		font-size: 33rpx
	}

	/deep/ .uni-forms-item--border .uni-forms-item__content .uni-forms-item__error {
		text-align: right;
	}
</style>
