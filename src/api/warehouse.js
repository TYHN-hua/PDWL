import request from '@/utils/request'

// 获取所有仓库
export function getAllWarehouse() {
  return request({
    url: '/warehouse/list'

  })
}
