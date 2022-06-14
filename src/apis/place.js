import request from '@/utils/request'

export function login(data) {
  return request.post('/owner/place', data)
}

export function getInfor(data) {
  return request.get('/auth/me', data)
}

export function createPlaceType(data) {
  return request.post('/place/type-place', data)
}

export function getPlaceType() {
  return request.get('/place/type-place')
}

export function createPlaceService(data) {
  return request.post('/place/service', data)
}

export function createTimeGole(data) {
  return request.post('/owner/place/time-gold', data)
}
