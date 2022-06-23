import request from '@/utils/request'

export function getVoucher() {
  return request.get('/owner/voucher?page=1&pageSize=10')
}

export function createVoucher(data) {
  return request.post('/owner/voucher', data)
}

export function getDetailsVoucher(id) {
  return request.get(`/owner/voucher/${id}`)
}

export function editVoucher(id, data) {
  return request.put(`/owner/voucher/${id}`, data)
}

export function deleteVoucher(id) {
  return request.delete(`/owner/voucher/${id}`)
}
