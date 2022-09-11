import request from '@/utils/request'

/**
 * 查询入库单
 * @param {*} id 
 * @returns 
 */
export function getStorageReciptList(id) {
  return request({
    url: `receipt/${id}`,
    method:'GET'
  })
}
/**
 * 查询全部入库单
 * @returns 
 */
export function getStorageReciptAllList() {
  return request({
    url: '/receipt/list',
    method: 'GET'
  
  })
}