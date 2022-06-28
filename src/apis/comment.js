import request from '@/utils/request'

export function getCommentByOwner(params) {
  return request.get('/comment/by-owner', { params })
}
