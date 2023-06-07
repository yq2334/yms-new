import request from '@/utils/request'

// 导航栏查询公告列表
export function queryNotice(query) {
  return request({
    url: '/system/notice/queryNotice',
    method: 'get',
    data: query
  })
}

// 查询公告列表
export function listNotice(query) {
  return request({
    url: '/system/notice/list',
    method: 'get',
    data: query
  })
}

// 查询公告详细
export function getNotice(noticeId) {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'get'
  })
}