import request from '@/utils/request'
export function getCharge(params) {
  return request.get(`/payment/admin/vnpay`, { params })
}
