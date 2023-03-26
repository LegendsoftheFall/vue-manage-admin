import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-admin-template/api/info',
    url: '/admin/api/info',
    method: 'get',
    // params: { token }
  })
}

export function logout() {
  return request({
    // url: '/vue-admin-template/api/logout',
    url: '/admin/api/logout',
    method: 'post'
  })
}
