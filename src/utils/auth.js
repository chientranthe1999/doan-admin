import Cookies from 'js-cookie'

// TODO: Handle admin token
const ADMIN_TOKEN = 'STADIUM-ADMIN-TOKEN'

const MANAGER_TOKEN = 'STADIUM-MANAGER-TOKEN'

export function getToken() {
  return Cookies.get(MANAGER_TOKEN)
}

export function setToken(token) {
  return Cookies.set(MANAGER_TOKEN, token)
}

export function removeToken() {
  return Cookies.remove(MANAGER_TOKEN)
}
