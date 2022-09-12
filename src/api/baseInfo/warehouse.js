import request from '@/utils/request'

// 获取所有仓库
export function getAllWarehouse(params) {
  return request({
    url: '/api/warehouse/list',
    params
  })
}

// 分页查询仓库
export function getWarehouseByPage(params) {
  return request({
    url: '/api/warehouse/page',
    params
  })
}

// 获取新增仓库编码
export function getNewCode() {
  return request({
    url: '/api/codeFactory/next/CK'

  })
}

// 新增仓库
export function addNewWarehouse(data) {
  return request({
    method: 'POST',
    url: '/api/warehouse',
    data
  })
}

// 获取仓库信息
export function getWarehouseDetailById(id) {
  return request({
    url: `/api/warehouse/${id}`

  })
}

// 修改仓库状态
export function changeWarehouseStatus(data) {
  return request({
    method: 'PUT',
    url: '/api/warehouse',
    data
  })
}

// 删除仓库
export function delWarehouse(id) {
  return request({
    method: 'DELETE',
    url: '/api/warehouse',
    params: {

      ids: [id]
    }

  })
}
