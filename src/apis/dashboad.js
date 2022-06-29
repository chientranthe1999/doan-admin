import request from '@/utils/request'

export function getAdminDashBoad(params) {
  return request.get('/admin/dash-board', { params })
}

export function getOwnerDashBoad(params) {
  return request.get('/owner/dash-board', { params })
}

export function getSystemctlConfig() {
  return request.get('admin/system-config')
}

export function editSystemConfig(data) {
  return request.put('admin/system-config', data)
}

export function payOwner(data) {
  return request.put('/admin/pay-owner', data)
}
