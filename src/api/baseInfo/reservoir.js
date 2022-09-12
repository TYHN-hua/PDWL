import request from '@/utils/request'

// 获取库区列表
export function getAllWarehouse(params) {
  return request({
    url: '/api/area/pageDetail',
    params
  })
}

// 获取下一个库区编号
export function getNextCodeofKQ() {
  return request({
    url: '/api/codeFactory/next/KQ'

  })
}

// 新建一个库区
export function addNewReservoir(data) {
  return request({
    url: '/api/area',
    method: 'POST',
    data

  })
}
