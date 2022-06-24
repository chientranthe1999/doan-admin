import request from '@/utils/request'
export function getOwnerPlaces() {
  return request.get('/auth/owner-place?page=1&pageSize=10')
}
