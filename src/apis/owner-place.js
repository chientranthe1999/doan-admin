import request from '@/utils/request'

export function getOwnerPlaces(params) {
  return request.get('/auth/owner-place', { params })
}
