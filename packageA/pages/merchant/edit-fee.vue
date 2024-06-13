<template>
	<view class="police">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<common-view>
			<view class="police-content">
				<view class="pannel">
					<view class="cell flex align-center justify-between ">
						<view class="lable">
							机具号
						</view>
						<view class="value">
							{{shinfo.wlno}}
						</view>

					</view>
					<view class="cell flex align-center justify-between ">
						<view class="lable">
							商户号
						</view>
						<view class="value">
							{{shinfo.shanghuno}}
						</view>

					</view>
					<view class="cell flex align-center justify-between ">
						<view class="lable">
							商户名称
						</view>
						<view class="value">
							{{shinfo.shname}}
						</view>

					</view>
					<!-- 	<view class="cell flex align-center justify-between " @click="showBand = true">
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
					</view> -->
				</view>
				<view class="pannel margin-top" @click="showBand = true">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							信用卡
						</view>
						<view class="value">
							{{fka}}
						</view>
						<view class="">
							<u-icon size="18" color="#8B8B8B" name="arrow-down"></u-icon>
						</view>
					</view>
				</view>
				<view class="pannel margin-top-xs" @click="showPolice = true">
					<view class="cell-sm flex align-center justify-between">
						<view class="lable">
							秒到费
						</view>
						<view class="value">
							{{fbi}}

						</view>
						<view class="">
							<u-icon size="18" color="#8B8B8B" name="arrow-down"></u-icon>
						</view>
					</view>
				</view>

			</view>
			<view class="action-btn padding-lr">
				<u-button @click="submit" :customStyle="{'border-radius': '10rpx'}" size="large" type="primary"
					text="确认提交">
				</u-button>
			</view>
		</common-view>
		<!-- <p class="padding-lr padding-tb text-sm " style="color: rgba(51, 51, 51, 0.6);">提示: 政策只能提升,不允许降低调整</p> -->
		<u-picker :show="showBand" :columns="fkalist" keyName="chengben" title="请选择信用卡费率" @close="showBand = false"
			@cancel="showBand = false" @confirm="bandSelect"></u-picker>
		<u-picker :show="showPolice" :columns="fbilist" keyName="chengben" title="请选择秒到费" @close="showPolice = false"
			@cancel="showPolice = false" @confirm="policeSelect"></u-picker>


	</view>
</template>

<script>
	import {
		feilv_set_item,
		feilv_set_submit
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				showBand: false,
				showPolice: false,
				fkalist: [],
				fbilist: [],
				fka: '',
				fbi: '',
				shanghuno: '',
				shinfo: {},
				bianhao: '',


			};
		},
		onLoad(options) {
			this.shanghuno = options.shanghuno
			this.getBandListData()

		},
		methods: {
			getBandListData() {
				this.bandList = []
				feilv_set_item({
					jijuhao: this.shanghuno
				}).then((res) => {
					this.shinfo = res.shinfo
					this.fkalist.push(res.fkalist)
					this.fbilist.push(res.fbilist)
				})
			},

			bandSelect(e) {
				this.fka = e.value[0].chengben

				this.showBand = false

			},
			policeSelect(e) {
				this.fbi = e.value[0].chengben
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
				if(!this.fka) {
					this.$modal.showToast('请选择信用卡费率')
					
					return;
				}
				
				feilv_set_submit({
					jijuhao: this.shinfo.wlno,
					 shanghuhao: this.shinfo.shanghuno,
					shuaka: this.fka,
					bishu: this.fbi 
    

				}).then((res) => {
					if (res.code == '00') {
						uni.showToast({
							title: '提交成功',
							icon: 'success'
						})
						setTimeout(() => {
							let pages = getCurrentPages();
							let beforePage = pages[pages.length - 2]; // 上一页
							console.log(beforePage)
							uni.navigateBack({
								success: function() {
									// 执行上一页的demand方法(该方法是上一页请求数据的方法)
									beforePage.getMerchantInfoData();
								}
							});
						},2000)
					}else{
						this.$modal.showToast(res.msg)
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
				text-align: right;
			}
		}
	}
</style>