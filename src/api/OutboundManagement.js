import request from '@/utils/request'

export function GetWarehouseList(params) {
    return request({
      url: '/outbound/list',
      method: 'get',
      params
    })
  }