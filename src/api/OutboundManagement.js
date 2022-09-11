import request from '@/utils/request'

export function GetWarehouseList() {
    return request({
      url: 'ips/outbound/pageDetail',
      method: 'get',
    })
  }