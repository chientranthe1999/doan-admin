import request from '@/utils/request'

export function login(data) {
  return request.post('/auth/login', data)
}

export function getInfor() {
  return request.get('/auth/me')
}

export function register(data) {
  return request.post('/auth/register', data)
}

export function activeAdmin(id) {
  return request.put('/auth/owner-place/approve/' + id)
}

export function disableAdmin(id) {
  return request.put('/auth/owner-place/disable/' + id)
}
