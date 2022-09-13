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

// 查询库区
export function getReservoirInfo(id) {
  return request({
    url: `/api/area/${id}`
  })
}

// 修改库区
export function editReservoir(data) {
  return request({
    url: '/api/area',
    method: 'PUT',
    data
  })
}

// 删除库区
export function delReservoir(id) {
  return request({
    method: 'DELETE',
    url: '/api/area',
    params: {

      ids: [id]
    }

  })
}
