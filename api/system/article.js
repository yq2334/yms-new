import request from '@/utils/request'
// 查询用户个人信息
export function getArticleList(params) {
  return request({
    url: '/article/newList',
    method: 'get',
    data: params
  })
}
