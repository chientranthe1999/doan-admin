import request from '@/utils/request'

export function getTypeArticle() {
  return request.get('/article/type-article')
}

export function getAllArticle(params) {
  return request.get('/article', { params })
}

export function creaetArticleType(data) {
  return request.post('/article/type-article', data)
}

export function creaetArticle(data) {
  return request.post('/article', data)
}

export function getArticleByUser() {
  return request.get('/article/findByUser')
}

export function getArticleById(id) {
  return request.get(`/article/${id}`)
}

export function editArticle(id, data) {
  return request.put(`/article/${id}`, data)
}
