import request from '@/utils/request'

export function GetWarehouseList() {
    return request({
      url: `ips/outbound/pageDetail?${id}/${code}/${data.billCode}/${data.ownerName}/${data.size}/${data.current}`,
      method: 'get',
    })
  }