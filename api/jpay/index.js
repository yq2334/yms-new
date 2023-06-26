import request from '@/utils/request'

// 获取银行卡绑定Url
export function getBankCardUrl() {
  return request({
    'url': '/CmJPay/GetBankCardUrl',
    'method': 'get'
  })
}