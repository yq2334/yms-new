<template>
	<view class="search">
		<u-popup :show="show" mode="top" @close="close" @open="open">
			<view class="serach-pop ">
				<u-navbar leftText="返回" :fixed="false" bgColor="transparent" :autoBack="false" :safeAreaInsetTop="true"
					@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
					:titleStyle="{color: '#363636',fontSize: '32rpx'}">
					<view class="search flex align-center" slot="right" @click="show=false" :style="{marginRight: rightX + 'px'}">
						<text style="fontSize: 33rpx">退出查询</text>
						<u-icon size="28" class="margin-left-xs" color="#363636" name="close-circle"></u-icon>

					</view>
				</u-navbar>
				<view class="search-content padding">
					
				
				<u--form :model="form" ref="form" labelPosition="left" labelWidth="120" :borderBottom="true">
					<view class="" v-for="(item,index) in columns" :key="index">
						<u-form-item v-if="item.type == 'pinpai' && item.isShow" label="品牌" prop="pinpai"
							class="input-item " :borderBottom="true" @click="showPinpai = true; ">
							<u--input v-model="form.pinpainame" disabled disabledColor="#ffffff"
								:style="{pointerEvents: 'none'}" :placeholder="item.placeholder" inputAlign="right"
								fontSize="18" color="#3F3F3F" border="none"></u--input>
							<u-icon slot="right" class="margin-left-sm" name="arrow-down"></u-icon>
							<u-picker :show="showPinpai" :columns="pinpaiList" keyName="pinpainame" title="请选择品牌"
								@close="showPinpai = false" @cancel="showPinpai = false"
								@confirm="pinpaiSelect"></u-picker>
						</u-form-item>
						<u-form-item v-if="item.type == 'zhengce' && item.isShow" label="政策" prop="zhengce"
							class="input-item " :borderBottom="true" @click="showZhengce = true; ">
							<u--input v-model="form.zcname" disabled disabledColor="#ffffff"
								:style="{pointerEvents: 'none'}" :placeholder="item.placeholder" inputAlign="right"
								fontSize="18" color="#3F3F3F" border="none"></u--input>
							<u-icon slot="right" class="margin-left-sm" name="arrow-down"></u-icon>
							<u-picker :show="showZhengce" :columns="zclist" keyName="zcname" title="请选择品牌"
								@close="showZhengce = false" @cancel="showZhengce = false"
								@confirm="zcSelect"></u-picker>
						</u-form-item>
						<u-form-item v-if="item.type == 'daili' && item.isShow" label="归属代理" prop="daili"
							class="input-item " :borderBottom="true" @click="showDaili = true; ">
							<u--input v-model="form.mingcheng" disabled disabledColor="#ffffff"
								:style="{pointerEvents: 'none'}" :placeholder="item.placeholder" inputAlign="right"
								fontSize="18" color="#3F3F3F" border="none"></u--input>

							<u-icon slot="right" class="margin-left-sm" name="arrow-down"></u-icon>
							<u-picker :show="showDaili" :columns="huobanlist" keyName="mingcheng" title="请选择政策"
								@close="showDaili = false" @cancel="showDaili = false"
								@confirm="dailiSelect"></u-picker>
						</u-form-item>
						<u-form-item v-if="item.type == 'status' && item.isShow" label="状态" prop="status"
							class="input-item " :borderBottom="true" @click="showStatus = true; ">
							<u--input v-model="form.recflgname" disabled disabledColor="#ffffff"
								:style="{pointerEvents: 'none'}" :placeholder="item.placeholder" inputAlign="right"
								fontSize="18" color="#3F3F3F" border="none"></u--input>
							<u-icon slot="right" class="margin-left-sm" name="arrow-down"></u-icon>
							<u-picker :show="showStatus" :columns="recflglist" keyName="recflgname" title="请选择状态"
								@close="showStatus = false" @cancel="showStatus = false"
								@confirm="statusSelect"></u-picker>
						</u-form-item>
						<u-form-item v-if="item.type == 'nianyue' && item.isShow" label="年月" prop="nianyue"
							class="input-item " :borderBottom="true" @click="showNianyue = true; ">
							<u--input v-model="form.nianyue" readonly disabledColor="#ffffff"
								:placeholder="item.placeholder" inputAlign="right" fontSize="18" color="#3F3F3F"
								:style="{pointerEvents: 'none'}" border="none"></u--input>
							<u-icon slot="right" class="margin-left-sm" name="arrow-down"></u-icon>
							<u-picker :show="showNianyue" :columns="nianyuelist" keyName="nianyue" title="请选择年月"
								@close="showNianyue = false" @cancel="showNianyue = false"
								@confirm="ninayueSelect"></u-picker>
						</u-form-item>

						<u-form-item v-if="item.type == 'date' && item.isShow" :label="item.label" prop="bank"
							class="input-item " :borderBottom="true">

							<view class="flex align-center selectDate" slot="right">

								<text v-if="form.startDate" @click="showStartDate = true">
									{{ form.startDate | date('yyyy-mm-dd')}} </text>
								<text v-else @click="showStartDate = true">开始时间</text>
								<text class="fs margin-left margin-right">至</text>
								<text v-if="form.endDate"
									@click="showEndDate = true">{{ form.endDate | date('yyyy-mm-dd')}}</text>
								<text v-else @click="showEndDate = true">结束时间</text>
							</view>
							<u-datetime-picker :show="showStartDate" v-model="form.startDate" @confirm="selectStartTime"
								@cancel="showStartDate =false" mode="date"></u-datetime-picker>
							<u-datetime-picker :show="showEndDate " v-model="form.endDate" mode="date"
								@cancel="showEndDate =false" @confirm="selectEndTime"></u-datetime-picker>
						</u-form-item>
						<u-form-item v-if="item.type == 'keyword' && item.isShow" :label="item.label" prop="keyword"
							class="input-item " :borderBottom="true">
							<u--input v-model="form.keyword" disabledColor="#ffffff" :placeholder="item.placeholder"
								inputAlign="right" fontSize="18" color="#3F3F3F" border="none"></u--input>
						</u-form-item>

					</view>
					<view class="btn-action flex align-center justify-between margin-top">
						<u-button type="default" :plain="true" shape="circle" text="重置条件" @click="reset"></u-button>
						<u-button type="primary" shape="circle" text="确认筛选" @click="confirm"></u-button>
					</view>
				</u--form>
				</view>
			</view>
		</u-popup>


	</view>
</template>

<script>
	import {get_select_pinpai, get_select_zhengce, get_select_daili, get_select_recflg, get_select_nianyue} from '@/api/system/user.js'
	export default {
		props: {
			columns: {
				type: Array,
				default () {
					return []
				}
			},
			mode: {
				type: String,
				default: 'center'
			},
			initDate: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show: false,

				form: {
					pinpainame: '',
					pinpai: '',
					zcname: '',
					zcno: '',
					bianhao: '',
					mingcheng: '',
					daili:'',
					nianyue: '',
					keyword: '',
					recflgname: '',
					recflg: '',
					startDate: '',
					endDate: '',
					DataFrom: '',
					DataTo: '',
					datefrom: '',
					dateto: ''
				},
				showPinpai: false,
				showZhengce: false,
				showDaili: false,
				showStatus: false,
				showNianyue: false,
				showStartTime: false,
				showEndTime: false,
				startTime: '',
				endTime: '',
				pinpaiList: [],
				zclist: [],
				huobanlist: [],
				recflglist: [],
				nianyuelist: [],
				showStartDate: false,
				showEndDate: false
			};
		},
		created() {
			this.initData()
		
		},
		methods: {
			initData() {
				const today = new Date();
				const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
				if(this.initDate) {
					this.form.startDate = firstDay,
					this.form.endDate = new Date()
				}
			
				this.pinpaiList = [];
				this.zclist = [];
				this.huobanlist = [];
				this.recflglist = [];
				this.nianyuelist = [];
				console.log(this.columns)
				this.columns.forEach((item) => {
					if(item.type == 'pinpai') {
						this.getSelectPinPaiList()
					}
					// if(item.type == 'zhengce') {
					// 	this.getSelectZhengceList()
					// }
					if(item.type == 'daili') {
						this.getSelectDaliList()
					}
					if(item.type == 'status') {
						this.getSelectStatusList()
					}
					if(item.type == 'nianyue') {
						this.getSelectNianYueList()
					}
				})
			},
			close() {
				this.show = false
				// console.log('close');
			},
			getSelectPinPaiList() {
				get_select_pinpai().then((res) => {
					this.pinpaiList.push(res.pinpailist)
				})
			},
			getSelectZhengceList(pinpai) {
				
				get_select_zhengce({pinpai: pinpai}).then((res) => {
					this.zclist.push(res.zclist)
				})
			},
			getSelectDaliList() {
				get_select_daili().then((res) => {
					this.huobanlist.push(res.huobanlist)
				})
			},
			getSelectStatusList() {
				get_select_recflg().then((res) => {
					this.recflglist.push(res.recflglist)
				})
			},
			getSelectNianYueList() {
				get_select_nianyue().then((res) => {
					this.nianyuelist.push(res.nianyuelist)
				})
			},
			pinpaiSelect(e) {
				this.zclist = [];
				this.form.zcname = '';
				this.form.zcno = '';
				this.form.pinpainame = e.value[0].pinpainame
				this.form.pinpai = e.value[0].pinpai
				this.getSelectZhengceList(e.value[0].pinpai)
				this.showPinpai = false
			},
			zcSelect(e) {
				this.form.zcname = e.value[0].zcname
				this.form.zcno = e.value[0].zcno
				
				this.showZhengce = false
			},
			dailiSelect(e) {
				this.form.mingcheng = e.value[0].mingcheng
				this.form.daili = e.value[0].mingcheng
				this.form.bianhao = e.value[0].bianhao
				this.showDaili = false
			},
			statusSelect(e) {
				this.form.recflgname = e.value[0].recflgname
				this.form.recflg = e.value[0].recflg
				this.showStatus = false
			},
			ninayueSelect(e) {
				this.form.nianyue = e.value[0].nianyue
				this.showNianyue = false
			},
			selectStartTime(e) {
				console.log(uni.$u.timeFormat(e.value, 'yyyy-mm-dd'))
				// this.startTime = e.value
				this.form.startDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.form.datefrom =  uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				console.log(this.form.startDate)
				this.showStartDate = false

			},
		
			selectEndTime(e) {
				console.log(e.value)
				// this.date2 = e.value
				this.form.endDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.form.dateto = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.showEndDate = false
			},
			confirm() {
				this.$emit('submit', this.form)
				this.close()
			},
			reset() {
				for (let key in this.form) {
					console.log(key)
					this.form[key] = ''
				}
				this.form.DataFrom = '';
				this.form.DataTo =  '';
				const today = new Date();
				const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
				if(this.initDate) {
					this.form.startDate = firstDay,
					this.form.endDate = new Date()
				}
			
				// this.columns.forEach((item) => {
					
				// 	if(item.type == 'date') {
				// 		this.form.DataFrom = '',
				// 		this.form.DataTo =  '',
				// 		this.form.startDate = new Date(),
				// 		this.form.endDate = new Date()
				// 		// this.form[item.dateZone[0].model] = new Date()
				// 		// this.form[item.dateZone[1].model] = new Date()
				// 		// this.form[item.dateZone[0].showModel] = ''
				// 		// this.form[item.dateZone[1].showModel] = ''
				// 	}
				// })
			}
		},
	}
</script>

<style lang="scss">
 .serach-pop {
	 .serach-content{
		 border-top: 2rpx solid #FA8E1C ;
		 padding: 20rpx 44rpx 44rpx 44rpx ;
	 }
		.u-form {
		

			/deep/ .u-form-item__body__left__content {
				padding-left: 26rpx;
			}

			/deep/ .u-form-item__body__left__content__label {
				color: #3F3F3F;
				font-size: 30rpx;
				line-height: 30rpx;
			}

			/deep/ .u-form-item__body__left__content__required {
				font-size: 28rpx;
				color: #FA8E1C;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}

			/deep/ .u-input {
				flex: auto;
			}

			/deep/ .uni-select {
				margin-top: 20rpx;
				border: 0;

				// border-bottom: 1rpx solid rgba(255, 255, 255, 0.2) !important;
			}

			/deep/ .uni-select__input-placeholder {
				color: #9A9A9A;
				font-size: 30rpx;
			}

			/deep/ .uni-input-placeholder {
				color: #9A9A9A !important;
				font-size: 30rpx;
				// font-family: 'AlibabaPuHuiTiR';
				// font-weight: 400;
			}

			.selectDate {
				color: #9A9A9A;
				font-size: 30rpx;

				.fs {
					color: #3F3F3F;
				}
			}

			

		}
	}
	.btn-action {
		margin-top: 60rpx;
	
		/deep/ .u-button {
			width: 242rpx !important;
			height: 72rpx !important;
		}
	
		
		
	}
	
</style>
<style lang="scss">
	/deep/ .u-button--plain {
		height: 72rpx;
		border: 1px solid #FA8E1C !important;
		background: transparent;
		color: #FA8E1C;
	}
</style>