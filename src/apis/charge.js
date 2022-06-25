import request from '@/utils/request'
export function getCharge(params) {
  console.log(params)
  return request.get(`/payment/admin/vnpay`, { params })
}
