import request from '@/utils/request'

export function GetWarehouseList(params) {
    return request({
      url: 'ips/outbound/pageDetail',
      method: 'get',
      params,
    })
}
  
export function GetPickingList(params) {
  return request({
    url: 'ips/picking/pageDetail',
    method: 'get',
    params,
  })
}

export function GetHandoverList(params) {
  return request({
    url: 'ips/handover/pageDetail',
    method: 'get',
    params,
  })
}