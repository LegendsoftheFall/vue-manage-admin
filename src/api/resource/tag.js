//管理标签
import request from '@/utils/request'

//获取标签列表接口
// /admin/api/tags?page=1&size=10&uid=
export const reqTagsList = (page, size) => request({
    url: `/admin/api/tags?page=${page}&size=${size}&uid=`,
    method: 'get'
})

//新建标签接口
// /admin/api/tag/create    参数: id name image introduction

export const reqCreateTag = (tag) => {
    return request({ url:'/admin/api/tag/create', method: 'post', data: tag})
  }

//修改标签接口
// /admin/api/tag/update    参数: id name image introduction

export const reqUpdateTag = (tag) => {
  return request({ url:'/admin/api/tag/update', method: 'patch', data: tag})
}

//删除标签接口
// /admin/api/tag/delete  参数 id和secret

export const reqDeleteTag = (authAndID) => {
  return request({ url:'/admin/api/tag/delete', method: 'post', data: authAndID})
}