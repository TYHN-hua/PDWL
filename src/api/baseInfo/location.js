import request from '@/utils/request'

// 获取库位列表
export function getLocationList() {
  return request({
    url: '/api/location/list'

  })
}

// 分页查询库位详细信息
export function getLocationDetail(params) {
  return request({
    url: '/api/location/pageDetail',
    params

  })
}

// 获取下一个库位编号
export function getNextCodeOfKW() {
  return request({
    url: '/api/codeFactory/next/KW'
  })
}
