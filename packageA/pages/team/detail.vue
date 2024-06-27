<template>
	<view class="police">
		<u-navbar leftText="返回" :fixed="true" :placeholder="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<view>
			<view class="police-content">
				<view class="pannel">
					<view class="cell flex align-center justify-between ">
						<view class="lable">
							代理商名称
						</view>
						<view class="value">
							{{mingcheng}}
						</view>

					</view>
					<view class="cell flex align-center justify-between " @click="showBand = true">
						<view class="lable">
							品牌
						</view>
						<view class="value">
							{{bandName ? bandName : '请选择'}}
						</view>
						<view class="">
							<u-icon size="18" color="#8B8B8B" name="arrow-down"></u-icon>
						</view>
					</view>
					<view class="cell flex align-center justify-between noBorder-Bottom" @click="showPolice = true">
						<view class="lable">
							政策
						</view>
						<view class="value">
							{{policeName ? policeName : '请选择'}}
						</view>
						<view class="">
							<u-icon size="18" color="#8B8B8B" name="arrow-down"></u-icon>
						</view>
					</view>
				</view>
				<view class="pannel margin-top" @click="showSkList = true">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							刷卡成本
						</view>
						<view class="value">
							{{detail.chengben_dai ? detail.chengben_dai : '请选择'}}
						</view>
						<view class="">
							<u-icon size="18" color="#8B8B8B" name="arrow-down"></u-icon>
						</view>
					</view>
				</view>
				<view class="pannel margin-top-xs" @click="showSMList = true">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							扫码成本
						</view>
						<view class="value">

							{{detail.chengben_yun ? detail.chengben_yun : '请选择'}}
						</view>
						<view class="">
							<u-icon size="18" color="#8B8B8B" name="arrow-down"></u-icon>
						</view>
					</view>
				</view>
				<view class="pannel " v-for="(item,index) in list" :key="item.model" :class="item.isMargin ? 'margin-top' : 'margin-top-xs'">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							{{item.name}}
						</view>
						<view class="value">
							<u-input v-model="detail[item.model]" placeholder="请输入" type="number"  inputAlign="right"  @focus="detail[item.model] == item.defaultValue ? detail[item.model] = '' : null" @blur="detail[item.model] == '' ? detail[item.model] =  item.defaultValue : null"
								fontSize="16"  color="#3F3F3F" border="none" clearable>
							</u-input>

						</view>

					</view>
				</view>
				<!-- <view class="pannel margin-top-xs">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							运营补贴
						</view>
						<view class="value">
							<u--input v-model="detail.butie" placeholder="请输入" type="number" inputAlign="right" @focus="detail.butie == defaultValue ? detail.butie = '' : null" @blur="detail.butie == '' ? detail.butie = defaultValue : null"
								fontSize="16"  color="#3F3F3F" border="none" clearable>
							</u--input>

						</view>

					</view>
				</view>
				<view class="pannel margin-top-xs">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							流量卡分润
						</view>
						<view class="value">
							<u--input v-model="detail.liuliangka" placeholder="请输入" type="number" inputAlign="right"
								fontSize="16"  color="#3F3F3F" border="none" clearable>
							</u--input>

						</view>

					</view>
				</view>
				<view class="pannel margin-top">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							一阶段返现
						</view>
						<view class="value">
							<u--input v-model="detail.fanxian1" placeholder="请输入" type="number" inputAlign="right"
								fontSize="16"  color="#3F3F3F" border="none" clearable>
							</u--input>


						</view>

					</view>
				</view>
				<view class="pannel margin-top-xs">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							二阶段返现
						</view>
						<view class="value">
							<u--input v-model="detail.fanxian2" placeholder="请输入" type="number" inputAlign="right"
								fontSize="16"  color="#3F3F3F" border="none" clearable>
							</u--input>

						</view>

					</view>
				</view>
				<view class="pannel margin-top-xs">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							三阶段返现
						</view>
						<view class="value">
							<u--input v-model="detail.fanxian3" placeholder="请输入" type="number" inputAlign="right"
								fontSize="16"  color="#3F3F3F" border="none" clearable>
							</u--input>

						</view>

					</view>
				</view>
				<view class="pannel margin-top-xs">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							四阶段返现
						</view>
						<view class="value">
							<u--input v-model="detail.fanxian4" placeholder="请输入" type="number" inputAlign="right"
								fontSize="16"  color="#3F3F3F" border="none" clearable>
							</u--input>

						</view>

					</view>
				</view>
				<view class="pannel margin-top-xs">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							五阶段返现
						</view>
						<view class="value">
							<u--input v-model="detail.fanxian5" placeholder="请输入" type="number" inputAlign="right"
								fontSize="16"  color="#3F3F3F" border="none" clearable>
							</u--input>

						</view>

					</view>
				</view>
				<view class="pannel margin-top-xs">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							六阶段返现
						</view>
						<view class="value">
							<u--input v-model="detail.fanxian6" placeholder="请输入" type="number" inputAlign="right"
								fontSize="16"  color="#3F3F3F" border="none" clearable>
							</u--input>

						</view>

					</view>
				</view>
				<view class="pannel margin-top">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							冻结版一
						</view>
						<view class="value">
							<u--input v-model="detail.yajin1" placeholder="请输入" type="number" inputAlign="right"
								fontSize="16"  color="#3F3F3F" border="none" clearable>
							</u--input>

						</view>

					</view>
				</view>
				<view class="pannel margin-top-xs">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							冻结版二
						</view>
						<view class="value">
							<u--input v-model="detail.yajin2" placeholder="请输入" type="number" inputAlign="right"
								fontSize="16"  color="#3F3F3F" border="none" clearable>
							</u--input>

						</view>

					</view>
				</view>
				<view class="pannel margin-top-xs">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							冻结版三
						</view>
						<view class="value">
							<u--input v-model="detail.yajin3" placeholder="请输入" type="number" inputAlign="right"
								fontSize="16" color="#3F3F3F" border="none" clearable>
							</u--input>


						</view>

					</view>
				</view>
				<view class="pannel margin-top-xs">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							冻结版四
						</view>
						<view class="value">

							<u--input v-model="detail.yajin4" placeholder="请输入" type="number" inputAlign="right"
								fontSize="16"  color="#3F3F3F" border="none" clearable>
							</u--input>
						</view>

					</view>
				</view> -->
			</view>
			<view class="action-btn padding-lr">
				<u-button @click="submit" :customStyle="{'border-radius': '10rpx'}" size="large" type="primary"
					text="确认提交">
				</u-button>
			</view>
		</view>
		<!-- <p class="padding-lr padding-tb text-sm " style="color: rgba(51, 51, 51, 0.6);">提示: 政策只能提升,不允许降低调整</p> -->
		<u-picker :show="showBand" :columns="bandList" keyName="pinpainame" title="请选择品牌" @close="showBand = false"
			@cancel="showBand = false" @confirm="bandSelect"></u-picker>
		<u-picker :show="showPolice" :columns="policeList" keyName="zcname" title="请选择政策" @close="showPolice = false"
			@cancel="showPolice = false" @confirm="policeSelect"></u-picker>
		<u-picker :show="showSkList" :columns="skList" keyName="skchengben" title="请选择刷卡成本" @close="showSkList = false"
			@cancel="showSkList = false" @confirm="skSelect"></u-picker>
		<u-picker :show="showSMList" :columns="sMList" keyName="smchengben" title="请选择扫码成本" @close="showSMList = false"
			@cancel="showSMList = false" @confirm="smSelect"></u-picker>

	</view>
</template>

<script>
	import {
		getTeamBandList,
		getTeamPoliceList,
		getTeamPoliceDetail,
		setTeamZhengce
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				showBand: false,
				showPolice: false,
				bandList: [],
				policeList: [],
				mingcheng: '',
				bandName: '',
				bandno: '',
				policeName: '',
				policeNO: '',
				defaultValue: 0,
				detail: {
					bishu: 0,
					butie: 0,
					yajin1: 0,
					yajin2: 0,
					yajin3: 0,
					yajin4: 0,
					fanxian1: 0,
					fanxian2: 0,
					fanxian3: 0,
					fanxian4: 0,
					fanxian5: 0,
					fanxian6: 0,
					liuliangka: 0,
					liuliangka2: 0,
					liuliangka3: 0,
				},
				list: [
					{
						name: '笔数成本',
						model: 'bishu',
						defaultValue: 0,
						isMargin: false
					},
					{
						name: '运营补贴',
						model: 'butie',
						defaultValue: 0,
						isMargin: false
					},
					{
						name: '流量卡分润',
						model: 'liuliangka',
						defaultValue: 0,
						isMargin: false
					},
					{
						name: '一阶段返现',
						model: 'fanxian1',
						defaultValue: 0,
						isMargin: true
					},
					{
						name: '二阶段返现',
						model: 'fanxian2',
						defaultValue: 0,
						isMargin: false
					},
					{
						name: '三阶段返现',
						model: 'fanxian3',
						defaultValue: 0,
						isMargin: false
					},
					{
						name: '四阶段返现',
						model: 'fanxian4',
						defaultValue: 0,
						isMargin: false
					},
					{
						name: '五阶段返现',
						model: 'fanxian5',
						defaultValue: 0,
						isMargin: false
					},
					{
						name: '六阶段返现',
						model: 'fanxian6',
						defaultValue: 0,
						isMargin: false
					},
					{
						name: '冻结版一',
						model: 'yajin1',
						defaultValue: 0,
						isMargin: true
					},
					{
						name: '冻结版二',
						model: 'yajin2',
						defaultValue: 0,
						isMargin: false
					},
					{
						name: '冻结版三',
						model: 'yajin3',
						defaultValue: 0,
						isMargin: false
					},
					{
						name: '冻结版四',
						model: 'yajin4',
						defaultValue: 0,
						isMargin: false
					}
				]
					
				,
				bianhao: '',
				showSkList: false,
				showSMList: false,
				skList: [],
				sMList: []

			};
		},
		onLoad(options) {
			this.bianhao = options.bianhao
			this.getBandListData()

		},
		methods: {
			getBandListData() {
				this.bandList = []
				getTeamBandList({
					bianhao: this.bianhao
				}).then((res) => {
					this.bandList.push(res.pinpailist)
					// this.bandName = res.pinpailist[0].pinpainame
					this.bandno = res.pinpailist[0].pinpai
					this.mingcheng = res.mingcheng
					
				})
			},
			getPoliceListData() {
				this.policeList = []
				getTeamPoliceList({
					pinpai: this.bandno,
					bianhao: this.bianhao
				}).then((res) => {
					this.policeList.push(res.zhengcelist)
					// this.policeName = res.zhengcelist[0].zcname
					// this.policeNO = res.zhengcelist[0].zcno
					
				})
			},
			getPoliceDetailData() {
				this.skList = []
				this.sMList = []
				getTeamPoliceDetail({
					zcno: this.policeNO,
					pinpai: this.bandno,
					bianhao: this.bianhao
				}).then((res) => {
					for (let item in this.detail) {
						console.log(item)
						if(res[item] == null) {
							res[item] = 0
						}
					}
					this.detail = res
					
					this.skList.push(res.sklist)
					this.sMList.push(res.smlist)
				})
			},
			bandSelect(e) {
				this.bandName = e.value[0].pinpainame
				this.bandno = e.value[0].pinpai
				this.getPoliceListData()
				this.showBand = false

			},
			policeSelect(e) {
				this.policeName = e.value[0].zcname
				this.policeNO = e.value[0].zcno
				this.getPoliceDetailData()
				this.showPolice = false

			},
			skSelect(e) {
				this.detail.chengben_dai = e.value[0].skchengben
				this.showSkList = false
			},
			smSelect(e) {
				this.detail.chengben_yun = e.value[0].smchengben
				this.showSMList = false
			},
			submit() {
				setTeamZhengce({
					zcno: this.policeNO,
					pinpai: this.bandno,
					bianhao: this.bianhao,
					chengben_dai: this.detail.chengben_dai,
					chengben_yun: this.detail.chengben_yun,
					bishu: this.detail.bishu,
					butie: this.detail.butie,
					liuliangka: this.detail.liuliangka,
					fanxian1: this.detail.fanxian1,
					fanxian2: this.detail.fanxian2,
					fanxian3: this.detail.fanxian3,
					fanxian4: this.detail.fanxian4,
					fanxian5: this.detail.fanxian5,
					fanxian6: this.detail.fanxian6,
					yajin1: this.detail.yajin1,
					yajin2: this.detail.yajin2,
					yajin3: this.detail.yajin3,
					yajin4: this.detail.yajin4
				}).then((res) => {
					if (res.code == '00') {
						uni.showToast({
							title: res.msg,
							icon: 'success'
						})
						setTimeout(() => {
							this.getPoliceDetailData()
						}, 2000)
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'error'
						})
					}
				})
			}
		},
	}
</script>
<style lang="scss">
	page {
		background-color: #F6F5F8;
	}
</style>
<style lang="scss" scoped>
	page {
		background-color: #F6F5F8;
	}

	.police {
		&-content {
			padding: 31rpx 18rpx;

			.pannel {
				background: #FFFFFF;
				border-radius: 25rpx;
				padding: 0 40rpx;
			}

			.cell {
				padding: 30rpx 0;
				border-bottom: 1rpx solid rgba(103, 103, 103, 0.2);

			}

			.cell-sm {
				padding: 20rpx 0;
			}

			.lable {
				font-size: 33rpx;
				color: #676767;
				flex: 1;
			}

			.value {
				flex: 2;
				font-size: 33rpx;
				color: rgba(51, 51, 51, 0.6);
			}
		}
	}
</style>