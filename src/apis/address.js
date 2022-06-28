import request from '@/utils/request'

export function getAddress(params) {
  return request.get('/address', { params })
}
