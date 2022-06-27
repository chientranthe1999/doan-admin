import request from '@/utils/request'

export function getAdminDashBoad(params) {
  console.log(params)
  return request.get('/admin/dash-board', { params })
}

export function getOwnerDashBoad(params) {
  return request.get('/owner/dash-board', { params })
}
