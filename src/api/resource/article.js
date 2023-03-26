//管理文章
import request from '@/utils/request'

export const reqSelectTags = () => request({
    url: `/admin/api/tag/select`,
    method: 'get'
})

export const reqTagArticles = (id,page,size) => request({
    url: `/admin/api/tag/${id}?page=${page}&size=${size}&order=time`,
    method: 'get'
})

export const reqArticleDetail = (id) => request({
    url: `/admin/api/article/${id}`,
    method: 'get'
})

export const reqDeleteArticle = (authAndID) => request({
    url: `/admin/api/article/delete`,
    method: 'post',
    data: authAndID
})