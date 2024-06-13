<template>
	<view class="zone">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<common-view>
			<view class="zone-content">
				<u-tabs :list="tabs" :current="current" lineWidth="30" :itemStyle="{height: '100rpx'}"
					:activeStyle="{color: '#FA982B', fontSize: '32rpx', fontWeight: 'bold' }"
					:inactiveStyle="{color: '#545454',fontSize: '32rpx'  }" :scrollable="false" lineHeight="4"
					lineColor="#FA982B" @click="click"></u-tabs>
				<!-- 	<transfer-zone v-if="current == 0"></transfer-zone>
				<transfer-select v-if="current == 1"></transfer-select> -->
				<view class="padding-lr operate">
					<view class="flex align-center item margin-bottom-sm" @click="selectAgent">
						<view class="tag">
							代理商
						</view>
						<u-input v-model="select_agent.mingchneg" placeholder="请选择代理商" fontSize="14" color="#3F3F3F"
							border="none">

						</u-input>
						<u-icon size="25" color="#3D3D3D" name="arrow-down"></u-icon>
					</view>
					<view class="flex align-center item margin-bottom-sm">
						<view class="tag">
							起始SN
						</view>
						<u--input v-model="form.startSN" placeholder="请选择起始机具号" fontSize="14" color="#3F3F3F"
							border="none">
						</u--input>
						<u--image @click="scan('startSN')" :showLoading="true" src="/static/images/scan.png"
							width="40rpx" height="40rpx" mode="aspectFit"></u--image>
					</view>
					<view class="flex align-center item margin-bottom-sm">
						<view class="tag">
							截止SN
						</view>
						<u--input v-model="form.endSN" placeholder="请选择截止机具号" fontSize="14" color="#3F3F3F"
							border="none">
						</u--input>
						<u--image @click="scan('endSN')" :showLoading="true" src="/static/images/scan.png" width="40rpx"
							height="40rpx" mode="aspectFit"></u--image>
					</view>
					<view class="action-btn ">
						<u-button @click="submit" :loading="loading" :loadingText="loading?'确认下拨..':''"
							:customStyle="{'border-radius': '20rpx', 'height': '90rpx'}" size="large" type="default"
							text="确认下拨">
						</u-button>
					</view>
				</view>

			</view>
		</common-view>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	var mpaasScanModule = uni.requireNativePlugin("Mpaas-Scan-Module")
	// #endif
	// #ifdef H5
	import wx from 'jweixin-module';
	// #endif
	import {
		setQujianHuabo,
		getWx_SaoMa
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				current: 0,
				tabs: [{
						name: '区间调拨',
						val: 0,
						url: '/packageA/pages/transfer/zone'
					},
					{
						name: '选择调拨',
						val: 1,
						url: '/packageA/pages/transfer/zone-select'
					},

				],
				select_agent: {
					bianhao: '',
					mingchneg: '',
					mobile: ''
				},
				form: {
					startSN: '',
					endSN: ''
				},
				loading: false
			};
		},
		components: {
			// TransferZone,
			// TransferSelect
		},
		onReady() {
			// #ifdef H5
			this.getH5ScanData()
			// #endif


		},
		onLoad() {
			// #ifdef H5
			if (params.startSN) {
				this.form.startSN = params.startSN;

			}
			if (params.endSN) {
				this.form.endSN = params.endSN;
			}
			// #endif
		},

		methods: {
			selectAgent() {
				this.$tab.navigateTo('/packageA/pages/agent/query?select=' + this.select_agent.bianhao)
			},
			handleSelectAgent(item) {
				console.log(item)
				this.select_agent = item
			},
			click(item) {
				this.current = item.val
				this.$tab.redirectTo(item.url)
			},
			scan(name) {
				// #ifdef APP-PLUS


				mpaasScanModule.mpaasScan({
						// 扫码识别类型，参数可多选，qrCode、barCode，不设置，默认识别所有
						'scanType': ['qrCode', 'barCode'],
						// 是否隐藏相册，默认false不隐藏
						'hideAlbum': false
					},
					(ret) => {
						// uni.showModal({
						// 	title: "弹窗标题",
						// 	// 返回值中，resp_code 表示返回结果值，10：用户取消，11：其他错误，1000：成功
						// 	// 返回值中，resp_message 表示返回结果信息
						// 	// 返回值中，resp_result 表示扫码结果，只有成功才会有返回
						// 	content: JSON.stringify(ret),
						// 	showCancel: false,
						// 	confirmText: "确定"
						// })
						if (ret.resp_code == 1000) {
							if(this.checkSN(ret.resp_result)) {
								this.form[name] = ret.resp_result
							}
							
						} else {
							uni.showModal({
								title: "扫码提示",
								// 返回值中，resp_code 表示返回结果值，10：用户取消，11：其他错误，1000：成功
								// 返回值中，resp_message 表示返回结果信息
								// 返回值中，resp_result 表示扫码结果，只有成功才会有返回
								content: ret.resp_message,
								showCancel: false,
								confirmText: "确定"
							})
						}

					})
				// #endif
				// #ifdef MP-WEIXIN
				uni.scanCode({
					scanType: ['qrCode', 'barCode'],
					success: (res) => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						if(this.checkSN( res.result)) {
							this.form[name] = res.result
						}
						
					}
				});
				// #endif
				// #ifdef H5
				this.bindsaoQRcode(name)
				// #endif
			},
			getH5ScanData() {
				//在onload 中调用，找后台要接口！！！
				var apiUrl = window.location.href.split("#")[0]
				// console.log('apiUrl', location.href)
				getWx_SaoMa({
					url: apiUrl, //当前页面的域名
					api: ['scanQRCode'], //调用的方法去接口列表里找
				}).then((res) => {
					if (res.code == '00') {
						var wxData = res
						this.wx_sanCode(wxData)
					}
				})
				// uni.request({
				// 	url: api.api.getJsSdkConfig,
				// 	data: {
				// 		url: apiUrl, //当前页面的域名
				// 		api: ['scanQRCode'], //调用的方法去接口列表里找
				// 	},
				// 	success: function(res) {

				// 		var wxData = JSON.parse(res.data.data.config)
				// 		that.wx_sanCode(wxData)
				// 	}

				// })
			},
			//扫码
			wx_sanCode: function(wxData) {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: wxData.appId, // 必填，公众号的唯一标识
					timestamp: wxData.timestamp, // 必填，生成签名的时间戳
					nonceStr: wxData.nonceStr, // 必填，生成签名的随机串
					signature: wxData.signature, // 必填，签名
					jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
				})
				wx.ready(function() {
					// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					wx.checkJsApi({
						jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
						success: function(res) {
							// console.log('返回信息')
							// console.log(res)
							// 以键值对的形式返回，可用的api值true，不可用为false
							// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
						}
					});
				});
				wx.error(function(res) {
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					console.log(res, '接口验证失败')
				});

			},
			//扫码
			bindsaoQRcode: function(name) {
				wx.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: (res) => {
						// console.log(res);

						if (res.resultStr.includes(',')) {
							if(!this.checkSN(res.resultStr.split(',')[1])) return;
							this.form[name] = res.resultStr.split(',')[1];
						} else {
							if(!this.checkSN(res.resultStr)) return;
							this.form[name] = res.resultStr
						}
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						// this.$modal.alert(res)
						// this.$modal.alert(`${window.location.href}'?code='${this.jijuhao}`)
						// console.log(`${window.location.href}'?code='${this.jijuhao}`);
						console.log(this.$mHelper.getUrlParam('startSN'))
						console.log(this.$mHelper.getUrlParam('endSN'))
						let startSN = this.$mHelper.getUrlParam('startSN')
						let endSN = this.$mHelper.getUrlParam('endSN')

						let _url = window.location.href.split("?")[0] + '?startSN=' + this.form.startSN +
							'&endSN=' + this.form.endSN;
						window.location.replace(_url)
						// 	.jijuhao //安卓机型跳转渲染有问题 所以要加这句
					}
				});
			},
			checkSN(_sn) {
				if (_sn.length < this.snConfig.minsn || _sn.length > this.snConfig.maxsn) {
					uni.showModal({
						content: '机具号有误，请重新扫描',
						showCancel: false
					})
					return false;
				} else {
					return true
				}
			},
			submit() {
				this.loading = true
				setQujianHuabo({
					dailishang: this.select_agent.bianhao,
					posfrom: this.form.startSN,
					posto: this.form.endSN
				}).then((res) => {
					this.loading = false
					if (res.code == '00') {
						uni.showToast({
							title: '划拨成功',
							icon: 'success'
						})
						this.reset()
					}
				})
			},
			reset() {
				this.form.startSN = ''
				this.form.endSN = ''
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

	.zone {
		&-content {
			padding-top: 13rpx;

			.operate {
				margin-top: 52rpx;

				.item {
					padding: 6rpx 33rpx 6rpx 8rpx;
					background: #FFFFFF;
					border-radius: 10rpx;

				}

				.tag {
					width: 190rpx;
					height: 72rpx;
					background: #FA982B;
					border-radius: 10rpx;
					font-size: 28rpx;
					color: #F2F6F9;
					line-height: 72rpx;
					text-align: center;
					margin-right: 26rpx;
				}
			}
		}
	}

	.operate {
		margin-top: 52rpx;

		.item {
			padding: 6rpx 33rpx 6rpx 8rpx;
			background: #FFFFFF;
			border-radius: 10rpx;

		}

		.tag {
			width: 190rpx;
			height: 72rpx;
			background: #FA982B;
			border-radius: 10rpx;
			font-size: 28rpx;
			color: #F2F6F9;
			line-height: 72rpx;
			text-align: center;
			margin-right: 26rpx;
		}

		.action-btn {
			margin-top: 85rpx;
		}
	}

	.u-tabs {
		background-color: #fff;
		// border-top: 1rpx solid rgba(0, 0, 0, 0.1);
	}

	/deep/ .uni-input-placeholder {
		color: rgba(67, 67, 67, 0.5) !important;
		font-size: 28rpx;
		// font-family: 'AlibabaPuHuiTiR';
		// font-weight: 400;
	}

	.u-button--default {
		background: linear-gradient(125deg, #FF665E, #FF837D);
		color: #FFFFFF !important;
		font-size: 36rpx !important;
		border: 0 !important;
	}
</style>