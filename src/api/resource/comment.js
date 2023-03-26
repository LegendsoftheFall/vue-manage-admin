//管理评论
import request from '@/utils/request'

export const reqAllComment = (page,size) => request({
    url: `/admin/api/comment/all?page=${page}&size=${size}`,
    method: 'get'
})

export const reqCommentInfo = (id) => request({
    url: `/admin/api/comment/info/${id}`,
    method: 'get'
})

export const reqSetStatus = (id,status) => request({
    url: `/admin/api/comment/set?id=${id}&status=${status}`,
    method: 'post'
})

export const reqCommentByItemID = (id,page,size) => request({
    url: `/admin/api/comment/search?item=${id}&page=${page}&size=${size}`,
    method: 'get'
})

export const reqDeleteComment = (sendData) => request({
    url: `/admin/api/comment/delete`,
    method: 'post',
    data: sendData
})