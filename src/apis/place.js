import request from '@/utils/request'

export function createPlaceType(data) {
  return request.post('/admin/place/type-place', data)
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

export function getPlaceOwner(params) {
  return request.get('/owner/place', { params })
}
export function getAllPlace(params) {
  return request.get('/place', { params })
}

export function getPlaceById(id) {
  return request.get('/place/' + id)
}

export function createPlace(data) {
  return request.post('/owner/place', data)
}

export function updatePlace(id, data) {
  return request.put('/owner/place/' + id, data)
}

export function createDayOff(data) {
  return request.post('/owner/place/day-off', data)
}
