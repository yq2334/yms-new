import request from '@/utils/request'
import {
	getToken
} from '@/utils/auth';
import globalConfig from '@/config'

export function getHomeData(data) {
	return request({
		'url': '/api_Default.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: data,
		loading: '加载中...'
	})
}
export function getHomeDataUnlogin(data) {
	return request({
		'url': '/api_Default_home.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: data,
		loading: '加载中...'
	})
}
export function getNewList(data) {
	return request({
		'url': '/api_newslist.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: data,
		loading: '加载中...'
	})
}

export function getNewListDetail(data) {
	return request({
		'url': '/api_newsdetail.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: data,
		loading: '加载中...'
	})
}
export function getWalletData(data) {
	return request({
		'url': '/api_money.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		'method': 'post',
		
		params: data,
		loading: '加载中...'
	})
}
export function getYejiData(data) {
	return request({
		'url': '/api_yeji.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.yeji',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getYejiMonth(data) {
	return request({
		'url': '/api_data_yejimonth.ashx',
		'method': 'post',
		
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.data_yejimonth',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getFriendList(data) {
	return request({
		'url': '/api_friendlist.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.friendlist',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getMemberCenter(data) {
	return request({
		'url': '/api_memcenter.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.memcenter',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getContactus(data) {
	return request({
		'url': '/api_contactus.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.contactus',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}


export function tousu(data) {
	return request({
		'url': '/api_tousu.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.tousu',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}

export function getBank(data) {
	return request({
		'url': '/api_getbank.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.getbank',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function setBank(data) {
	return request({
		'url': '/api_mybank_set.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mybank_set',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function getCardBank(data) {
	return request({
		'url': '/api_mybank.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mybank',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getDirectMerchantList(data) {
	return request({
		'url': '/api_myshanghu.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myshanghu',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getTeamMerchantList(data) {
	return request({
		'url': '/api_myshanghu_td.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myshanghu_td',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getMerchantInfo(data) {
	return request({
		'url': '/api_myshanghu_info.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myshanghu_info',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getMerchantRptdayList(data) {
	return request({
		'url': '/api_myshanghu_rptday.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myshanghu_rptday',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getMerchantRptdayDetailList(data) {
	return request({
		'url': '/api_myshanghu_rptdayDetail.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myshanghu_rptdayDetail',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getMerchantRptMonthList(data) {
	return request({
		'url': '/api_myshanghu_rptmonth.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myshanghu_rptmonth',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getBandList(data) {
	return request({
		'url': '/api_myzhengce_pinpai.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myzhengce_pinpai',
			token: getToken()
		}, data),
		loading: false
	})
}

export function getPoliceList(data) {
	return request({
		'url': '/api_myzhengce_zhengce.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myzhengce_zhengce',
			token: getToken()
		}, data),
		loading: false
	})
}

export function getPoliceDetail(data) {
	return request({
		'url': '/api_myzhengce_zhengceDetail.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myzhengce_zhengceDetail',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getTeamBandList(data) {
	return request({
		'url': '/api_friendlist_pinpai.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.friendlist_pinpai',
			token: getToken()
		}, data),
		loading: false
	})
}

export function getTeamPoliceList(data) {
	return request({
		'url': '/api_friendlist_zhengce.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.friendlist_zhengce',
			token: getToken()
		}, data),
		loading: false
	})
}

export function getTeamPoliceDetail(data) {
	return request({
		'url': '/api_friendlist_zhengceDetail.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.friendlist_zhengceDetail',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function feilv_set_item(data) {
	return request({
		'url': '/api_feilv_set_info.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.feilv_set_info',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function feilv_set_submit(data) {
	return request({
		'url': '/api_feilv_set_submit.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.feilv_set_submit',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function setTeamZhengce(data) {
	return request({
		'url': '/api_friendlist_zhengceSet.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.friendlist_zhengceSet',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}

export function getMoneyfenrun(data) {
	return request({
		'url': '/api_moneyfenrun_total.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.moneyfenrun_total',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getMoneyfanxian(data) {
	return request({
		'url': '/api_moneyfanxian_total.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.moneyfanxian_total',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getMoneyDongjie(data) {
	return request({
		'url': '/api_moneydongjie_total.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.moneydongjie_total',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getMoneyLiuliangka(data) {
	return request({
		'url': '/api_moneyliuliangka_total.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.moneyliuliangka_total',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getWithdrawInfo(data) {
	return request({
		'url': '/api_tixianget.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.tixianget',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function handleWithdraw(data) {
	return request({
		'url': '/api_tixiansubmit.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.tixiansubmit',
			token: getToken()
		}, data),
		loading: '申请中...'
	})
}

export function getWithdrawList(data) {
	return request({
		'url': '/api_tixianlist.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.tixianlist',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getShareImg(data) {
	return request({
		'url': '/api_shareimg.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.shareimg',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getHuabo(data) {
	return request({
		'url': '/api_myhuabo.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myhuabo',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getRuwang(data) {
	return request({
		'url': '/api_ruwang.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.ruwang',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getMyPos(data) {
	return request({
		'url': '/api_mypos.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mypos',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getMyFengkong(data) {
	return request({
		'url': '/api_myfengkong.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myfengkong',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getQadList(data) {
	return request({
		'url': '/api_qalist.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.qalist',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getQadDetail(data) {
	return request({
		'url': '/api_qadetail.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.qadetail',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getHuaboLog(data) {
	return request({
		'url': '/api_huabolog.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.huabolog',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getHuaboLogDetail(data) {
	return request({
		'url': '/api_huabologDetail.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.huabologDetail',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getHuishouDetail(data) {
	return request({
		'url': '/api_huishouDetail.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.huishouDetail',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getDirectOpen(data) {
	return request({
		'url': '/api_mypos_self_kaitong.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mypos_self_kaitong',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getDirectUnOpen(data) {
	return request({
		'url': '/api_mypos_self.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mypos_self',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getTeamOpen(data) {
	return request({
		'url': '/api_mypos_td_kaitong.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mypos_td_kaitong',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getTeamUnOpen(data) {
	return request({
		'url': '/api_mypos_td.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mypos_td',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getweijihuo_wei_guoqi_td(data) {
	return request({
		'url': '/api_myfengkong_weijihuo_wei_guoqi_td.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myfengkong_weijihuo_wei_guoqi_td',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getWeijihuo_wei_guoqi(data) {
	return request({
		'url': '/api_myfengkong_weijihuo_wei_guoqi.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myfengkong_weijihuo_wei_guoqi',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getChenmo_td(data) {
	return request({
		'url': '/api_myfengkong_chenmo_td.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myfengkong_chenmo_td',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getChenmo(data) {
	return request({
		'url': '/api_myfengkong_chenmo.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myfengkong_chenmo',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getWeijihuo_overTime_td(data) {
	return request({
		'url': '/api_myfengkong_weijihuo_wei_td.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myfengkong_weijihuo_wei_td',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getWeijihuo_overTime(data) {
	return request({
		'url': '/api_myfengkong_weijihuo_wei.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myfengkong_weijihuo_wei',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getFengkongMap(api, data) {
	return request({
		'url': api.url,
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: api.apiname,
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getIncomDetailMap(api, data) {
	return request({
		'url': api.url,
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: api.apiname,
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getMypos_td_jihuo(data) {
	return request({
		'url': '/api_mypos_td_jihuo.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mypos_td_jihuo',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getMypos_self_jihuo(data) {
	return request({
		'url': '/api_mypos_self_jihuo.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mypos_self_jihuo',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
// yejichaxun
export function getYejichaxunMap(api, data) {
	return request({
		'url': api.url,
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: api.apiname,
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getMyposlist(data) {
	return request({
		'url': '/api_myposlist_all_wei.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.myposlist_all_wei',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getMyHuishouPoslist(data) {
	return request({
		'url': '/api_mypos_huishou_list.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mypos_huishou_list',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getSelectXiaji(data) {
	return request({
		'url': '/api_select_xiaji.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.select_xiaji',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function setQujianHuabo(data) {
	return request({
		'url': '/api_mypos_huabo_qujian.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mypos_huabo_qujian',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function setSelectHuabo(data) {
	return request({
		'url': '/api_mypos_huabo_select.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mypos_huabo_select',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function setSelectHuishou(data) {
	return request({
		'url': '/api_mypos_huishou_select.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.mypos_huishou_select',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function get_select_pinpai(data) {
	return request({
		'url': '/api_select_pinpai.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.select_pinpai',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function get_select_zhengce(data) {
	return request({
		'url': '/api_select_zhengce.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.select_zhengce',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function get_select_daili(data) {
	return request({
		'url': '/api_select_daili.ashx',
		'method': 'post',
		

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.select_daili',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function get_select_recflg(data) {
	return request({
		'url': '/api_select_recflg.ashx',
		'method': 'post',
		

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.select_recflg',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function get_select_nianyue(data) {
	return request({
		'url': '/api_select_nianyue.ashx',
		'method': 'post',
		

		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.select_nianyue',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getWx_SaoMa(data) {
	return request({
		'url': '/api_getWx_SaoMa.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'yhh.getWx_SaoMa',
			token: getToken()
		}, data),

		loading: '准备中...'
	})
}
