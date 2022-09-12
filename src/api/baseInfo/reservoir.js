import request from '@/utils/request'

// 获取库区列表
export function getAllWarehouse(params) {
  return request({
    url: '/api/area/pageDetail',
    params
  })
}

