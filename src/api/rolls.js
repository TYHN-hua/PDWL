import request from '@/utils/request'

// 分页查询盘点单
export function getInventory(params) {
  return request({
    url: 'ips/check/pageDetail',
    params
  })
}

// 获取货主名称
export function getOwnerId() {
  return request({
    url: 'api/owner/list'
  })
}

// 查询仓库列表
export function getwarehouseList() {
  return request({
    url: 'api/warehouse/list'
  })
}

// 查询库区列表
export function getAreaList(params) {
  return request({
    url: 'api/area/list',
    params
  })
}

// 查询库位列表
export function getLocationList(params) {
  return request({
    url: 'api/location/list',
    params
  })
}

// 分页查询损益单明细
export function getIncreaseDecrease(params) {
  return request({
    url: 'ips/increaseDecrease/pageDetail',
    params
  })
}

// 汇总总数与总金额
export function getProfitSum() {
  return request({
    url: 'ips/increaseDecrease/sum'
  })
}

// 分页查询损益单
export function getIncreaseDecreaseList(params) {
  return request({
    url: 'ips/increaseDecrease/pageDetail',
    params
  })
}

// 分页查询明细库存
export function getstock(params) {
  return request({
    url: 'ips/stock/pageDetail',
    params
  })
}

// 分页查询库存记录
export function getstockRecordList(params) {
  return request({
    url: 'ips/stockRecord/page',
    params
  })
}

// 分页查询盘点任务明细
export function searchCheckTask(params) {
  return request({
    url: 'ips/checkTask/pageDetail',
    params
  })
}

// 获取下一个编码
export function getNextPD() {
  return request({
    url: 'api/codeFactory/next/PD'
  })
}
